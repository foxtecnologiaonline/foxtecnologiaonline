import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Produto } from './entities/produto.entity';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import {
  GerarEstoqueInicialPayload,
  JOB_GERAR_ESTOQUE_INICIAL,
  QUEUE_ESTOQUE,
} from '../jobs/queues';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtos: Repository<Produto>,
    @InjectQueue(QUEUE_ESTOQUE)
    private readonly estoqueQueue: Queue<GerarEstoqueInicialPayload>,
    private readonly config: ConfigService,
  ) {}

  async create(dto: CreateProdutoDto): Promise<Produto> {
    const lotePadrao =
      dto.estoqueLotePadrao ?? this.config.get<number>('estoque.lotePadrao') ?? 300;
    const limiar =
      dto.limiarReabastecimento ??
      this.config.get<number>('estoque.limiarReabastecimento') ??
      30;

    const produto = await this.produtos.save(
      this.produtos.create({
        nome: dto.nome,
        descricao: dto.descricao ?? null,
        preco: dto.preco.toFixed(2),
        categoria: dto.categoria ?? null,
        status: dto.status ?? 'rascunho',
        estoqueLotePadrao: lotePadrao,
        limiarReabastecimento: limiar,
      }),
    );

    // Regra de negocio 1: geracao automatica do estoque inicial.
    // Enfileirado (em vez de executado inline) para nao bloquear a resposta
    // HTTP em caso de lotes grandes, mas dispara imediatamente na criacao.
    await this.estoqueQueue.add(JOB_GERAR_ESTOQUE_INICIAL, {
      produtoId: produto.id,
      quantidade: lotePadrao,
    });

    return produto;
  }

  findAtivos(): Promise<Produto[]> {
    return this.produtos.find({ where: { status: 'ativo' }, order: { criadoEm: 'DESC' } });
  }

  findAllAdmin(): Promise<Produto[]> {
    return this.produtos.find({ order: { criadoEm: 'DESC' } });
  }

  async findOneOrFail(id: string): Promise<Produto> {
    const produto = await this.produtos.findOne({ where: { id } });
    if (!produto) throw new NotFoundException('Produto nao encontrado.');
    return produto;
  }

  async update(id: string, dto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOneOrFail(id);
    Object.assign(produto, {
      ...dto,
      preco: dto.preco !== undefined ? dto.preco.toFixed(2) : produto.preco,
    });
    return this.produtos.save(produto);
  }
}
