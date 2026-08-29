#!/usr/bin/env python3
"""
Sincronizador automático do Portfolio Dashboard
Lê dados do projetos.json e atualiza o arquivo HTML do dashboard
"""

import json
import sys
from datetime import datetime
from pathlib import Path

def load_projects():
    """Carrega dados dos projetos do JSON"""
    json_path = Path(__file__).parent / "projetos.json"
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"❌ Erro ao ler projetos.json: {e}")
        sys.exit(1)

def get_stats(data):
    """Calcula estatísticas dos projetos"""
    projetos = data.get('projetos', [])

    total = len(projetos)
    ativos = sum(1 for p in projetos if p.get('status') == 'Em desenvolvimento')
    pausa = sum(1 for p in projetos if p.get('status') == 'Em pausa')
    completos = sum(1 for p in projetos if p.get('status') == 'Concluído')
    arquivados = sum(1 for p in projetos if p.get('status') == 'Arquivado')

    progresso_medio = sum(p.get('progresso', 0) for p in projetos) / total if total > 0 else 0

    return {
        'total': total,
        'ativos': ativos,
        'pausa': pausa,
        'completos': completos,
        'arquivados': arquivados,
        'progresso_medio': round(progresso_medio, 1)
    }

def render_sub_items(projeto):
    """Renderiza sub-items de um projeto (bots, módulos, produtos, etc)"""
    html = ""

    # Planos do ZapScript
    if projeto.get('id') == 1 and 'planos' in projeto:
        for plano in projeto['planos']:
            html += f'''
            <div class="sub-item">
                <div class="sub-item-header">
                    <span class="sub-name">{plano['nome']}</span>
                    <span class="sub-badge">{plano['preco']}</span>
                </div>
                <div class="sub-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: {plano['progresso']}%"></div>
                    </div>
                    <span class="progress-text">{plano['funcionalidades_prontas']}/{plano['funcionalidades_total']} funcs · {plano['progresso']}%</span>
                </div>
            </div>'''

    # Bots do Gamebots
    elif projeto.get('nome') == 'Gamebots MVP' and 'bots' in projeto:
        bots_list = [
            ('Valorant Bot', 75), ('CS2 Bot', 70), ('LoL Bot', 80),
            ('Fortnite Bot', 65), ('Roblox Bot', 60), ('GTA Bot', 70),
            ('Free Fire Bot', 68), ('Genshin Bot', 72), ('Minecraft Bot', 85),
            ('Clan War Bot', 75)
        ]
        for bot_name, bot_progress in bots_list[:projeto['bots']]:
            html += f'''
            <div class="sub-item">
                <div class="sub-item-header">
                    <span class="sub-name">🤖 {bot_name}</span>
                    <span class="progress-badge">{bot_progress}%</span>
                </div>
            </div>'''

    # Produtos do FOX MVP
    elif 'fox-mvp' in projeto.get('repositorio', '').lower():
        produtos = [
            ('Zapie.me', 'Link encurtador', 85),
            ('Agendar.page', 'Agendamento', 80),
            ('VozTexto Pro', 'Speech-to-text', 75),
            ('Notas de Voz', 'Voice notes', 70),
            ('Aquecedor Chips', 'Gaming tool', 65)
        ]
        for prod_name, prod_desc, prod_progress in produtos:
            html += f'''
            <div class="sub-item">
                <div class="sub-item-header">
                    <span class="sub-name">{prod_name}</span>
                    <span class="progress-badge">{prod_progress}%</span>
                </div>
                <div class="sub-desc">{prod_desc}</div>
            </div>'''

    # Agentes do FOX_AgentsIA
    elif 'agentsIA' in projeto.get('repositorio', '').lower() or projeto.get('nome') == 'FOX_AgentsIA':
        agents = [
            ('Harvey', 'IA jurídica', 80),
            ('Mike AI', 'IA de negócios', 75),
            ('Zapie Agent', 'Automação', 85)
        ]
        for agent_name, agent_desc, agent_progress in agents:
            html += f'''
            <div class="sub-item">
                <div class="sub-item-header">
                    <span class="sub-name">🤖 {agent_name}</span>
                    <span class="progress-badge">{agent_progress}%</span>
                </div>
                <div class="sub-desc">{agent_desc}</div>
            </div>'''

    return html

