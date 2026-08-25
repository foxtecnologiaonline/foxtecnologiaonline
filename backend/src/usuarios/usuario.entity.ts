import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type TipoUsuario = 'admin' | 'cliente';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'senha_hash' })
  senhaHash: string;

  @Column({ type: 'text' })
  tipo: TipoUsuario;

  @CreateDateColumn({ name: 'criado_em', type: 'timestamptz' })
  criadoEm: Date;
}
