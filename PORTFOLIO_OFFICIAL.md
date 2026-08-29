# 📊 Portfolio Oficial — Versão Turbo Auto-Update

> **Status:** ✅ ATIVO E SINCRONIZADO  
> **Última atualização:** 29 de agosto, 2026  
> **Próxima sincronização:** 31 de agosto, 2026 (segunda, 09:00 UTC)

---

## 🚀 Acesse o Dashboard Oficial

### **→ [Clique aqui para abrir o Portfolio](https://claude.ai/code/artifact/e1ed2090-6e0e-49b5-a164-624c183e9c90)**

```
Desktop:  Abra no navegador para experiência completa
Mobile:   Totalmente responsivo — funciona perfeitamente em celular
Dark:     Dark mode automático conforme tema do seu sistema
```

---

## 📱 Quick Stats

```
24 Projetos em Acompanhamento
└── 6 em desenvolvimento
└── 1 concluído  
└── 10 arquivados

Progresso Médio: 64.8%

4 Repositórios Mapeados
├── ZapScript (Core | Profissional | Empresas)
├── Gamebots MVP (10 bots)
├── FOX MVP (5 produtos)
└── FOX_AgentsIA (3 agentes)
```

---

## 🔄 Como Funciona a Atualização Automática

O dashboard se **atualiza automaticamente 2x por semana** (segunda e quinta às 09:00 UTC):

1. **Você atualiza** `.portfolio/projetos.json` com novo progresso
2. **Rotina automática dispara** via Claude Code Routine (`trig_017jb8y5mCQoARaUF5J5RP4F`)
3. **Script sincroniza** dados JSON → HTML
4. **Dashboard oficial atualiza** com novos dados
5. **Git faz commit automático** registrando mudanças

**Resultado:** Seu time sempre vê dados frescos, sem você fazer nada!

---

## 📚 Documentação Relacionada

| Arquivo | Objetivo |
|---------|----------|
| **`PORTFOLIO_AUTO_UPDATE.md`** | Guia completo de setup e troubleshooting |
| **`.portfolio/sync_dashboard.py`** | Script de sincronização (Python) |
| **`.portfolio/portfolio_cli.py`** | CLI para terminal (queries rápidas) |
| **`.portfolio/projetos.json`** | Banco de dados (24 projetos) |
| **`ZAPSCRIPT_PLANOS.md`** | Estrutura de planos SaaS (Core/Prof/Empresa) |
| **`PROJETOS_PORTFOLIO.md`** | Vista em Markdown (atualizada automaticamente) |

---

## 🎯 Hierarquias Renderizadas

### ✨ O que o dashboard mostra:

**ZapScript.me** → Planos (Core 60% | Profissional 72% | Empresas 75%)  
**Gamebots MVP** → 10 bots específicos com progresso individual  
**FOX MVP** → 5 produtos (Zapie.me, Agendar.page, VozTexto, etc)  
**FOX_AgentsIA** → 3 agentes (Harvey, Mike AI, Zapie Agent)  

Tudo em **estrutura hierárquica collapsible** — clique para expandir!

---

## 🛠️ Customizações Frequentes

### Atualizar progresso de um projeto
```bash
# Edite .portfolio/projetos.json
nano .portfolio/projetos.json

# Altere o campo "progresso": 71  # (ex: 71%)

# Próxima sincronização (seg/qui 9h) atualizará automaticamente
```

### Adicionar novo projeto
```bash
# 1. Edite .portfolio/projetos.json
# 2. Adicione objeto JSON com campos obrigatórios
# 3. Commit e push
# 4. Rotina automática sincroniza no ciclo seguinte
```

### Executar sincronização manual (se não puder esperar)
```bash
cd /home/user/foxtecnologiaonline
python3 .portfolio/sync_dashboard.py

# Gera: /tmp/portfolio-turbo-full-sync.html
# Use o Claude Code Artifact tool para republicar
```

---

## 📈 Últimas Atualizações

### Agosto 29, 2026
✅ Script de sincronização criado (`sync_dashboard.py`)  
✅ Rotina automática configurada (seg/qui 09:00 UTC)  
✅ Dashboard oficial publicado e sincronizado  
✅ Documentação completa  

---

## 🎨 Características do Dashboard

- ✅ **Dark Mode Automático** — Adapta ao tema do seu navegador
- ✅ **Responsivo Mobile** — Funciona perfeitamente em celular
- ✅ **Hierarquias Collapsible** — Clique para expandir/recolher
- ✅ **Filtros & Busca** — Encontre qualquer projeto rapidamente
- ✅ **Cards Compactos** — Informações essenciais à vista
- ✅ **Badges Visuais** — Status, tipo, receita, progresso
- ✅ **Links Vivos** — Clique em domínios para acessar sites
- ✅ **Estatísticas em Tempo Real** — Total, ativos, progresso médio

---

## 🚨 Troubleshooting Rápido

**Dashboard não atualiza?**  
→ Verifique se `.portfolio/projetos.json` foi commitado e feito push  
→ Aguarde próximo ciclo (seg/qui 09:00 UTC)  
→ Ou execute manualmente: `python3 .portfolio/sync_dashboard.py`

**Projeto não aparece?**  
→ Confirme que está em `.portfolio/projetos.json`  
→ Verifique se tem todos os campos obrigatórios  
→ Commit + Push e aguarde sincronização

**Números desincronizados?**  
→ Faça refresh da página (F5 ou Cmd+R)  
→ Limpe cache do navegador  
→ Ou aguarde próximo ciclo automático

---

## 📞 Referências Técnicas

| Item | Valor |
|------|-------|
| **Artifact URL** | https://claude.ai/code/artifact/e1ed2090-6e0e-49b5-a164-624c183e9c90 |
| **Routine ID** | `trig_017jb8y5mCQoARaUF5J5RP4F` |
| **Frequência** | Segunda e quinta, 09:00 UTC |
| **Arquivo JSON** | `.portfolio/projetos.json` |
| **Script Sync** | `.portfolio/sync_dashboard.py` |
| **Branch Dev** | `claude/account-sessions-projects-0w2tn9` |
| **Repositório** | https://github.com/foxtecnologiaonline/foxtecnologiaonline |

---

## ✨ Próximas Ideias (Roadmap)

- [ ] Integração com Slack (notificações de atualizações)
- [ ] Gráficos históricos (progresso ao longo do tempo)
- [ ] Exportar para PDF/Excel
- [ ] Integração com Jira/Trello para atualização em tempo real
- [ ] Tags customizadas por projeto
- [ ] Ranking de velocidade (commits/semana)

---

**Acesse agora:** https://claude.ai/code/artifact/e1ed2090-6e0e-49b5-a164-624c183e9c90

🎉 Seu portfolio agora é **automático, visual e sempre atualizado!**