def render_project_card(projeto):
    """Renderiza um card de projeto"""
    status_colors = {
        'Em desenvolvimento': '#3b82f6',
        'Em pausa': '#f59e0b',
        'Concluído': '#10b981',
        'Arquivado': '#6b7280'
    }

    status_emoji = {
        'Em desenvolvimento': '🔧',
        'Em pausa': '⏸️',
        'Concluído': '✅',
        'Arquivado': '📦'
    }

    status = projeto.get('status', 'Desconhecido')
    color = status_colors.get(status, '#999')
    emoji = status_emoji.get(status, '❓')

    dominio_html = f'<a href="https://{projeto["dominio"]}" target="_blank" class="link">{projeto["dominio"]}</a>' if projeto.get('dominio') else '<span class="no-domain">Sem domínio</span>'

    receita_badge = '<span class="receita-badge">💰</span>' if projeto.get('receita') else ''

    sub_items = render_sub_items(projeto)
    sub_items_html = f'<div class="sub-items">{sub_items}</div>' if sub_items else ''

    return f'''
    <div class="card">
        <div class="card-header">
            <div class="title-row">
                <h3>{emoji} {projeto['nome']}</h3>
                {receita_badge}
            </div>
            <div class="status-badge" style="border-left: 4px solid {color}">{status}</div>
        </div>

        <div class="card-body">
            <div class="meta-row">
                <span class="meta"><strong>Repo:</strong> <code>{projeto['repositorio']}</code></span>
                <span class="meta"><strong>Tipo:</strong> {projeto.get('tipo', 'N/A')}</span>
            </div>

            <div class="meta-row">
                <span class="meta"><strong>Domínio:</strong> {dominio_html}</span>
            </div>

            <div class="progress-section">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: {projeto['progresso']}%"></div>
                </div>
                <span class="progress-text">{projeto['progresso']}% concluído</span>
            </div>

            {sub_items_html}
        </div>
    </div>
    '''

