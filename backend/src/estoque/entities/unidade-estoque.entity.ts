import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';

export type StatusUnidade =
  | 'disponivel'
  | 'reservado'
  | 'vendido'
  | 'devolvido'
  | 'bloqueado';

@Entity('unidades_estoque')
@Index('idx_unidades_produto_status', ['produtoId', 'status'])
export class UnidadeEstoque {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'produto_id', type: 'uuid' })
  produtoId: string;

  @ManyToOne(() => Produto, { onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @Column({ type: 'text', nullable: true, unique: true })
  codigo: string | null;

  @Column({
    type: 'enum',
    enum: ['disponivel', 'reservado', 'vendido', 'devolvido', 'bloqueado'],
    enumName: 'status_unidade',
    default: 'disponivel',
  })
  status: StatusUnidade;

  @Column({ name: 'venda_id', type: 'uuid', nullable: true })
  vendaId: string | null;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em', type: 'timestamptz' })
  atualizadoEm: Date;
}
