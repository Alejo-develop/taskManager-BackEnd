import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn({select: false})
  createAt: Date;

  @UpdateDateColumn({select: false})
  updateAt: Date;

  @DeleteDateColumn({select: false})
  deleteAt: Date;
}
