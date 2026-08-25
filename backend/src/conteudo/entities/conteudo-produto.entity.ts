import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Produto } from '../../produtos/entities/produto.entity';

export type TipoConteudo = 'manual' | 'cartilha' | 'video';

@Entity('conteudos_produto')
export class ConteudoProduto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'produto_id', type: 'uuid' })
  produtoId: string;

  @ManyToOne(() => Produto, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'produto_id' })
  produto: Produto;

  @Column({
    type: 'enum',
    enum: ['manual', 'cartilha', 'video'],
    enumName: 'tipo_conteudo',
  })
  tipo: TipoConteudo;

  @Column()
  titulo: string;

  @Column({ name: 'url_arquivo', type: 'text' })
  urlArquivo: string;

  @Column({ type: 'int', default: 0 })
  ordem: number;
}
