import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

export interface AnexoConteudo {
  titulo: string;
  tipo: string;
  url: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter: nodemailer.Transporter | null;
  private readonly from: string;

  constructor(private readonly config: ConfigService) {
    this.from = this.config.get<string>('email.from') ?? 'naoresponda@foxtecnologiaonline.com';
    const host = this.config.get<string>('email.smtpHost');
    if (host) {
      this.transporter = nodemailer.createTransport({
        host,
        port: this.config.get<number>('email.smtpPort'),
        secure: false,
        auth: {
          user: this.config.get<string>('email.smtpUser'),
          pass: this.config.get<string>('email.smtpPass'),
        },
      });
    } else {
      this.transporter = null;
      this.logger.warn(
        'SMTP nao configurado (SMTP_HOST vazio) - e-mails serao apenas registrados em log.',
      );
    }
  }

  private async enviar(to: string, subject: string, html: string) {
    if (!this.transporter) {
      this.logger.log(`[email simulado] para=${to} assunto="${subject}"`);
      return;
    }
    await this.transporter.sendMail({ from: this.from, to, subject, html });
  }

  async enviarEntregaProduto(params: {
    email: string;
    produtoNome: string;
    codigo: string | null;
    conteudos: AnexoConteudo[];
    linkAreaCliente: string;
  }) {
    const listaConteudos = params.conteudos
      .map((c) => `<li><a href="${c.url}">${c.titulo}</a> (${c.tipo})</li>`)
      .join('');
    const html = `
      <h2>Sua compra foi confirmada!</h2>
      <p>Produto: <strong>${params.produtoNome}</strong></p>
      ${params.codigo ? `<p>Sua chave/licenca: <strong>${params.codigo}</strong></p>` : ''}
      <p>Materiais de apoio:</p>
      <ul>${listaConteudos || '<li>Nenhum material vinculado.</li>'}</ul>
      <p>Acesse sua area do cliente: <a href="${params.linkAreaCliente}">${params.linkAreaCliente}</a></p>
    `;
    await this.enviar(params.email, `Sua compra: ${params.produtoNome}`, html);
  }

  async enviarDevolucaoAprovada(params: { email: string; produtoNome: string }) {
    const html = `<p>Sua devolucao do produto <strong>${params.produtoNome}</strong> foi aprovada automaticamente. O valor sera estornado conforme a politica do meio de pagamento.</p>`;
    await this.enviar(params.email, `Devolucao aprovada: ${params.produtoNome}`, html);
  }

  async enviarDevolucaoEmRevisao(params: { email: string; produtoNome: string }) {
    const html = `<p>Sua solicitacao de devolucao do produto <strong>${params.produtoNome}</strong> foi recebida e esta em analise manual pela nossa equipe.</p>`;
    await this.enviar(params.email, `Devolucao em analise: ${params.produtoNome}`, html);
  }
}
