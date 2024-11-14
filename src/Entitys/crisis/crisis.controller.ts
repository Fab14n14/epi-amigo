import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CrisisService } from './crisis.service';
import { Crisis } from './crisis.entity';
import {CreateCrisisDto} from './CreateCrisisDto'

@Controller('crisis')
export class CrisisController {
  constructor(private readonly crisisService: CrisisService) {}


 @Post()
  async createCrisis(@Body() createCrisisDto: CreateCrisisDto) {
    // Si no se ha proporcionado fecha_hora, asignar la fecha y hora actuales
    if (!createCrisisDto.fecha_hora) {
      createCrisisDto.fecha_hora = new Date(); // Asigna la fecha y hora actuales
    }

   
    return this.crisisService.create(createCrisisDto);
  }

  @Get()
  async getAllCrisis(): Promise<Crisis[]> {
    return this.crisisService.getAllCrisis();
  }

  @Get(':id')
  async getCrisisById(@Param('id') id: number): Promise<Crisis> {
    return this.crisisService.getCrisisById(id);
  }

  @Put(':id')
  async updateCrisis(
    @Param('id') id: number,
    @Body() crisisData: Partial<Crisis>,
  ): Promise<Crisis> {
    return this.crisisService.updateCrisis(id, crisisData);
  }

  @Delete(':id')
  async deleteCrisis(@Param('id') id: number): Promise<void> {
    return this.crisisService.deleteCrisis(id);
  }

  @Get('usuario/:id_usuario_condicion')
  async getCrisisByUsuarioCondicion(@Param('id_usuario_condicion') id_usuario_condicion: string) {
    return await this.crisisService.findByUsuarioCondicion(id_usuario_condicion);
  }
}


