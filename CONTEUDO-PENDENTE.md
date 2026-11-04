# Conteúdo pendente de confirmação

O novo site usa textos provisórios nos pontos abaixo. Todo o conteúdo fica em
`src/lib/constants.ts` (busque por `PROVISÓRIO`). Em `npm run dev`, os blocos
provisórios aparecem com uma etiqueta amarela "PROVISÓRIO"; em produção a
etiqueta não aparece.

| # | Item | Onde | Situação atual |
|---|------|------|----------------|
| 1 | Razão social exata (ex.: "... Ltda") | `COMPANY.legalName` | "FOX tecnologia" |
| 3 | Marcas de segurança, design/CAD, sistemas operacionais e backup | `CATEGORIES` → `software` | Só categorias, sem marcas |
| 4 | Sistemas de gestão: de terceiros, próprios ou ambos? Nomes? | `CATEGORIES` → `gestao` | Texto genérico |
| 5 | Serviços realmente prestados | `SERVICES` | Implantação, treinamento em IA, suporte, nuvem |
| 6 | Foco: pregão x dispensa/cotação | `MODALITIES` | Todas as modalidades listadas |
| 7 | Descrição oficial do Documentos.shop | `PRODUCTS` → `documentos` | Texto do site antigo |
| 8 | Descrição e disponibilidade do Makeapp.me | `PRODUCTS` → `makeapp` | Texto do site antigo |
| 9 | Plano grátis / preço / chamada de cada produto | `PRODUCTS` | Não exibido |
| 10 | Prints reais dos produtos | `src/components/Products.tsx` (`Mockup`) | Ilustrações em código |
| 11 | WhatsApp de atendimento | `COMPANY.phone` / `COMPANY.whatsapp` | +55 (34) 99143-9633 |
| 12 | Redes sociais para o rodapé | `src/components/Footer.tsx` | Nenhuma |

## Formulário de cotação

Envia e-mail via `/api/contact` (SMTP Zoho). Requer as variáveis
`ZOHO_EMAIL`, `ZOHO_PASSWORD`, `ZOHO_SMTP_HOST`, `ZOHO_SMTP_PORT` na Vercel
(ver `DEPLOYMENT.md`). Se o envio falhar, o formulário oferece o WhatsApp.
