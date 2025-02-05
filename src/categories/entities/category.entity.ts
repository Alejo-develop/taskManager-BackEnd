import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  img: string;

  @CreateDateColumn({ select: false })
  createAt: Date;

  @UpdateDateColumn({ select: false })
  updateAt: Date;

  @DeleteDateColumn({ select: false })
  deleteAt: Date;
}
