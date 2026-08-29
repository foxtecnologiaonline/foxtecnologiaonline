# 📊 Portfolio Management System

Sistema centralizado para gerenciamento e acompanhamento de projetos FoxTecnologiaOnline.

## 📁 Estrutura

```
.portfolio/
├── projetos.json          # Base de dados de projetos (JSON estruturado)
├── portfolio_cli.py       # CLI para gerenciamento e relatórios
└── README.md             # Este arquivo
```

## 🚀 Quick Start

### Ver todos os projetos
```bash
python3 .portfolio/portfolio_cli.py list
```

### Ver detalhes de um projeto
```bash
python3 .portfolio/portfolio_cli.py get 1
```

### Atualizar progresso
```bash
python3 .portfolio/portfolio_cli.py update 1 85
```

### Relatórios
```bash
# Projetos ativos
python3 .portfolio/portfolio_cli.py active

# Projetos com receita
python3 .portfolio/portfolio_cli.py receita

# Repositórios
python3 .portfolio/portfolio_cli.py repos

# Métricas gerais
python3 .portfolio/portfolio_cli.py metrics
```

## 📋 Estrutura de Dados (projetos.json)

Cada projeto contém:

```json
{
  "id": 1,
  "nome": "ZapScript.me",
  "repositorio": "zapscript",
  "dominio": "zapscript.me",
  "status": "Em desenvolvimento",
  "progresso": 75,
  "tipo": "SaaS",
  "descricao": "...",
  "linguagem": "Node.js/React",
  "prioridade": "crítico",
  "data_inicio": "2026-06-15",
  "ultima_sessao": "2026-08-27",
  "receita": true,
  "tags": ["whatsapp", "automacao"]
}
```

## 📊 Campos Disponíveis

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | int | ID único do projeto |
| `nome` | string | Nome do projeto |
| `repositorio` | string | Nome do repositório GitHub |
| `dominio` | string \| null | Domínio web (se houver) |
| `status` | string | Em desenvolvimento / Pausa / Concluído / Arquivado / Exploração |
| `progresso` | int | 0-100 (%) |
| `tipo` | string | SaaS / App / Bot / Agente / Módulo / etc |
| `descricao` | string | Descrição breve |
| `linguagem` | string | Tech stack (Node.js/React, Python, etc) |
| `prioridade` | string | crítico / alto / médio / baixo |
| `data_inicio` | date | YYYY-MM-DD |
| `ultima_sessao` | date | Última atualização |
| `receita` | boolean | Tem potencial de receita? |
| `tags` | array | Tags para categorização |
| `modulos` | array | (opcional) Módulos/componentes |
| `motivo_pausa` | string | (opcional) Por que está em pausa |
| `motivo_arquivado` | string | (opcional) Por que foi arquivado |

## 🔄 Workflow de Atualização

### 1. Antes de iniciar sessão
```bash
# Ver projeto que vai trabalhar
python3 .portfolio/portfolio_cli.py get [id]
```

### 2. Ao iniciar trabalho
- Registre no arquivo: `PROJETOS_PORTFOLIO.md` (raiz)
- Anote session ID e branch

### 3. Durante trabalho
- Faça commits regularmente
- Atualize progresso conforme avança

### 4. Ao finalizar sessão
```bash
# Atualizar progresso
python3 .portfolio/portfolio_cli.py update [id] [novo_progresso]

# Ver mudanças
git diff .portfolio/projetos.json
```

### 5. Commit
```bash
git add PROJETOS_PORTFOLIO.md .portfolio/projetos.json
git commit -m "chore: atualizar status projetos - #[id] [progresso_antigo]% → [progresso_novo]%"
```

## 📈 Exemplos de Uso

### Adicionar novo projeto
1. Edite `projetos.json`
2. Adicione objeto com `id` único
3. Adicione repositório em `repositorios[]` se novo
4. Atualize `metadata.total_projetos`
5. Commit

### Arquivar projeto
1. Mude `status` para "Arquivado"
2. Adicione `motivo_arquivado`
3. Adicione `data_arquivamento`
4. Commit com mensagem clara

### Desbloqueado projeto
1. Mude `status` de "Pausa" para apropriado
2. Atualize `ultima_sessao`
3. Apague `motivo_pausa` se quiser
4. Commit

## 🤖 Automação com Scripts

### Gerar relatório em CSV
```python
# (TODO) Implementar exportador CSV
```

### Sincronizar com GitHub Issues
```python
# (TODO) Implementar sync com GitHub
```

## 📊 Dashboards Sugeridos

### Shell Alias
```bash
# Adicione ao ~/.bashrc ou ~/.zshrc:

alias portf='cd ~/foxtecnologiaonline && python3 .portfolio/portfolio_cli.py'
alias portf-list='portf list'
alias portf-active='portf active'
alias portf-metrics='portf metrics'
alias portf-update='portf update'  # use: portf-update 1 80
```

### Git Hooks
```bash
# .git/hooks/pre-commit
# Validar JSON de projetos ao fazer commit

python3 -m json.tool .portfolio/projetos.json > /dev/null || exit 1
```

## 🔗 Integração com PROJETOS_PORTFOLIO.md

- **Arquivo Markdown** (raiz): Para leitura visual e histórico
- **Arquivo JSON** (`.portfolio/`): Para automação e relatórios
- **Ambos sincronizados**: Commit único quando atualizar

## 📞 Suporte

Para questões:
- Verificar `.portfolio/projetos.json` diretamente
- Rodar: `python3 .portfolio/portfolio_cli.py metrics`
- Ver histórico: `git log PROJETOS_PORTFOLIO.md`

---

**Última atualização:** 2026-08-29  
**Versão schema:** 1.0
