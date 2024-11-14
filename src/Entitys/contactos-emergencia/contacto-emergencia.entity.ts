import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity'; // Asegúrate de que el path sea correcto
import { Usuario } from '../usuarios/usuario.entity';
@Entity('contactos_emergencia')
export class ContactoEmergencia {
  @PrimaryGeneratedColumn()
  id_contacto: number;

  @Column({ type: 'varchar', length: 100 })
  relacion: string;

  @Column({ type: 'number' })
  id_contacto_usuario: number;

  @ManyToOne(() => Usuario, { eager: true })
  @JoinColumn({ name: 'id_contacto_usuario' }) // Enlace a la tabla usuarios
  usuario: Usuario;

  // Relación ManyToOne con UsuarioCondicion
  @ManyToOne(() => UsuarioCondicion, (usuarioCondicion) => usuarioCondicion.contactosEmergencia, {
    onDelete: 'CASCADE', // Si se elimina un usuario_condicion, también se eliminan sus contactos.
    eager: true, // Carga automática de la relación.
  })
  @JoinColumn({ name: 'id_usuario_condicion' }) // Define la clave foránea
  usuarioCondicion: UsuarioCondicion;
  
  @Column({ type: 'int' })
  id_usuario_condicion: number; // Clave foránea manual
}
