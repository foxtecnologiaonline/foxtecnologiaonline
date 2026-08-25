import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1700000000000 implements MigrationInterface {
  name = 'InitSchema1700000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto`);

    await queryRunner.query(`
      CREATE TYPE status_unidade AS ENUM ('disponivel', 'reservado', 'vendido', 'devolvido', 'bloqueado');
    `);
    await queryRunner.query(`
      CREATE TYPE status_produto AS ENUM ('rascunho', 'ativo', 'inativo');
    `);
    await queryRunner.query(`
      CREATE TYPE status_venda AS ENUM ('pendente', 'confirmada', 'cancelada');
    `);
    await queryRunner.query(`
      CREATE TYPE status_devolucao AS ENUM ('pendente', 'aprovada_automatica', 'aprovada_manual', 'rejeitada');
    `);
    await queryRunner.query(`
      CREATE TYPE tipo_conteudo AS ENUM ('manual', 'cartilha', 'video');
    `);

    await queryRunner.query(`
      CREATE TABLE produtos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nome TEXT NOT NULL,
        descricao TEXT,
        preco NUMERIC(10,2) NOT NULL,
        categoria TEXT,
        status status_produto NOT NULL DEFAULT 'rascunho',
        estoque_lote_padrao INT NOT NULL DEFAULT 300,
        limiar_reabastecimento INT NOT NULL DEFAULT 30,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
        atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    await queryRunner.query(`
      CREATE TABLE unidades_estoque (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        produto_id UUID NOT NULL REFERENCES produtos(id),
        codigo TEXT UNIQUE,
        status status_unidade NOT NULL DEFAULT 'disponivel',
        venda_id UUID,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
        atualizado_em TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    await queryRunner.query(
      `CREATE INDEX idx_unidades_produto_status ON unidades_estoque (produto_id, status);`,
    );

    await queryRunner.query(`
      CREATE TABLE vendas (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        produto_id UUID NOT NULL REFERENCES produtos(id),
        unidade_id UUID REFERENCES unidades_estoque(id),
        comprador_email TEXT NOT NULL,
        valor NUMERIC(10,2) NOT NULL,
        status status_venda NOT NULL DEFAULT 'pendente',
        gateway_transacao_id TEXT,
        criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
        confirmado_em TIMESTAMPTZ
      );
    `);
    await queryRunner.query(
      `ALTER TABLE unidades_estoque ADD CONSTRAINT fk_unidades_venda FOREIGN KEY (venda_id) REFERENCES vendas(id);`,
    );
    await queryRunner.query(
      `CREATE INDEX idx_vendas_status ON vendas (status);`,
    );
    await queryRunner.query(
      `CREATE INDEX idx_vendas_comprador_email ON vendas (comprador_email);`,
    );

    await queryRunner.query(`
      CREATE TABLE devolucoes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        venda_id UUID NOT NULL REFERENCES vendas(id),
        unidade_id UUID NOT NULL REFERENCES unidades_estoque(id),
        motivo TEXT,
        status status_devolucao NOT NULL DEFAULT 'pendente',
        criado_em TIMESTAMPTZ NOT NULL DEFAULT now(),
        processado_em TIMESTAMPTZ
      );
    `);

    await queryRunner.query(`
      CREATE TABLE conteudos_produto (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        produto_id UUID NOT NULL REFERENCES produtos(id),
        tipo tipo_conteudo NOT NULL,
        titulo TEXT NOT NULL,
        url_arquivo TEXT NOT NULL,
        ordem INT NOT NULL DEFAULT 0
      );
    `);

    await queryRunner.query(`
      CREATE TABLE usuarios (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        senha_hash TEXT NOT NULL,
        tipo TEXT NOT NULL CHECK (tipo IN ('admin', 'cliente')),
        criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);

    // Extra table (not in the literal spec schema, but required by
    // "log do reabastecimento" business rule #2 and the
    // GET /admin/reabastecimentos endpoint).
    await queryRunner.query(`
      CREATE TABLE reabastecimento_logs (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        produto_id UUID NOT NULL REFERENCES produtos(id),
        quantidade_gerada INT NOT NULL,
        estoque_disponivel_antes INT NOT NULL,
        motivo TEXT NOT NULL DEFAULT 'limiar_atingido',
        criado_em TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS reabastecimento_logs;`);
    await queryRunner.query(`DROP TABLE IF EXISTS usuarios;`);
    await queryRunner.query(`DROP TABLE IF EXISTS conteudos_produto;`);
    await queryRunner.query(`DROP TABLE IF EXISTS devolucoes;`);
    await queryRunner.query(
      `ALTER TABLE unidades_estoque DROP CONSTRAINT IF EXISTS fk_unidades_venda;`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS vendas;`);
    await queryRunner.query(`DROP TABLE IF EXISTS unidades_estoque;`);
    await queryRunner.query(`DROP TABLE IF EXISTS produtos;`);
    await queryRunner.query(`DROP TYPE IF EXISTS tipo_conteudo;`);
    await queryRunner.query(`DROP TYPE IF EXISTS status_devolucao;`);
    await queryRunner.query(`DROP TYPE IF EXISTS status_venda;`);
    await queryRunner.query(`DROP TYPE IF EXISTS status_produto;`);
    await queryRunner.query(`DROP TYPE IF EXISTS status_unidade;`);
  }
}
