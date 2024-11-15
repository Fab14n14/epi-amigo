import { Controller, Get, Post, Body, Param, Patch, Delete , NotFoundException} from '@nestjs/common';
import { ContactoEmergenciaService } from './contacto-emergencia.service';

import { CreateContactoEmergenciaDto } from './createcontactemergen.dto';
import { UpdateContactoEmergenciaDto } from './updatecontactemergen.dto';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';

@Controller('contactos-emergencia')
export class ContactoEmergenciaController {
  constructor(private readonly contactoService: ContactoEmergenciaService) {}

  @Post()
  create(@Body() dto: CreateContactoEmergenciaDto) {
    return this.contactoService.create(dto);
  }

  @Get()
  findAll() {
    return this.contactoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.contactoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateContactoEmergenciaDto) {
    return this.contactoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.contactoService.remove(id);
  }
  
  @Get('usuario/:id_contacto')
findByUsuarioCondicion(@Param('id_contacto') id_contacto: number) {
  return this.contactoService.findByUsuarioCondicion(id_contacto);
}

@Get('codigoqr/:codigoQR')
async getContactosByCodigoQR(@Param('codigoQR') codigoQR: string) {
  const contactos = await this.contactoService.findByCodigoQR(codigoQR);
  return contactos;
}


@Get('usuario-condicion/:id_contacto_usuario')
async findUsuarioCondicionByContacto(
  @Param('id_contacto_usuario') id_contacto_usuario: number
): Promise<UsuarioCondicion> {
  const usuarioCondicion = await this.contactoService.findUsuarioCondicionByContacto(id_contacto_usuario);

  if (!usuarioCondicion) {
    throw new NotFoundException('No se encontró un usuario condición para el contacto especificado');
  }

  return usuarioCondicion;
}

}
