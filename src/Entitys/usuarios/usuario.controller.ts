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
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async findAll(): Promise<Usuario[]> {
      return this.usuarioService.findAll();
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
  async registro(@Body() usuario: Usuario): Promise<Usuario> {
      const existeUsuario = await this.usuarioService.findByCorreo(usuario.correo);
      if (existeUsuario) {
          throw new HttpException('Usuario ya existe', HttpStatus.CONFLICT);
      }

      // Cifra la contraseña
      const contrasenaCifrada = await bcrypt.hash(usuario.contrasena, 10);
      usuario.contrasena = contrasenaCifrada;

      return this.usuarioService.create(usuario);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
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
      
      const token = await this.generarToken(usuario);
      console.log('Token:', token);
      
      return { token };
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

    
}


