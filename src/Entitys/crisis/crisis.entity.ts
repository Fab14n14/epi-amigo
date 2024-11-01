import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Sintoma } from '../sintomas/sintomas.entity'; // Ajusta la ruta según tu estructura de carpetas
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';

@Entity('crisis')
export class Crisis {
  @PrimaryGeneratedColumn()
  id_crisis: number;

  @Column({ type: 'timestamp with time zone' })
  fecha_hora: Date;

  @Column({ type: 'varchar', length: 250 })
  descripcion: string;

  @ManyToOne(() => Sintoma, (sintoma) => sintoma.crisis)
  @JoinColumn({ name: 'id_sintoma' })
  sintoma: Sintoma;

  @ManyToOne(() => UsuarioCondicion, (usuarioCondicion) => usuarioCondicion.id_usuario_condicion)
  @JoinColumn({ name: 'id_usuario_condicion' })
  usuarioCondicion: UsuarioCondicion;
}
