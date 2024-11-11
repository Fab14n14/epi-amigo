// src/controllers/usuario-tipo-condicion.controller.ts
import { Controller, Post, Get, Delete, Param, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsuarioTipoCondicionService } from '../UsuarioTipoCondicion/UsuarioTipoCondicion.service';

@Controller('usuarios-tipos-condiciones')
export class UsuarioTipoCondicionController {
  constructor(private readonly usuarioTipoCondicionService: UsuarioTipoCondicionService) {}

  // Crear una relación entre UsuarioCondicion y Condicion
  @Post()
  async createRelation(@Body() body: { idUsuarioCondicion: number; idCondicion: number }) {
    try {
      return await this.usuarioTipoCondicionService.createRelation(body.idUsuarioCondicion, body.idCondicion);
    } catch (error) {
      throw new HttpException('Error creando la relación', HttpStatus.BAD_REQUEST);
    }
  }

  // Obtener todas las condiciones asociadas a un UsuarioCondicion
  @Get('usuario/:idUsuarioCondicion')
  async findConditionsByUsuario(@Param('idUsuarioCondicion') idUsuarioCondicion: number) {
    return await this.usuarioTipoCondicionService.findConditionsByUsuario(idUsuarioCondicion);
  }

  // Obtener todos los usuarios con una condición específica
  @Get('condicion/:idCondicion')
  async findUsuariosByCondicion(@Param('idCondicion') idCondicion: number) {
    return await this.usuarioTipoCondicionService.findUsuariosByCondicion(idCondicion);
  }

  // Eliminar una relación entre UsuarioCondicion y Condicion
  @Delete(':id')
  async removeRelation(@Param('id') id: number) {
    try {
      await this.usuarioTipoCondicionService.removeRelation(id);
      return { message: 'Relación eliminada correctamente' };
    } catch (error) {
      throw new HttpException('Error eliminando la relación', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
