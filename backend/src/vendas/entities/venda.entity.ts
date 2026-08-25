import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';
import { UnidadeEstoque } from '../../estoque/entities/unidade-estoque.entity';

export type StatusVenda = 'pendente' | 'confirmada' | 'cancelada';

@Entity('vendas')
export class Venda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'produto_id', type: 'uuid' })
  produtoId: string;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @Column({ name: 'unidade_id', type: 'uuid', nullable: true })
  unidadeId: string | null;

  @ManyToOne(() => UnidadeEstoque)
  @JoinColumn({ name: 'unidade_id' })
  unidade: UnidadeEstoque;

  @Column({ name: 'comprador_email', type: 'text' })
  compradorEmail: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  valor: string;

  @Column({
    type: 'enum',
    enum: ['pendente', 'confirmada', 'cancelada'],
    enumName: 'status_venda',
    default: 'pendente',
  })
  status: StatusVenda;

  @Column({ name: 'gateway_transacao_id', type: 'text', nullable: true })
  gatewayTransacaoId: string | null;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm: Date;

  @Column({ name: 'confirmado_em', type: 'timestamptz', nullable: true })
  confirmadoEm: Date | null;
}
