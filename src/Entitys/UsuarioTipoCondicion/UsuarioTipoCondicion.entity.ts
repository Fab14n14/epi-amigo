import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';
import { Condicion } from '../condiciones/condiciones.entity';

@Entity('usuarios_tipos_condiciones')
export class UsuarioTipoCondicion {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación ManyToOne con UsuarioCondicion
  @ManyToOne(() => UsuarioCondicion, (usuarioCondicion) => usuarioCondicion.usuarioTiposCondiciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario_condicion' })
  usuarioCondicion: UsuarioCondicion;

  // Relación ManyToOne con Condicion
  @ManyToOne(() => Condicion, (condicion) => condicion.usuarioTiposCondiciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_condicion' })
  condicion: Condicion;
}
