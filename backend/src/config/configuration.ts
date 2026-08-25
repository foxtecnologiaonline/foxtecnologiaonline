export default () => ({
  port: parseInt(process.env.PORT ?? '3001', 10),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  database: {
    url: process.env.DATABASE_URL,
  },
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'dev-secret',
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  },
  estoque: {
    lotePadrao: parseInt(process.env.ESTOQUE_LOTE_PADRAO ?? '300', 10),
    limiarReabastecimento: parseInt(
      process.env.ESTOQUE_LIMIAR_REABASTECIMENTO ?? '30',
      10,
    ),
    reservaExpiraMinutos: parseInt(
      process.env.RESERVA_EXPIRA_MINUTOS ?? '15',
      10,
    ),
  },
  storage: {
    endpoint: process.env.S3_ENDPOINT || undefined,
    region: process.env.S3_REGION ?? 'us-east-1',
    bucket: process.env.S3_BUCKET ?? 'ativos-digitais',
    accessKeyId: process.env.S3_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? '',
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
    signedUrlExpiraSegundos: parseInt(
      process.env.S3_SIGNED_URL_EXPIRA_SEGUNDOS ?? '900',
      10,
    ),
  },
  pagamento: {
    webhookSecret: process.env.PAGAMENTO_WEBHOOK_SECRET ?? '',
  },
  email: {
    from: process.env.EMAIL_FROM ?? 'naoresponda@foxtecnologiaonline.com',
    smtpHost: process.env.SMTP_HOST,
    smtpPort: parseInt(process.env.SMTP_PORT ?? '587', 10),
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
  },
  devolucao: {
    prazoDias: parseInt(process.env.DEVOLUCAO_PRAZO_DIAS ?? '7', 10),
  },
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',
});
