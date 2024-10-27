import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn , OneToMany} from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import { Condicion } from '../condiciones/condiciones.entity';
import { Medicamento } from '../medicamentos/medicamento.entity';
import { ContactoEmergencia } from '../contactos-emergencia/contacto-emergencia.entity';

@Entity('usuarios_condicion')
export class UsuarioCondicion {
  @PrimaryGeneratedColumn()
  id_usuario_condicion: number;

  id_usuario : number ; 

  codigo_invitacion : number ; 

  @ManyToOne(() => Usuario, (usuario) => usuario.usuariosCondicion)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Condicion, (condicion) => condicion.idcondicion)
  @JoinColumn({ name: 'id_condicion' })
  condicion: Condicion;

  @Column({ type: 'varchar', unique: true, nullable: false })
    codeqr: string;

  @OneToMany(() => Medicamento, (medicamento) => medicamento.usuarioCondicion)
  @JoinColumn({ name: 'id_usuario_condicion' })
medicamentos: Medicamento[];

@OneToMany(() => ContactoEmergencia, (contacto) => contacto.usuarioCondicion)
contactosEmergencia: ContactoEmergencia[];

  
}