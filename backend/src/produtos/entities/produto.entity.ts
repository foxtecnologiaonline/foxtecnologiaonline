import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type StatusProduto = 'rascunho' | 'ativo' | 'inativo';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ type: 'text', nullable: true })
  descricao: string | null;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  preco: string;

  @Column({ type: 'text', nullable: true })
  categoria: string | null;

  @Column({ type: 'enum', enum: ['rascunho', 'ativo', 'inativo'], enumName: 'status_produto', default: 'rascunho' })
  status: StatusProduto;

  @Column({ name: 'estoque_lote_padrao', type: 'int', default: 300 })
  estoqueLotePadrao: number;

  @Column({ name: 'limiar_reabastecimento', type: 'int', default: 30 })
  limiarReabastecimento: number;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  atualizadoEm: Date;
}
