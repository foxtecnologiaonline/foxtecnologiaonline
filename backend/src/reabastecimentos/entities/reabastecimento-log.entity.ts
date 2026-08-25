import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';

@Entity('reabastecimento_logs')
export class ReabastecimentoLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'produto_id', type: 'uuid' })
  produtoId: string;

  @ManyToOne(() => Produto)
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @Column({ name: 'quantidade_gerada', type: 'int' })
  quantidadeGerada: number;

  @Column({ name: 'estoque_disponivel_antes', type: 'int' })
  estoqueDisponivelAntes: number;

  @Column({ type: 'text', default: 'limiar_atingido' })
  motivo: string;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm: Date;
}
