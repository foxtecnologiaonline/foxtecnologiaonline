import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Venda } from '../../vendas/entities/venda.entity';
import { UnidadeEstoque } from '../../estoque/entities/unidade-estoque.entity';

export type StatusDevolucao =
  | 'pendente'
  | 'aprovada_automatica'
  | 'aprovada_manual'
  | 'rejeitada';

@Entity('devolucoes')
export class Devolucao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'venda_id', type: 'uuid' })
  vendaId: string;

  @ManyToOne(() => Venda)
  @JoinColumn({ name: 'venda_id' })
  venda: Venda;

  @Column({ name: 'unidade_id', type: 'uuid' })
  unidadeId: string;

  @ManyToOne(() => UnidadeEstoque)
  @JoinColumn({ name: 'unidade_id' })
  unidade: UnidadeEstoque;

  @Column({ type: 'text', nullable: true })
  motivo: string | null;

  @Column({
    type: 'enum',
    enum: ['pendente', 'aprovada_automatica', 'aprovada_manual', 'rejeitada'],
    enumName: 'status_devolucao',
    default: 'pendente',
  })
  status: StatusDevolucao;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm: Date;

  @Column({ name: 'processado_em', type: 'timestamptz', nullable: true })
  processadoEm: Date | null;
}
