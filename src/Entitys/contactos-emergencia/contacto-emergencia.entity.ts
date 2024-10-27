import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity'; // Asegúrate de que el path sea correcto

@Entity('contactos_emergencia')
export class ContactoEmergencia {
  @PrimaryGeneratedColumn()
  id_contacto: number;

  @Column({ type: 'varchar', length: 100 })
  relacion: string;

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
