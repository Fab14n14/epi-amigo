// src/recursos/recurso.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Recursos {
  @PrimaryGeneratedColumn()
  id_recurso: number;

  @Column()
  tipo_recurso: string;

  @Column()
  titulo: string;

  @Column()
  url: string;
}
