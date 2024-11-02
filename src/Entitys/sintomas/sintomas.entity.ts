import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Crisis } from '../crisis/crisis.entity'; // Ajusta la ruta según tu estructura de carpetas

@Entity('sintomas')
export class Sintoma {
  @PrimaryGeneratedColumn()
  id_sintoma: number;

  @Column({ type: 'varchar', length: 200 })
  descripcion: string;

  @OneToMany(() => Crisis, (crisis) => crisis.sintoma)
  crisis: Crisis[];
}
