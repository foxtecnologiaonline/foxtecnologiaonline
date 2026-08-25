import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConteudoProduto } from './entities/conteudo-produto.entity';
import { CreateConteudoDto } from './dto/create-conteudo.dto';
import { S3Service } from './storage/s3.service';

@Injectable()
export class ConteudoService {
  constructor(
    @InjectRepository(ConteudoProduto)
    private readonly conteudos: Repository<ConteudoProduto>,
    private readonly s3: S3Service,
  ) {}

  async criar(
    produtoId: string,
    dto: CreateConteudoDto,
    arquivo: { buffer: Buffer; originalname: string; mimetype: string },
  ): Promise<ConteudoProduto> {
    const key = this.s3.buildKey(produtoId, arquivo.originalname);
    await this.s3.upload(key, arquivo.buffer, arquivo.mimetype);

    return this.conteudos.save(
      this.conteudos.create({
        produtoId,
        tipo: dto.tipo,
        titulo: dto.titulo,
        urlArquivo: key,
        ordem: dto.ordem ?? 0,
      }),
    );
  }

  async listarPorProduto(produtoId: string) {
    const itens = await this.conteudos.find({
      where: { produtoId },
      order: { ordem: 'ASC' },
    });
    return Promise.all(
      itens.map(async (item) => ({
        id: item.id,
        tipo: item.tipo,
        titulo: item.titulo,
        ordem: item.ordem,
        url: await this.s3.gerarUrlAssinada(item.urlArquivo),
      })),
    );
  }

  async buscarPorId(id: string): Promise<ConteudoProduto> {
    const conteudo = await this.conteudos.findOne({ where: { id } });
    if (!conteudo) throw new NotFoundException('Conteudo nao encontrado.');
    return conteudo;
  }
}
