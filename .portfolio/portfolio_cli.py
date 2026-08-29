#!/usr/bin/env python3
"""
Portfolio CLI - Gerenciador de projetos FoxTecnologiaOnline
Usage: python3 portfolio_cli.py [comando] [args]
"""

import json
import sys
from datetime import datetime
from pathlib import Path
from typing import Optional

# Cores para terminal
class Colors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

class PortfolioCLI:
    def __init__(self):
        self.config_path = Path(__file__).parent / "projetos.json"
        self.data = self._load_data()

    def _load_data(self):
        """Carrega dados do JSON"""
        with open(self.config_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def _save_data(self):
        """Salva dados no JSON"""
        self.data['metadata']['ultima_atualizacao'] = datetime.now().isoformat() + 'Z'
        with open(self.config_path, 'w', encoding='utf-8') as f:
            json.dump(self.data, f, indent=2, ensure_ascii=False)

    def list_all(self):
        """Lista todos os projetos com status"""
        print(f"\n{Colors.HEADER}{Colors.BOLD}📊 Portfolio de Projetos{Colors.ENDC}")
        print(f"Total: {self.data['metadata']['total_projetos']} projetos\n")

        for status in ["Em desenvolvimento", "Exploração", "Pausa", "Concluído", "Arquivado"]:
            projetos = [p for p in self.data['projetos'] if p.get('status') == status]
            if not projetos:
                continue

            print(f"{Colors.BOLD}{status}:{Colors.ENDC}")
            for p in projetos:
                progresso_bar = self._get_progresso_bar(p['progresso'])
                print(f"  #{p['id']:2d} | {p['nome']:20s} | {p['repositorio']:20s} | {progresso_bar} {p['progresso']}%")
            print()

    def get_projeto(self, project_id: int):
        """Mostra detalhes de um projeto específico"""
        projeto = next((p for p in self.data['projetos'] if p['id'] == project_id), None)
        if not projeto:
            print(f"{Colors.FAIL}❌ Projeto #{project_id} não encontrado{Colors.ENDC}")
            return

        print(f"\n{Colors.BOLD}{Colors.OKBLUE}Projeto #{projeto['id']}: {projeto['nome']}{Colors.ENDC}")
        print(f"Repository: {projeto['repositorio']}")
        print(f"Domínio: {projeto.get('dominio', '—')}")
        print(f"Status: {projeto['status']}")
        print(f"Progresso: {self._get_progresso_bar(projeto['progresso'])} {projeto['progresso']}%")
        print(f"Tipo: {projeto.get('tipo', '—')}")
        print(f"Descrição: {projeto.get('descricao', '—')}")
        print(f"Receita: {'✅ Sim' if projeto.get('receita') else '❌ Não'}")
        print(f"Última sessão: {projeto.get('ultima_sessao', '—')}")
        if projeto.get('tags'):
            print(f"Tags: {', '.join(projeto['tags'])}")
        print()

    def update_progresso(self, project_id: int, novo_progresso: int):
        """Atualiza progresso de um projeto"""
        projeto = next((p for p in self.data['projetos'] if p['id'] == project_id), None)
        if not projeto:
            print(f"{Colors.FAIL}❌ Projeto #{project_id} não encontrado{Colors.ENDC}")
            return

        old_prog = projeto['progresso']
        projeto['progresso'] = novo_progresso
        projeto['ultima_sessao'] = datetime.now().strftime('%Y-%m-%d')
        self._save_data()

        print(f"{Colors.OKGREEN}✅ Projeto #{project_id} atualizado:{Colors.ENDC}")
        print(f"   {projeto['nome']}: {old_prog}% → {novo_progresso}%")

    def report_ativos(self):
        """Gera relatório de projetos ativos"""
        ativos = [p for p in self.data['projetos'] if p['status'] in ["Em desenvolvimento", "Exploração"]]
        ativos.sort(key=lambda x: x['progresso'], reverse=True)

        print(f"\n{Colors.BOLD}{Colors.OKGREEN}🚀 Projetos Ativos (ordenado por progresso){Colors.ENDC}\n")

        total_prog = sum(p['progresso'] for p in ativos) / len(ativos) if ativos else 0
        print(f"Progresso médio: {total_prog:.1f}%\n")

        for p in ativos:
            status_icon = "🔴" if p['status'] == "Em desenvolvimento" else "🟡"
            print(f"{status_icon} #{p['id']:2d} | {p['nome']:25s} | {self._get_progresso_bar(p['progresso'])} {p['progresso']:3d}%")

    def report_receita(self):
        """Gera relatório de projetos com receita"""
        receita = [p for p in self.data['projetos'] if p.get('receita') and p['status'] != "Arquivado"]
        receita.sort(key=lambda x: x['progresso'], reverse=True)

        print(f"\n{Colors.BOLD}{Colors.OKGREEN}💰 Projetos com Receita Potencial{Colors.ENDC}\n")
        print(f"Total: {len(receita)} projetos\n")

        for p in receita:
            status = p['status']
            status_color = Colors.OKGREEN if status == "Em desenvolvimento" else Colors.WARNING
            print(f"#{p['id']:2d} | {p['nome']:25s} | {status_color}{status:20s}{Colors.ENDC} | {self._get_progresso_bar(p['progresso'])} {p['progresso']}%")

    def report_repos(self):
        """Gera relatório de repositórios"""
        print(f"\n{Colors.BOLD}{Colors.OKBLUE}📦 Repositórios{Colors.ENDC}\n")

        for repo in self.data['repositorios']:
            projetos_count = len(repo['projetos'])
            status_color = {
                "Ativo": Colors.OKGREEN,
                "Pausa": Colors.WARNING,
                "Concluído": Colors.OKBLUE,
                "Exploração": Colors.OKCYAN
            }.get(repo['status'], Colors.ENDC)

            print(f"{status_color}{repo['status']:15s}{Colors.ENDC} | {repo['nome']:25s} | {projetos_count} projeto(s) | {repo['linguagem'] or '—'}")

    def get_metrics(self):
        """Mostra métricas gerais"""
        stats = self.data['estatisticas']

        print(f"\n{Colors.BOLD}{Colors.HEADER}📈 Métricas Gerais{Colors.ENDC}\n")

        print(f"Total de projetos: {stats['total_projetos']}")
        print(f"  {Colors.OKGREEN}Ativos:{Colors.ENDC} {stats['ativos']}")
        print(f"  {Colors.OKCYAN}Em exploração:{Colors.ENDC} {stats['exploração']}")
        print(f"  {Colors.WARNING}Em pausa:{Colors.ENDC} {stats['pausa']}")
        print(f"  {Colors.OKBLUE}Concluídos:{Colors.ENDC} {stats['ativos'] + stats['pausa'] + stats['exploração'] - stats['total_projetos'] + stats['arquivados']}")
        print(f"  {Colors.FAIL}Arquivados:{Colors.ENDC} {stats['arquivados']}\n")

        print(f"Progresso médio geral: {stats['progresso_medio']}%")
        print(f"Projetos com receita: {stats['com_receita']}")
        print(f"Repositórios únicos: {stats['total_repositorios']}")
        print(f"Tecnologias principais: {', '.join(stats['tecnologias_principais'])}\n")

    def _get_progresso_bar(self, percent: int, size: int = 10) -> str:
        """Retorna barra de progresso ASCII"""
        filled = int(size * percent / 100)
        bar = "█" * filled + "░" * (size - filled)

        if percent >= 75:
            color = Colors.OKGREEN
        elif percent >= 50:
            color = Colors.OKCYAN
        elif percent >= 25:
            color = Colors.WARNING
        else:
            color = Colors.FAIL

        return f"{color}{bar}{Colors.ENDC}"

    def help(self):
        """Mostra ajuda"""
        print(f"""
{Colors.BOLD}{Colors.HEADER}Portfolio CLI - FoxTecnologiaOnline{Colors.ENDC}

{Colors.BOLD}Comandos:{Colors.ENDC}
  list              Lista todos os projetos
  get <id>          Mostra detalhes do projeto #id
  update <id> <%%>   Atualiza progresso do projeto #id para %%
  active            Relatório de projetos ativos
  receita           Relatório de projetos com receita
  repos             Relatório de repositórios
  metrics           Métricas gerais
  help              Mostra esta ajuda

{Colors.BOLD}Exemplos:{Colors.ENDC}
  python3 portfolio_cli.py list
  python3 portfolio_cli.py get 1
  python3 portfolio_cli.py update 1 80
  python3 portfolio_cli.py active
  python3 portfolio_cli.py metrics
""")

def main():
    cli = PortfolioCLI()

    if len(sys.argv) < 2:
        cli.help()
        return

    comando = sys.argv[1]

    if comando == "list":
        cli.list_all()
    elif comando == "get":
        if len(sys.argv) < 3:
            print(f"{Colors.FAIL}❌ Uso: portfolio_cli.py get <id>{Colors.ENDC}")
            return
        cli.get_projeto(int(sys.argv[2]))
    elif comando == "update":
        if len(sys.argv) < 4:
            print(f"{Colors.FAIL}❌ Uso: portfolio_cli.py update <id> <progresso>{Colors.ENDC}")
            return
        cli.update_progresso(int(sys.argv[2]), int(sys.argv[3]))
    elif comando == "active":
        cli.report_ativos()
    elif comando == "receita":
        cli.report_receita()
    elif comando == "repos":
        cli.report_repos()
    elif comando == "metrics":
        cli.get_metrics()
    elif comando == "help":
        cli.help()
    else:
        print(f"{Colors.FAIL}❌ Comando desconhecido: {comando}{Colors.ENDC}")
        cli.help()

if __name__ == "__main__":
    main()
