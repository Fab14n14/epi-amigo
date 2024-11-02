import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { UsuariosCondicionService } from './usuarios-condicion.service';
import { UsuarioCondicion } from './usuarios-condicion.entity';
import { Medicamento } from '../medicamentos/medicamento.entity';


@Controller('usuarios-condicion')
export class UsuariosCondicionController {
  constructor(private readonly usuariosCondicionService: UsuariosCondicionService) {}

  @Get()
  findAll(): Promise<UsuarioCondicion[]> {
    return this.usuariosCondicionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UsuarioCondicion | null> {
    return this.usuariosCondicionService.findOne(+id);
  }

  @Get(':id/medicamentos')
async getMedicamentos(@Param('id') id: number) {
    

  return this.usuariosCondicionService.findMedicamentosByID(id);
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
    @Body('condicionId') condicionId: number,
    @Body('codigoInvitacion') codigoInvitacion: number,
    @Body('codeqr') codeqr: string,
  ) {
    return this.usuariosCondicionService.cambiarUsuarioAUsuarioCondicion(usuarioId, condicionId, codigoInvitacion , codeqr);
  }

 
} 
