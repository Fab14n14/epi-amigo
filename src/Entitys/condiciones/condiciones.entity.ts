import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Condicion {
    @PrimaryGeneratedColumn()
    idcondicion: number;

    @Column({ type: 'varchar' })
    tipo_condicion: string; // Este campo no debe ser nulo

    // Otros campos...
}
