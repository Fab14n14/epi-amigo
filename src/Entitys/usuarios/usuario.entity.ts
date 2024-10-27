import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 30, unique: true })
  rut: string;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ length: 100, unique: true })
  correo: string;

  @Column({ type: 'date' })
  fecha_nac: Date;

  @Column({ type: 'bytea' })
  contrasena: string ;

  @OneToMany(() => UsuarioCondicion, (usuarioCondicion) => usuarioCondicion.usuario)
  usuariosCondicion: UsuarioCondicion[];
}
