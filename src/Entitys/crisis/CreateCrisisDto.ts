export class CreateCrisisDto {
    descripcion: string;
    fecha_hora?: Date;  // El campo fecha_hora es opcional
    id_usuario_condicion: number ;
    duracion?: number; // El campo duracion es opcional
    
  }
  