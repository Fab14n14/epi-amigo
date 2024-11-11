// condicion.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany , PrimaryColumn } from 'typeorm';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';
import { UsuarioTipoCondicion } from '../UsuarioTipoCondicion/UsuarioTipoCondicion.entity';

@Entity('condiciones') 
export class Condicion {
  @PrimaryColumn() // Cambiado de PrimaryGeneratedColumn a PrimaryColumn
  id_condicion: number;

  @Column({ type: 'varchar', length: 100 })
  tipo_condicion: string;

  @OneToMany(() => UsuarioCondicion, (usuarioCondicion) => usuarioCondicion.condicion)
  usuariosCondicion: UsuarioCondicion[];

  @OneToMany(() => UsuarioTipoCondicion, (usuarioTipoCondicion) => usuarioTipoCondicion.condicion)
  usuarioTiposCondiciones: UsuarioTipoCondicion[];
}
