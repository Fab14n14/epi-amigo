import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';

@Entity('medicamentos')
export class Medicamento {
  @PrimaryGeneratedColumn()
  idmedicamento: number;

  @Column({ length: 255 })
  nombre: string;

  @Column({ length: 30 })
  cantidad: string;

  @Column()
  dosis: number;

  @Column({ length: 255 })
  frecuencia: string;

  @ManyToOne(() => UsuarioCondicion, (usuarioCondicion) => usuarioCondicion.medicamentos)
  @JoinColumn({ name: 'id_usuario_condicion' })
  usuarioCondicion: UsuarioCondicion;

  
}