# 📊 Portfolio — Sistema Simplificado

**Versão:** 2.0  
**Status:** ✅ Ativo  
**Última atualização:** 14 de setembro de 2026

---

## 🎯 O Que É

Dashboard público e responsivo com **12 projetos principais** em acompanhamento. Acesso rápido via web, sem login necessário.

## 📍 Acesso Público

**URL do Dashboard:**
```
https://claude.ai/code/artifact/f5849b5e-aca3-405c-8c13-a3f93890d2fe
```

Funciona em:
- ✅ Desktop, tablet, mobile
- ✅ Qualquer navegador (Chrome, Firefox, Safari, Edge)
- ✅ Dark mode automático
- ✅ Sem necessidade de instalação

---

## 📋 Fonte de Dados

**Arquivo:** `projetos-simples.json`

Estrutura:
```json
{
  "metadata": {
    "versao": "2.0",
    "titulo": "Portfolio — Projetos Ativos",
    "total_projetos": 12,
    "ultima_atualizacao": "YYYY-MM-DD"
  },
  "projetos": [
    {
      "id": 1,
      "nome": "Nome do Projeto",
      "repo": "nome-repositório",
      "dominio": "exemplo.com",
      "status": "Ativo|Construção|MVP|Início"
    }
  ]
}
```

**Campos obrigatórios:**
- `id`: Número único (1-12)
- `nome`: Nome do projeto
- `repo`: Nome do repositório no GitHub
- `dominio`: URL do domínio (`null` se não houver)
- `status`: Um de: Ativo, Construção, MVP, Início

---

## ⚙️ Como Atualizar

### 1. Editar Dados
```bash
# Abra o arquivo:
.portfolio/projetos-simples.json

# Localize o projeto desejado
# Atualize os campos conforme necessário
# Exemplos:
# - Mudar status: "status": "Ativo"
# - Adicionar domínio: "dominio": "novo.com"
# - Remover domínio: "dominio": null
```

### 2. Salvar Mudanças
```bash
git add .portfolio/projetos-simples.json
git commit -m "atualizar projetos: descrição breve"
git push -u origin claude/account-sessions-projects-0w2tn9
```

### 3. Sincronizar Dashboard
O dashboard é **atualizado manualmente** sob demanda.

Para atualizar o artifact com novos dados:
1. Editar `projetos-simples.json` com as mudanças desejadas
2. Fazer commit + push
3. Notificar administrador ou executar sincronização manual

---

## 📊 Projetos Atuais (12 Total)

| ID | Nome | Repo | Status |
|---|---|---|---|
| 1 | ZapScript.me | zapscript | Ativo |
| 2 | MyKollect | mycollect | Construção |
| 3 | Documentos.shop | documentos_me | MVP |
| 4 | Documentos.shop/Kit Eleições 2026 | documentos_me | Construção |
| 5 | MakeApp.me | makeapp.me | Construção |
| 6 | Posts LinkedIn — Autoridade Gestão | fox-mvp | Início |
| 7 | RPPS — Produtos | makeapp.me | Início |
| 8 | Gameroom | gameroom | Construção |
| 9 | Gamebots | Gamebots-mvp | MVP |
| 10 | Máquina de Low Ticket | fox-mvp | Início |
| 11 | Consórcio Livre | — | Início |
| 12 | Milhas Livre / Mart-Milhas | — | Início |

---

## 🎨 Dashboard Features

### Responsividade
- **Desktop:** 4 colunas completas (Projeto | Repositório | Domínio | Status)
- **Tablet:** Layout otimizado para tela média
- **Mobile:** 1 coluna, scroll vertical, touch-friendly

### Dark Mode
Detecta automaticamente a preferência do navegador

### Status Badges
- 🔴 **Início** (Vermelho): Fase inicial
- 🟡 **Construção** (Amarelo): Em desenvolvimento
- 🟢 **MVP** (Verde): Mínimo viável
- 🔵 **Ativo** (Azul): Em produção

### Links de Domínio
Clique nos domínios da coluna 3 para acessar os sites

---

## 🔄 Histórico de Versões

### v2.0 (14 de setembro de 2026)
- ✅ Simplificação radical: 12 projetos, 4 colunas
- ✅ Remoção de complexidades (hierarquias, automação, scripts)
- ✅ Foco em leitura rápida e eficiência
- ✅ Dashboard responsivo e mobile-first

### v1.0 (29 de agosto de 2026)
- Sistema complexo com 30 projetos e hierarquias (DESCONTINUADO)

---

## ✅ Checklist de Manutenção

Para adicionar/remover projetos:

- [ ] Editar `projetos-simples.json`
- [ ] Manter IDs sequenciais (1-12, máximo 12 projetos)
- [ ] Validar JSON (sem erros de sintaxe)
- [ ] Commit com mensagem clara
- [ ] Push para branch
- [ ] Notificar sobre atualização

Para sincronizar o dashboard:
- [ ] Confirmar que JSON foi commitado
- [ ] Executar sincronização manual se necessário
- [ ] Verificar que dashboard foi atualizado

---

## 📞 Suporte

**Problemas comuns:**

❓ **Dashboard não atualiza após mudanças?**
- Verifique se o commit foi feito corretamente
- Recarregue a página do artifact (F5)
- Sincronização manual pode ser necessária

❓ **Erro de sintaxe JSON?**
```bash
# Validar JSON:
jq . .portfolio/projetos-simples.json
```

❓ **Quer compartilhar com o time?**
- Cole a URL do artifact em qualquer canal
- Funciona sem login para qualquer pessoa

---

## 📁 Estrutura

```
.portfolio/
├── README.md (este arquivo)
└── projetos-simples.json (fonte de dados)
```

**Arquivos removidos (versão 1.0):**
- projetos.json ❌ (30 projetos, obsoleto)
- sync_dashboard.py ❌ (automação cancelada)
- portfolio_cli.py ❌ (CLI, não utilizada)

---

**Mantido por:** Roberto (frattari@gmail.com)  
**Última sincronização:** 14 de setembro de 2026
