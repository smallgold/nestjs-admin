import { Exclude } from 'class-transformer';
import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

enum fileType {
  image = 1,
  audio,
  mp4,
  doc,
  xls,
  pdf,
}

export class Upload {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column('uuid')
  fileId: string;

  @Column()
  fileName: string;

  @Column()
  fileSize: string;

  @Column()
  fileType: fileType;

  @CreateDateColumn({ type: 'timestamp' })
  createTime: Date;
}
