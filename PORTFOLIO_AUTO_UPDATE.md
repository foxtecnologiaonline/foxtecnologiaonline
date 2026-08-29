# 📊 Portfolio Dashboard — Sistema de Atualização Automática

> **Versão oficial:** `portfolio-turbo-full.html`  
> **Atualizado:** 2x/semana (segunda e quinta, 09:00 UTC)  
> **Dashboard ao vivo:** https://claude.ai/code/artifact/e1ed2090-6e0e-49b5-a164-624c183e9c90

---

## 🎯 Visão Geral

O sistema de portfolio agora funciona com **sincronização automática 2x/semana**:

1. **Dados centralizados** em `.portfolio/projetos.json`
2. **Script Python** que renderiza HTML dinamicamente
3. **Routine automática** que dispara seg/qui às 9:00 UTC
4. **Dashboard oficial** que espelha dados em tempo real

```
┌─────────────────────────────────────────────────────────┐
│              .portfolio/projetos.json                    │
│  (24 projetos, planos, bots, produtos, estatísticas)    │
└────────────────────┬────────────────────────────────────┘
                     │
        (leitura automatizada 2x/semana)
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│        .portfolio/sync_dashboard.py                      │
│   (renderiza HTML completo com hierarquias)             │
└────────────────────┬────────────────────────────────────┘
                     │
        (gera arquivo em /tmp/)
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│   portfolio-turbo-full.html (ARTIFACT OFICIAL)          │
│  https://claude.ai/code/artifact/e1ed2090-...          │
│  - Dark mode automático                                 │
│  - Hierarquias completas (9 componentes)                │
│  - Responsivo mobile                                     │
│  - Estatísticas em tempo real                           │
└─────────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura de Arquivos

```
.portfolio/
├── projetos.json              # Dados centralizados (24 projetos)
├── sync_dashboard.py          # ⭐ Script de sincronização
├── portfolio_cli.py           # CLI para terminal
└── README.md                  # Documentação local

PROJETOS_PORTFOLIO.md          # Versão markdown (legacy, atualizada via script)
ZAPSCRIPT_PLANOS.md            # Estrutura de planos (Core/Prof/Empresas)
PORTFOLIO_AUTO_UPDATE.md       # Este arquivo
```

---

## 🔄 Como Funciona a Sincronização

### 🟢 Rotina Automática (Sem ação do usuário)

**Quando:** Segunda e quinta, 09:00 UTC  
**Trigger ID:** `trig_017jb8y5mCQoARaUF5J5RP4F`  
**Status:** ✅ Ativo

A cada ciclo, a rotina:
1. Executa `python3 .portfolio/sync_dashboard.py`
2. Gera HTML em `/tmp/portfolio-turbo-full-sync.html`
3. Atualiza o artifact oficial via Claude Code MCP
4. Sincroniza Git (se houver mudanças)

### 🔵 Execução Manual (Se precisar)

```bash
# Ir para o diretório do projeto
cd /home/user/foxtecnologiaonline

# Rodar o script de sincronização
python3 .portfolio/sync_dashboard.py

# Verificar arquivo gerado
ls -lh /tmp/portfolio-turbo-full-sync.html

