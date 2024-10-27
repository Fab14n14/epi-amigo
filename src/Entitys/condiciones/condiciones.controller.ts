import { Controller, Get, Post, Body } from '@nestjs/common';
import { CondicionService } from './condiciones.service';
import { Condicion } from './condiciones.entity';

@Controller('condiciones')
export class CondicionesController {
  constructor(private readonly condicionesService: CondicionService) {}

  @Get()
  async findAll(): Promise<Condicion[]> {
    return this.condicionesService.findAll();
  }

  @Post()
  async create(@Body() condicion: Partial<Condicion>): Promise<Condicion> {
    return this.condicionesService.create(condicion);
  }
}
