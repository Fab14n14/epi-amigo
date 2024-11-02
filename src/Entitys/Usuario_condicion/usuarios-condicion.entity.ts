import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Condicion } from '../condiciones/condiciones.entity';
import { Medicamento } from '../medicamentos/medicamento.entity';
import { ContactoEmergencia } from '../contactos-emergencia/contacto-emergencia.entity';

@Entity('usuarios_condicion')
export class UsuarioCondicion {
  @PrimaryGeneratedColumn()
  id_usuario_condicion: number;

  // Define id_usuario como una columna en la tabla
  @Column()
  id_usuario: number;

  // Define codigo_invitacion como una columna en la tabla
  @Column()
  codigo_invitacion: number;

  // Relación ManyToOne con Usuario
  @ManyToOne(() => Usuario, (usuario) => usuario.usuariosCondicion)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  // Relación ManyToOne con Condicion
  @ManyToOne(() => Condicion, (condicion) => condicion.usuariosCondicion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_condicion' })
  condicion: Condicion;

  // Columna para código QR
  @Column({ type: 'varchar', unique: true, nullable: false })
  codeqr: string;

  // Relación OneToMany con Medicamento
  @OneToMany(() => Medicamento, (medicamento) => medicamento.usuarioCondicion)
  medicamentos: Medicamento[];

  // Relación OneToMany con ContactoEmergencia
  @OneToMany(() => ContactoEmergencia, (contacto) => contacto.usuarioCondicion)
  contactosEmergencia: ContactoEmergencia[];
}
