# Plataforma de venda e gestao de ativos digitais - API

Backend em NestJS + PostgreSQL + Redis/BullMQ que implementa o escopo completo
da especificacao: catalogo de produtos, estoque dinamico por unidade,
checkout/vendas, emissao e entrega automatica, devolucoes com aprovacao
automatica e fila de revisao manual, area do cliente e painel admin.

Toda a automacao descrita na especificacao roda sem intervencao do
administrador (geracao de estoque, reabastecimento, emissao/entrega,
liberacao de reservas expiradas, aprovacao de devolucoes elegiveis). A unica
excecao, por natureza, e a revisao manual de devolucoes fora das regras
automaticas.

## Requisitos

- Node.js 20+
- PostgreSQL 15+
- Redis 6+

## Setup

```bash
cp .env.example .env    # ajuste DATABASE_URL, REDIS_HOST, JWT_SECRET, etc.
npm install
npm run migration:run   # cria o schema (enums, tabelas, indices)
npm run start:dev
```

A API sobe em `http://localhost:3001/api`.

## Estrutura

Ver `src/` — um modulo por dominio (`produtos`, `estoque`, `vendas`,
`pagamento`, `devolucoes`, `conteudo`, `jobs`, `auth`, `admin`, `cliente`,
`reabastecimentos`, `email`), seguindo a organizacao sugerida na
especificacao. `src/jobs` concentra os processors do BullMQ
(`gerar-estoque-inicial`, `reabastecer-estoque`, `liberar-reserva-expirada`,
`emitir-e-entregar`, `processar-devolucao`) e um cron de seguranca
(`jobs-cron.service.ts`) que garante o reabastecimento e a liberacao de
reservas expiradas mesmo se um job pontual falhar.

## Fluxo ponta a ponta (testado manualmente)

1. `POST /api/auth/register` (admin) e `POST /api/produtos` — cria produto e
   dispara a geracao das 300 unidades (`estoque_lote_padrao`) via
   `generate_series` em uma unica transacao.
2. `POST /api/checkout` — reserva 1 unidade disponivel com
   `SELECT ... FOR UPDATE SKIP LOCKED`.
3. `POST /api/webhooks/pagamento` (assinado com HMAC-SHA256 usando
   `PAGAMENTO_WEBHOOK_SECRET`) — confirma a venda atomicamente, marca a
   unidade como `vendido`, dispara emissao/entrega por e-mail e verifica o
   limiar de reabastecimento do produto.
4. `GET /api/minhas-compras` — area do cliente com o codigo gerado e os
   materiais de apoio (URLs assinadas do S3).
5. `POST /api/devolucoes` — valida elegibilidade automaticamente (prazo +
   unidade ainda "vendido"); aprova e libera a unidade, ou cai na fila
   `GET /api/admin/devolucoes/revisao-manual` para decisao humana.

## Gateway de pagamento

`src/pagamento/pagamento.service.ts` isola o gateway atras de um formato
normalizado (`transacaoId`, `status`, `valor`). Trocar o stub por uma
integracao real (Stripe/Mercado Pago/PagSeguro) muda apenas essa classe.

## Storage

`src/conteudo/storage/s3.service.ts` usa o SDK da AWS (compativel com
qualquer S3-like) e gera URLs assinadas de curta duracao para manuais,
cartilhas e videos.
