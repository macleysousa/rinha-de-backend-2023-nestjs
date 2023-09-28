import { Column, Entity, Index, PrimaryColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: 'pessoas' })
export class PessoaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn('varchar')
  @Unique(['apelido'])
  apelido: string;

  @Column('varchar')
  @Index()
  nome: string;

  @Column('date', { nullable: true })
  nascimento: Date;

  @Column({ type: 'varchar', nullable: true, transformer: { from: (value) => value?.split(','), to: (value: []) => value?.join(',') } })
  @Index()
  stack: string[];
}
