import { Controller, Get, Put, Post, Param, Body, Delete , HttpException, HttpStatus } from '@nestjs/common';
import { UsuariosCondicionService } from './usuarios-condicion.service';
import { UsuarioCondicion } from './usuarios-condicion.entity';
import { Medicamento } from '../medicamentos/medicamento.entity';
import { UpdateCodigoDto } from './update-codigo.dto';


@Controller('usuarios-condicion')
export class UsuariosCondicionController {
  constructor(private readonly usuariosCondicionService: UsuariosCondicionService) {}

  @Get()
  findAll(): Promise<UsuarioCondicion[]> {
    return this.usuariosCondicionService.findAll();
  }

  @Put(':id/codigo-invitacion')
async updateCodigoInvitacion(
  @Param('id') id: number,
  @Body() updateCodigoDto: UpdateCodigoDto
): Promise<{ message: string }> {
  // Llamamos a la nueva función para buscar por id de usuario
  const usuarioCondicion = await this.usuariosCondicionService.findByUsuarioId(id);
  
  if (!usuarioCondicion) {
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  const codigoNumerico = parseInt(updateCodigoDto.codigo_invitacion, 10);
  if (isNaN(codigoNumerico)) {
    throw new HttpException('Código de invitación inválido', HttpStatus.BAD_REQUEST);
  }

  await this.usuariosCondicionService.updateCodigoInvitacion(id, codigoNumerico.toString());
  return { message: 'Código de invitación actualizado correctamente' };
}
 

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UsuarioCondicion | null> {
    return this.usuariosCondicionService.findOne(+id);
  }

  @Get(':id/medicamentos')
async getMedicamentos(@Param('id') id: number) {
    

  return this.usuariosCondicionService.findMedicamentosByID(id);
}
@Post(':id/codigo-invitacion')
async actualizarCodigoInvitacion(
  @Param('id') id: string,
  @Body() updateCodigoDto: UpdateCodigoDto,
) {
  const idNumber = parseInt(id, 10);

  if (isNaN(idNumber)) {
    throw new HttpException('ID de usuario no válido', HttpStatus.BAD_REQUEST);
  }

  const usuarioCondicion = await this.usuariosCondicionService.findOne(idNumber);
  if (!usuarioCondicion) {
    throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
  }

  // Convertir `codigo_invitacion` a número antes de asignarlo
  usuarioCondicion.codigo_invitacion = parseInt(updateCodigoDto.codigo_invitacion, 10);

  if (isNaN(usuarioCondicion.codigo_invitacion)) {
    throw new HttpException('Código de invitación inválido', HttpStatus.BAD_REQUEST);
  }

  await this.usuariosCondicionService.update(idNumber, usuarioCondicion);

  return { message: 'Código de invitación actualizado correctamente' };
}

  

  @Post()
  create(@Body() usuario: Partial<UsuarioCondicion>): Promise<UsuarioCondicion> {
    return this.usuariosCondicionService.create(usuario);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usuariosCondicionService.remove(+id);
  }

  @Get('buscar-usuario/:codigoInvitacion')
  async findUsuarioByCodigoInvitacion(@Param('codigoInvitacion') codigoInvitacion: number) {
    const usuario = await this.usuariosCondicionService.findUsuarioByCodigoInvitacion(codigoInvitacion);
    return usuario;
  }

  @Post('actualizar-condicion')
  async cambiarUsuarioAUsuarioCondicion(
    @Body('usuarioId') usuarioId: number,
    @Body('condicio nId') condicionId: number,
    @Body('codigoInvitacion') codigoInvitacion: number,
    @Body('codeqr') codeqr: string,
  ) {
    return this.usuariosCondicionService.cambiarUsuarioAUsuarioCondicion(usuarioId, condicionId, codigoInvitacion , codeqr);
  }

 
} 
