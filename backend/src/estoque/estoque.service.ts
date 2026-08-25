import { Injectable, Logger } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { UnidadeEstoque } from './entities/unidade-estoque.entity';

@Injectable()
export class EstoqueService {
  private readonly logger = new Logger(EstoqueService.name);

  constructor(
    @InjectRepository(UnidadeEstoque)
    private readonly unidades: Repository<UnidadeEstoque>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  /**
   * Regra de negocio 1 e 2: geracao inicial e reabastecimento de estoque.
   * Insere `quantidade` unidades disponiveis em uma unica transacao usando
   * generate_series, como pede a especificacao.
   */
  async gerarLote(produtoId: string, quantidade: number): Promise<number> {
    const result = await this.dataSource.query(
      `INSERT INTO unidades_estoque (produto_id, status)
       SELECT $1::uuid, 'disponivel'::status_unidade
       FROM generate_series(1, $2::int)
       RETURNING id`,
      [produtoId, quantidade],
    );
    this.logger.log(`Geradas ${result.length} unidades para o produto ${produtoId}.`);
    return result.length;
  }

  async contarDisponiveis(produtoId: string): Promise<number> {
    return this.unidades.count({ where: { produtoId, status: 'disponivel' } });
  }

  async contarPorStatus(produtoId: string): Promise<Record<string, number>> {
    const linhas: { status: string; total: string }[] = await this.dataSource.query(
      `SELECT status, COUNT(*)::int AS total FROM unidades_estoque WHERE produto_id = $1 GROUP BY status`,
      [produtoId],
    );
    const contagem: Record<string, number> = {
      disponivel: 0,
      reservado: 0,
      vendido: 0,
      devolvido: 0,
      bloqueado: 0,
    };
    for (const linha of linhas) contagem[linha.status] = Number(linha.total);
    return contagem;
  }

  async listarPorProduto(produtoId: string, status?: string, limit = 50, offset = 0) {
    const query = this.unidades
      .createQueryBuilder('u')
      .where('u.produtoId = :produtoId', { produtoId })
      .orderBy('u.criadoEm', 'DESC')
      .limit(limit)
      .offset(offset);
    if (status) query.andWhere('u.status = :status', { status });
    const [itens, total] = await query.getManyAndCount();
    return { itens, total };
  }

  /**
   * Regra de negocio 3: reserva de 1 unidade disponivel usando
   * SELECT ... FOR UPDATE SKIP LOCKED dentro de uma transacao, evitando que
   * duas compras concorrentes reservem a mesma unidade.
   */
  async reservarUnidade(produtoId: string): Promise<UnidadeEstoque | null> {
    return this.dataSource.transaction(async (manager) => {
      const linhas: { id: string }[] = await manager.query(
        `SELECT id FROM unidades_estoque
         WHERE produto_id = $1 AND status = 'disponivel'
         ORDER BY criado_em ASC
         LIMIT 1
         FOR UPDATE SKIP LOCKED`,
        [produtoId],
      );
      if (linhas.length === 0) return null;

      const unidadeId = linhas[0].id;
      await manager.query(
        `UPDATE unidades_estoque SET status = 'reservado', atualizado_em = now() WHERE id = $1`,
        [unidadeId],
      );
      return manager.findOne(UnidadeEstoque, { where: { id: unidadeId } });
    });
  }

  async marcarReservadaParaVenda(unidadeId: string, vendaId: string): Promise<void> {
    await this.unidades.update(unidadeId, { vendaId });
  }

  async liberarReserva(unidadeId: string): Promise<void> {
    await this.unidades.update(
      { id: unidadeId, status: 'reservado' },
      { status: 'disponivel', vendaId: null },
    );
  }

  async marcarVendida(unidadeId: string, vendaId: string): Promise<UnidadeEstoque> {
    await this.unidades.update(unidadeId, {
      status: 'vendido',
      vendaId,
      codigo: this.gerarCodigo(),
    });
    return this.unidades.findOneOrFail({ where: { id: unidadeId } });
  }

  async marcarDevolvida(unidadeId: string): Promise<void> {
    await this.unidades.update(unidadeId, { status: 'devolvido', vendaId: null });
  }

  /** Rede de seguranca do cron: reservas travadas ha mais de `minutos`. */
  async listarIdsReservasExpiradas(minutos: number): Promise<string[]> {
    const linhas: { id: string }[] = await this.dataSource.query(
      `SELECT id FROM unidades_estoque
       WHERE status = 'reservado' AND atualizado_em < now() - ($1 || ' minutes')::interval`,
      [minutos],
    );
    return linhas.map((linha) => linha.id);
  }

  async buscarPorId(id: string): Promise<UnidadeEstoque | null> {
    return this.unidades.findOne({ where: { id } });
  }

  private gerarCodigo(): string {
    return randomUUID().toUpperCase().replace(/-/g, '').slice(0, 20).replace(/(.{5})/g, '$1-').slice(0, 24);
  }
}
