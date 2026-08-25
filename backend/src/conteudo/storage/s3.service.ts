import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { randomUUID } from 'crypto';

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly signedUrlExpira: number;

  constructor(private readonly config: ConfigService) {
    this.bucket = this.config.get<string>('storage.bucket') ?? 'ativos-digitais';
    this.signedUrlExpira = this.config.get<number>('storage.signedUrlExpiraSegundos') ?? 900;
    this.client = new S3Client({
      region: this.config.get<string>('storage.region'),
      endpoint: this.config.get<string>('storage.endpoint'),
      forcePathStyle: this.config.get<boolean>('storage.forcePathStyle'),
      credentials: {
        accessKeyId: this.config.get<string>('storage.accessKeyId') ?? '',
        secretAccessKey: this.config.get<string>('storage.secretAccessKey') ?? '',
      },
    });
  }

  buildKey(produtoId: string, nomeOriginal: string): string {
    const extensao = nomeOriginal.includes('.')
      ? nomeOriginal.slice(nomeOriginal.lastIndexOf('.'))
      : '';
    return `produtos/${produtoId}/conteudos/${randomUUID()}${extensao}`;
  }

  async upload(key: string, body: Buffer, contentType: string): Promise<void> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: body,
        ContentType: contentType,
      }),
    );
  }

  async gerarUrlAssinada(key: string): Promise<string> {
    const command = new GetObjectCommand({ Bucket: this.bucket, Key: key });
    return getSignedUrl(this.client, command, { expiresIn: this.signedUrlExpira });
  }
}