# Publicar manualmente (opcional)
# Use o Artifact tool do Claude Code para atualizar a URL oficial
```

---

## 📊 Hierarquias Renderizadas

O script renderiza automaticamente sub-projetos de 4 repositórios principais:

### 1. **ZapScript** (Planos SaaS)
```
ZapScript.me (71%)
├── Core (60%)          → 8/12 funcionalidades prontas
├── Profissional (72%)  → 20/28 funcionalidades prontas
└── Empresas (75%)      → 26/35 funcionalidades prontas
```

### 2. **Gamebots MVP** (10 Bots)
```
Gamebots MVP (70%)
├── 🤖 Valorant Bot (75%)
├── 🤖 CS2 Bot (70%)
├── 🤖 LoL Bot (80%)
├── 🤖 Fortnite Bot (65%)
├── 🤖 Roblox Bot (60%)
├── 🤖 GTA Bot (70%)
├── 🤖 Free Fire Bot (68%)
├── 🤖 Genshin Bot (72%)
├── 🤖 Minecraft Bot (85%)
└── 🤖 Clan War Bot (75%)
```

### 3. **FOX MVP** (5 Produtos)
```
FOX MVP
├── Zapie.me (85%)          → Link encurtador
├── Agendar.page (80%)      → Agendamento
├── VozTexto Pro (75%)      → Speech-to-text
├── Notas de Voz (70%)      → Voice notes
└── Aquecedor Chips (65%)   → Gaming tool
```

### 4. **FOX_AgentsIA** (3 Agentes)
```
FOX_AgentsIA
├── 🤖 Harvey (80%)         → IA jurídica
├── 🤖 Mike AI (75%)        → IA de negócios
└── 🤖 Zapie Agent (85%)    → Automação
```

---

## 🎨 Características do Dashboard

✅ **Dark mode automático** — Adapta ao tema do navegador  
✅ **Responsivo mobile** — Testado em devices pequenos  
✅ **Hierarquias expandíveis** — Clique para ver detalhes  
✅ **Filtros e busca** — Encontre qualquer projeto rapidamente  
✅ **Estatísticas em tempo real** — Total, ativos, progresso médio  
✅ **Cards compactos** — Informações essenciais visíveis  
✅ **Badges de status** — Visual rápido do estado (dev/pausa/concluído)  
✅ **Badges de receita** — Identifica projetos geradores de receita  
✅ **Links vivos** — Clique em domínios para acessar  

---

## 📈 Estatísticas Atualizadas Automaticamente

```
Total Projetos:       24
├── Em desenvolvimento: 6
├── Em pausa:          0
├── Concluídos:        1
└── Arquivados:        10

Progresso Médio:      64.8%
Projetos Geradores:   14 com receita
```

---

## 🛠️ Customizações Frequentes

### Atualizar Progresso de um Projeto

Edite `.portfolio/projetos.json`:

```json
{
  "id": 1,
  "nome": "ZapScript.me",
  "progresso": 71,  // ← Atualize aqui
  "planos": [
    {
      "nome": "Core",
      "progresso": 60  // ← Ou aqui para planos
    }
  ]
}
```

Próxima execução da rotina (seg/qui 9:00 UTC) atualizará automaticamente o dashboard.

### Adicionar um Novo Projeto

1. Edite `.portfolio/projetos.json` (adicione objeto na array `projetos`)
2. Inclua todos os campos obrigatórios (id, nome, repositorio, status, progresso)
3. Commit e push
4. Rotina automática atualizará no próximo ciclo

### Adicionar Sub-itens Customizados

Modifique a função `render_sub_items()` em `.portfolio/sync_dashboard.py`:

```python
elif projeto.get('nome') == 'Meu Novo Projeto':
    items = [
        ('Item 1', 'Descrição', 75),
        ('Item 2', 'Descrição', 80),
    ]
    for item_name, item_desc, item_progress in items:
        # Renderize o item...
```

---

## 🔔 Próximas Execuções Agendadas

```
Próxima atualização:  31 de agosto, 2026, 09:00 UTC (segunda)
Depois:               02 de setembro, 2026, 09:00 UTC (quinta)
Padrão:              Cada segunda e quinta às 09:00 UTC
```

---

## 🐛 Troubleshooting

### Dashboard não atualiza
- [ ] Verifique se a Routine está ativa: `list_triggers | grep Portfolio`
- [ ] Rode manualmente: `python3 .portfolio/sync_dashboard.py`
- [ ] Verifique permissões: `ls -l .portfolio/sync_dashboard.py`

### Erro ao executar script
- [ ] Confirme que Python3 está disponível: `python3 --version`
- [ ] Valide JSON: `python3 -m json.tool .portfolio/projetos.json`
- [ ] Verifique formato de arquivo: `file .portfolio/projetos.json`

### Dados desincronizados
- [ ] Git status pode estar sujo: `git status`
- [ ] Force atualização: `git fetch origin && git pull origin`
- [ ] Reedite `.portfolio/projetos.json` manualmente se necessário

---

## 📚 Referências

- **Artifact oficial:** https://claude.ai/code/artifact/e1ed2090-6e0e-49b5-a164-624c183e9c90
- **Rotina automática:** `trig_017jb8y5mCQoARaUF5J5RP4F`
- **Branch de desenvolvimento:** `claude/account-sessions-projects-0w2tn9`
- **Repositório:** https://github.com/foxtecnologiaonline/foxtecnologiaonline

---

**Última sincronização:** 2026-08-29  
**Próxima sincronização agendada:** 2026-08-31 09:00 UTC

