import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

enum gender {
  male = 1,
  female,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: true })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  nickName: string;

  @Column({
    type: 'enum',
    enum: gender,
    default: 1,
  })
  gender: number;

  @Column()
  address: string;

  @Column()
  industry: string;

  @Column()
  photoId: string;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