def generate_html(data):
    """Gera o HTML completo do dashboard"""
    stats = get_stats(data)
    projetos = data.get('projetos', [])

    # Agrupa por status
    ativos = sorted([p for p in projetos if p['status'] == 'Em desenvolvimento'], key=lambda x: -x['progresso'])
    pausa = sorted([p for p in projetos if p['status'] == 'Em pausa'], key=lambda x: -x['progresso'])
    completos = sorted([p for p in projetos if p['status'] == 'Concluído'], key=lambda x: -x['progresso'])
    arquivados = sorted([p for p in projetos if p['status'] == 'Arquivado'], key=lambda x: -x['progresso'])

    cards_html = ""

    if ativos:
        cards_html += '<div class="section"><h2>🔧 Em Desenvolvimento</h2>'
        for p in ativos:
            cards_html += render_project_card(p)
        cards_html += '</div>'

    if pausa:
        cards_html += '<div class="section"><h2>⏸️ Em Pausa</h2>'
        for p in pausa:
            cards_html += render_project_card(p)
        cards_html += '</div>'

    if completos:
        cards_html += '<div class="section"><h2>✅ Concluído</h2>'
        for p in completos:
            cards_html += render_project_card(p)
        cards_html += '</div>'

    if arquivados:
        cards_html += '<div class="section"><h2>📦 Arquivados</h2>'
        for p in arquivados:
            cards_html += render_project_card(p)
        cards_html += '</div>'

    now = datetime.utcnow().isoformat() + 'Z'

    html = f'''<title>Portfolio Dashboard — Versão Oficial</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta charset="UTF-8">
<style>
:root {{
  --primary: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --bg: #f9fafb;
  --surface: #ffffff;
  --border: #e5e7eb;
  --text: #111827;
}}

@media (prefers-color-scheme: dark) {{
  :root {{
    --bg: #1f2937;
    --surface: #111827;
    --border: #374151;
    --text: #f3f4f6;
  }}
}}

* {{ margin: 0; padding: 0; box-sizing: border-box; }}

body {{
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: var(--bg);
  color: var(--text);
  padding: 20px;
  line-height: 1.6;
}}

.container {{
  max-width: 1200px;
  margin: 0 auto;
}}

header {{
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}}

h1 {{
  font-size: 2.5rem;
  margin-bottom: 20px;
}}

.stats {{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}}

.stat-card {{
  background: var(--surface);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--border);
}}

.stat-value {{
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary);
}}

.stat-label {{
  font-size: 0.875rem;
  color: #6b7280;
  margin-top: 5px;
}}

.section {{
  margin-bottom: 40px;
}}

.section h2 {{
  font-size: 1.5rem;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid var(--primary);
}}

.cards-grid {{
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
}}

.card {{
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}}

.card:hover {{
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}}

.card-header {{
  padding: 15px;
  background: linear-gradient(135deg, var(--primary), #1e40af);
  color: white;
}}

.title-row {{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}}

.card-header h3 {{
  margin: 0;
  font-size: 1.1rem;
}}

.receita-badge {{
  font-size: 1.2rem;
}}

.status-badge {{
  display: inline-block;
  padding: 4px 12px;
  background: rgba(255,255,255,0.2);
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
}}

.card-body {{
  padding: 15px;
}}

.meta-row {{
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}}

.meta {{
  font-size: 0.875rem;
}}

code {{
  background: var(--border);
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Courier New', monospace;
}}

.link {{
  color: var(--primary);
  text-decoration: none;
}}

.link:hover {{
  text-decoration: underline;
}}

.no-domain {{
  color: #9ca3af;
  font-style: italic;
}}

.progress-section {{
  margin-bottom: 15px;
}}

.progress-bar {{
  height: 8px;
  background: var(--border);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 8px;
}}

.progress-fill {{
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #1e40af);
  transition: width 0.3s ease;
}}

.progress-text {{
  font-size: 0.875rem;
  color: #6b7280;
}}

.progress-badge {{
  display: inline-block;
  padding: 2px 8px;
  background: var(--primary);
  color: white;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
}}

.sub-items {{
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--border);
}}

.sub-item {{
  padding: 8px 0;
  font-size: 0.875rem;
}}

.sub-item-header {{
  display: flex;
  justify-content: space-between;
  align-items: center;
}}

.sub-name {{
  font-weight: 500;
}}

.sub-badge {{
  background: var(--warning);
  color: white;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 0.75rem;
}}

.sub-desc {{
  color: #6b7280;
  margin-top: 3px;
}}

.sub-progress {{
  margin-top: 5px;
}}

.updated-at {{
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  color: #6b7280;
  font-size: 0.875rem;
}}

@media (max-width: 768px) {{
  h1 {{ font-size: 1.5rem; }}
  .cards-grid {{ grid-template-columns: 1fr; }}
  .meta-row {{ flex-direction: column; gap: 10px; }}
}}
</style>

<div class="container">
  <header>
    <h1>📊 Portfolio Dashboard</h1>
    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">{stats['total']}</div>
        <div class="stat-label">Projetos Totais</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{stats['ativos']}</div>
        <div class="stat-label">Em Desenvolvimento</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{stats['progresso_medio']}%</div>
        <div class="stat-label">Progresso Médio</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{stats['completos'] + stats['arquivados']}</div>
        <div class="stat-label">Concluídos</div>
      </div>
    </div>
  </header>

  <div class="section">
    {cards_html}
  </div>

  <div class="updated-at">
    ⚡ Atualizado automaticamente em {now}
    <br>
    <small>Próxima atualização: próximo ciclo 2x/semana (seg/qui 09:00 UTC)</small>
  </div>
</div>
'''

    return html

def main():
    print("🔄 Sincronizando Portfolio Dashboard...")

    # Carrega dados
    data = load_projects()
    stats = get_stats(data)

    print(f"✅ Carregados {stats['total']} projetos")
    print(f"   - {stats['ativos']} em desenvolvimento")
    print(f"   - {stats['pausa']} em pausa")
    print(f"   - {stats['completos']} concluídos")
    print(f"   - {stats['arquivados']} arquivados")
    print(f"   - Progresso médio: {stats['progresso_medio']}%")

    # Gera HTML
    html = generate_html(data)

    # Salva em arquivo temporário
    output_path = Path('/tmp/portfolio-turbo-full-sync.html')
    output_path.write_text(html, encoding='utf-8')

    print(f"✅ Dashboard atualizado: {output_path}")
    print("\n💡 Próximo passo: Publicar este arquivo como artifact no Claude Code")
    print("   URL esperada: https://claude.ai/code/artifact/...")

    return 0

if __name__ == '__main__':
    sys.exit(main())
