import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

enum fileType {
  image = 1,
  audio,
  video,
  text,
  doc,
  docx,
  xls,
  xlsx,
  pdf,
}

@Entity()
export class Upload {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: string;

  @PrimaryColumn()
  @Generated('uuid')
  fileId: string;

  @Column()
  fileName: string;

  @Column()
  fileSize: string;

  @Column({
    type: 'enum',
    enum: fileType,
    default: 1,
  })
  fileType: number;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
