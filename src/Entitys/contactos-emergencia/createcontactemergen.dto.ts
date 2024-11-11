import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateContactoEmergenciaDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  relacion: string;

  @IsNotEmpty()
  id_usuario_condicion: number;

  id_contacto_usuario:number ; 
}
