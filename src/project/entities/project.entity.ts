import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export class Project {
  @PrimaryGeneratedColumn()
  id: number;
}
