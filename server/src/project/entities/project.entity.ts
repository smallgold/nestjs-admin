import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  PrimaryColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Project {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn()
  @Generated('uuid')
  projectId: string;

  @Column()
  label: string;

  @Column()
  desc: string;

  @Column()
  options: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
