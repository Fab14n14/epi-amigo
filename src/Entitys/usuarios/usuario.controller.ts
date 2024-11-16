import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  HttpException, 
  HttpStatus 
  ,NotFoundException,Patch
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NuevoRegistroDto } from './NuevoRegistrodto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(): Promise<Usuario[]> {
      return this.usuarioService.findAll();
  }

  @Patch(':id/token-dispositivo')
  async updateTokenDispositivo(
    @Param('id') id: number,  // Parametro que recibe el id del usuario
    @Body('token_dispositivo') token_dispositivo: string,  // El nuevo token recibido en el cuerpo de la solicitud
  ): Promise<Usuario> {
    return this.usuarioService.updateTokenDispositivo(id, token_dispositivo);  // Llamamos al servicio para actualizar el token
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Usuario> {
      return this.usuarioService.findOne(id);
  }

  @Post()
  async create(@Body() usuario: Usuario): Promise<Usuario> {
      return this.usuarioService.create(usuario);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() usuario: Usuario): Promise<Usuario> {
      return this.usuarioService.update(id, usuario);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
      return this.usuarioService.remove(id);
  }

  @Post('registro')
  async registro(@Body() nuevoRegistroDto: NuevoRegistroDto): Promise<Usuario> {
      // Verifica si el usuario ya existe
      const existeUsuario = await this.usuarioService.findByCorreo(nuevoRegistroDto.correo);
      if (existeUsuario) {
          throw new HttpException('Usuario ya existe', HttpStatus.CONFLICT);
      }

      // Crea un nuevo usuario usando los datos del DTO
      const usuario = new Usuario();
      usuario.rut = nuevoRegistroDto.rut;
      usuario.nombre = nuevoRegistroDto.nombre;
      usuario.apellido = nuevoRegistroDto.apellido;
      usuario.correo = nuevoRegistroDto.correo;
      usuario.fecha_nac = nuevoRegistroDto.fecha_nac;
      usuario.sexo = nuevoRegistroDto.sexo;
      usuario.contrasena = nuevoRegistroDto.contrasena;
      usuario.tipo_perfil = nuevoRegistroDto.tipo_perfil;    

         // Guarda al usuario en la base de datos
    const usuarioGuardado = await this.usuarioService.create(usuario);

    // Devuelve el usuario completo, incluyendo el id asignado
    return usuarioGuardado;  // Aquí el usuario completo será devuelto, que incluye el id
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string , tipo_perfil: string  ,  id: number}> {
      console.log('LoginDto:', loginDto);
      
      // Busca el usuario por correo
      const usuario = await this.usuarioService.findByCorreo(loginDto.correo);
      console.log('Usuario:', usuario);
      
      if (!usuario) {
          throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
      }
      
      const esContrasenaValida = await this.verificarContrasena(loginDto.contrasena, usuario.contrasena);
      console.log('Es contraseña válida:', esContrasenaValida);
      
      if (!esContrasenaValida) {
          throw new HttpException('Contraseña inválida', HttpStatus.UNAUTHORIZED);
      }
       // Determina el tipo de usuario
    const tipo_perfil = await this.usuarioService.esUsuarioCondicion(usuario.id_usuario) ? 'epileptico' : 'contacto';

    if( tipo_perfil !== usuario.tipo_perfil ) 
    {
      throw new HttpException('Tipo de perfil inválido', HttpStatus.UNAUTHORIZED); 
    }
      
      // Genera el token y lo retorna en una respuesta exitosa
      const token = await this.generarToken(usuario);

      

      console.log('Token:', token);
       console.log('tipo usuario:', usuario.tipo_perfil );
       console.log('ID : ' , usuario.id_usuario )
       
  
      return { token , tipo_perfil:usuario.tipo_perfil , id:usuario.id_usuario  };  // Retorna el token como parte de la respuesta
  }

  private async verificarContrasena(contrasenaIngresada: string, contrasenaAlmacenada: string): Promise<boolean> {
      const esContrasenaValida = await bcrypt.compare(contrasenaIngresada, contrasenaAlmacenada);
      return esContrasenaValida;
  }

  private async generarToken(usuario: Usuario): Promise<string> {
      const payload = { sub: usuario.id_usuario, correo: usuario.correo };
      const token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
      return token;
  }

  @Get(':id/condicion-id')
  async getUsuarioCondicionId(@Param('id') id: string) {
    const idUsuario = parseInt(id, 10);

    if (isNaN(idUsuario)) {
      throw new NotFoundException('ID de usuario inválido.');
    }

    try {
      const usuarioCondicionId = await this.usuarioService.getUsuarioCondicionId(idUsuario);
      return { id_usuario_condicion: usuarioCondicionId };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { message: error.message };
      }
      throw error;
    }
  }
    
}


