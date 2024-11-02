// condicion.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';

@Entity('condiciones') 
export class Condicion {
  @PrimaryGeneratedColumn()
  id_condicion: number;

  @Column({ type: 'varchar', length: 100 })
  tipo_condicion: string;

  @OneToMany(() => UsuarioCondicion, (usuarioCondicion) => usuarioCondicion.condicion)
  usuariosCondicion: UsuarioCondicion[];
}
