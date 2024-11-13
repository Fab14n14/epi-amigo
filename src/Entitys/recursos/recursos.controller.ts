// src/recursos/recursos.controller.ts

import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RecursosService } from './recursos.service';
import { Recursos } from './recursos.entity';

@Controller('recursos')
export class RecursosController {
  constructor(private readonly recursosService: RecursosService) {}

  @Post()
  create(@Body() recurso: Recursos): Promise<Recursos> {
    return this.recursosService.create(recurso);
  }

  @Get()
  findAll(): Promise<Recursos[]> {
    return this.recursosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Recursos> {
    return this.recursosService.findOne(id);
  }

  @Get('tipo/:tipo_recurso')  // Nueva ruta para obtener recursos por tipo
  findByTipo(@Param('tipo_recurso') tipo_recurso: string): Promise<Recursos[]> {
    return this.recursosService.findByTipo(tipo_recurso);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() recurso: Recursos): Promise<Recursos> {
    return this.recursosService.update(id, recurso);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.recursosService.remove(id);
  }
}
