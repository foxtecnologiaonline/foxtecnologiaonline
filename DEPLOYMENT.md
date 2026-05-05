# Guia de Deployment - Vercel

Este guia explica como fazer o deployment do site FOX tecnologIA no Vercel.

## 📋 Pré-requisitos

- Conta no [Vercel](https://vercel.com) (pode usar GitHub/Google)
- Repositório GitHub conectado: https://github.com/foxtecnologiaonline/foxtecnologiaonline
- Domínio: foxtecnologia.online (já configurado)

## 🚀 Passos para Deployment

### 1. Conectar Repositório ao Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Selecione **GitHub** como provedor
4. Encontre e selecione o repositório `foxtecnologiaonline`
5. Clique em **"Import"**

### 2. Configurar Variáveis de Ambiente

Na página de configuração do projeto no Vercel:

1. Vá até **"Settings" → "Environment Variables"**
2. Adicione as seguintes variáveis:

```
ZOHO_EMAIL = seu_email@zoho.com
ZOHO_PASSWORD = sua_senha_app_zoho
ZOHO_SMTP_HOST = smtp.zoho.com
ZOHO_SMTP_PORT = 587
NEXT_PUBLIC_SITE_URL = https://www.foxtecnologia.online
```

**Importante:** Use a senha do aplicativo Zoho, não a senha principal da conta.

### 3. Configurar Domínio Personalizado

1. Em **"Settings" → "Domains"**
2. Clique em **"Add Domain"**
3. Digite: `foxtecnologia.online`
4. Siga as instruções para apontar o DNS do seu registrador para Vercel

**Registrador atual:** Verifique onde está registrado o domínio e configure os nameservers para:
- `ns1.vercel-dns.com`
- `ns2.vercel-dns.com`

Ou use o CNAME se preferir:
- `cname.vercel-dns.com`

### 4. Deploy Automático

Uma vez configurado:
- Cada push para a branch `main` no GitHub dispara um deploy automático
- Você pode acompanhar o status em https://vercel.com/dashboard

### 5. Testar o Deployment

Após o deploy ser concluído:

1. Acesse https://foxtecnologia.online
2. Teste as páginas:
   - Home
   - Sobre
   - Produtos
   - Contato
3. Teste o formulário de contato:
   - Preencha e envie
   - Verifique se o email chegou em contato@foxtecnologia.online
   - Verifique se recebeu email de confirmação

## 🔧 Troubleshooting

### Erro: "Module not found"
- Certifique-se de que todas as variáveis de ambiente estão configuradas
- Verifique os nomes das importações (case-sensitive)

### Formulário de contato não funciona
- Verifique as credenciais Zoho no Vercel
- Certifique-se de que ZOHO_PASSWORD é a senha do aplicativo, não a senha da conta
- Verifique o status do serviço Zoho Mail

### Domínio não resolve
- Aguarde até 48 horas para propagação do DNS
- Verifique se o nameserver foi atualizado no registrador
- Use ferramentas como `nslookup` ou `dig` para verificar:
  ```bash
  nslookup foxtecnologia.online
  ```

## 📊 Monitoramento

Após o deploy:

1. **Analytics:** Vercel fornece métricas automáticas (visite https://vercel.com/dashboard)
2. **Logs:** Visite https://vercel.com/dashboard para ver logs de build e runtime
3. **Performance:** Use Lighthouse para auditar performance
4. **SEO:** Verifique SEO usando ferramentas como Google Search Console

## 🔄 CI/CD Pipeline

O projeto usa um pipeline automatizado:

```
Git Push (main) 
  → GitHub Webhook 
    → Vercel receives trigger 
      → npm install 
        → npm run build 
          → npm run start (preview/production)
            → Deploy live
```

## 📝 Variáveis de Ambiente (Referência)

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| ZOHO_EMAIL | Email Zoho para envio | seu_email@zoho.com |
| ZOHO_PASSWORD | Senha do app Zoho | xxxxxxxxxxxxxxxx |
| ZOHO_SMTP_HOST | Host do SMTP Zoho | smtp.zoho.com |
| ZOHO_SMTP_PORT | Porta SMTP | 587 |
| NEXT_PUBLIC_SITE_URL | URL do site | https://www.foxtecnologia.online |

## 🚨 Importante

⚠️ **Nunca commite variáveis de ambiente no Git!**

Sempre use:
- `.env.local` localmente (no `.gitignore`)
- Environment Variables no dashboard do Vercel
- `.env.local.example` como template (sem valores reais)

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Vercel dashboard
2. Consulte a documentação: https://vercel.com/docs
3. Contate: contato@foxtecnologia.online
