import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity'; // Asegúrate de que la ruta sea correcta

@Entity('invitaciones')
export class Invitacion {
  @PrimaryGeneratedColumn()
  id_invitacion: number;

  @Column()
  fecha_envio: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
  id_usuario_emisor: Usuario;

  @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
  id_usuario_receptor: Usuario;

  @Column()
  cod_invitacion: number;
}
