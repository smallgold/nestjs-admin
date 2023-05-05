import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: string;

  @Column()
  identityCard: string;

  @Column()
  profession: string;

  @Column()
  discussTags: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
