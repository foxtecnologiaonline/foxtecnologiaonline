// Fonte única do conteúdo do site.
// Itens marcados com `provisorio: true` ou comentário "PROVISÓRIO" aguardam
// confirmação da FOX — ver CONTEUDO-PENDENTE.md na raiz do repositório.

export const COMPANY = {
  name: 'FOX tecnologIA',
  // PROVISÓRIO: confirmar a razão social exata do cartão CNPJ (ex.: "... Ltda").
  legalName: 'FOX tecnologia',
  cnpj: '66.586.436/0001-12',
  tagline: 'Soluções em tecnologIA',
  slogan:
    'Soluções em tecnologIA — licenças, IA e sistemas de gestão para quem precisa fazer mais.',
  description:
    'Licenças de software e IA, sistemas de gestão e serviços para órgãos públicos e empresas em todo o Brasil — e produtos digitais próprios movidos a inteligência artificial.',
  email: 'contato@foxtecnologia.online',
  // PROVISÓRIO: confirmar se o WhatsApp de atendimento é este mesmo número.
  phone: '+55 (34) 99143-9633',
  whatsapp: '5534991439633',
  website: 'https://www.foxtecnologia.online',
  coverage: 'Atendimento em todo o Brasil',
}

export function whatsappLink(message = 'Olá! Vim pelo site da FOX tecnologIA.') {
  return `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(message)}`
}

export type Product = {
  id: string
  name: string
  domain: string
  href: string
  kicker: string
  description: string
  accent: string
  logoSrc: string
  /** Texto ainda não confirmado pela FOX. */
  provisorio?: boolean
}

export const PRODUCTS: Product[] = [
  {
    id: 'zapscript',
    name: 'ZapScript.me',
    domain: 'zapscript.me',
    href: 'https://zapscript.me',
    kicker: 'WhatsApp + IA',
    description:
      'Transcreve e resume automaticamente os áudios que você recebe no WhatsApp. Leia em segundos o que levaria minutos para ouvir.',
    accent: '#34D399',
    logoSrc: '/logo-zapscript.svg',
  },
  {
    id: 'documentos',
    name: 'Documentos.shop',
    domain: 'documentos.shop',
    href: 'https://documentos.shop',
    kicker: 'Documentos digitais',
    // PROVISÓRIO: descrição herdada do site antigo, aguardando texto oficial.
    description:
      'Gere, organize e gerencie seus documentos digitais de forma rápida e prática, tudo em um só lugar.',
    accent: '#60A5FA',
    logoSrc: '/logo-documentos.svg',
    provisorio: true,
  },
  {
    id: 'mykollect',
    name: 'MyKollect',
    domain: 'mykollect.com',
    href: 'https://mykollect.com',
    kicker: 'Coleções + IA',
    description:
      'Tire uma foto, a IA identifica o item e você confirma. Catalogue sua coleção em segundos — sem digitação, sem planilhas.',
    accent: '#6EE7B7',
    logoSrc: '/logo-mykollect.svg',
  },
  {
    id: 'makeapp',
    name: 'Makeapp.me',
    domain: 'makeapp.me',
    href: 'https://makeapp.me',
    kicker: 'Apps sem código',
    // PROVISÓRIO: confirmar descrição e se o produto já está disponível.
    description:
      'Crie e publique seus próprios aplicativos de forma simples e rápida, sem precisar programar.',
    accent: '#A78BFA',
    logoSrc: '/logo-makeapp.svg',
    provisorio: true,
  },
]

export type Category = {
  id: string
  title: string
  description: string
  /** Marcas citadas como soluções fornecidas (sem selo de parceria oficial). */
  brands?: string[]
  items: string[]
  provisorio?: boolean
}

export const CATEGORIES: Category[] = [
  {
    id: 'ia',
    title: 'Inteligência artificial',
    description:
      'Licenças corporativas das principais plataformas de IA generativa, com orientação de uso para a sua equipe.',
    brands: ['ChatGPT', 'Claude', 'Gemini', 'Copilot'],
    items: ['Assistentes de IA corporativos', 'Planos para equipes', 'APIs de IA'],
  },
  {
    id: 'produtividade',
    title: 'Produtividade e colaboração',
    description:
      'Suítes de escritório, e-mail corporativo e armazenamento em nuvem para toda a organização.',
    brands: ['Microsoft 365', 'Google Workspace'],
    items: ['E-mail corporativo', 'Documentos e planilhas', 'Armazenamento em nuvem'],
  },
  {
    id: 'software',
    title: 'Licenças de software',
    // PROVISÓRIO: marcas destas categorias ainda não informadas.
    description:
      'Licenciamento perpétuo ou por assinatura, adequado às especificações do seu edital.',
    items: ['Segurança e antivírus', 'Design e CAD', 'Sistemas operacionais', 'Backup'],
    provisorio: true,
  },
  {
    id: 'gestao',
    title: 'Sistemas de gestão',
    // PROVISÓRIO: confirmar se são sistemas de terceiros, próprios ou ambos.
    description:
      'Soluções para gestão pública e empresarial, do protocolo ao financeiro.',
    items: ['ERP e financeiro', 'Gestão documental', 'Atendimento', 'BI e painéis'],
    provisorio: true,
  },
]

// PROVISÓRIO: confirmar quais serviços a FOX presta de fato.
export const SERVICES = [
  { title: 'Implantação', description: 'Ativação das licenças e configuração inicial do ambiente.' },
  { title: 'Treinamento em IA', description: 'Capacitação para a equipe usar a IA com segurança e resultado.' },
  { title: 'Suporte técnico', description: 'Canal direto para dúvidas, renovações e ajustes.' },
  { title: 'Nuvem', description: 'Migração e hospedagem de sistemas em ambientes seguros.' },
]

export const MODALITIES = [
  { name: 'Pregão eletrônico', tag: 'Lei 14.133' },
  { name: 'Dispensa de licitação', tag: 'art. 75' },
  { name: 'Adesão a ata', tag: 'SRP' },
  { name: 'Pesquisa de preços', tag: 'cotação' },
  { name: 'Compras corporativas', tag: 'B2B' },
]

export const STEPS = [
  { title: 'Envie o edital', description: 'Ou o termo de referência, a lista de itens e o prazo.' },
  { title: 'Análise técnica', description: 'Conferimos especificações, quantitativos e compatibilidade.' },
  { title: 'Proposta', description: 'Proposta comercial e documentos de habilitação organizados.' },
  { title: 'Entrega', description: 'Ativação, implantação e acompanhamento pós-venda.' },
]

export const REQUEST_TYPES = [
  'Pregão eletrônico',
  'Dispensa de licitação',
  'Adesão a ata (SRP)',
  'Cotação / pesquisa de preços',
  'Compra corporativa',
  'Produtos FOX',
  'Outro assunto',
] as const

export const NAV_LINKS = [
  { href: '/licitacoes', label: 'Licitações' },
  { href: '/produtos', label: 'Produtos' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]
