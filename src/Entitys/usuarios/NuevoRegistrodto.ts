import { IsEmail, IsNotEmpty, IsString, Length, IsDate } from 'class-validator';

export class NuevoRegistroDto {
    @IsNotEmpty()
    @IsString()
    @Length(30)
    rut: string;

    @IsNotEmpty()
    @IsString()
    @Length(100)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @Length(100)
    apellido: string;

    @IsNotEmpty()
    @IsEmail()
    correo: string;

    @IsNotEmpty()
    @IsDate()
    fecha_nac: Date;

    @IsNotEmpty()
    @IsString()
    @Length(8, 50) // Asumiendo que la contraseña debe tener un mínimo de 8 caracteres
    contrasena: string;

    @IsNotEmpty()
    @IsString()
    @Length(1, 50) // Se puede ajustar según la longitud del campo 'sexo'
    sexo: string;
}
