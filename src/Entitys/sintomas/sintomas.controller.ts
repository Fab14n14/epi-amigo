import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { SintomasService } from './sintomas.service';
import { Sintoma } from './sintomas.entity';

@Controller('sintomas')
export class SintomasController {
  constructor(private readonly sintomasService: SintomasService) {}

  @Post()
  async createSintoma(@Body() sintomaData: Partial<Sintoma>): Promise<Sintoma> {
    return this.sintomasService.createSintoma(sintomaData);
  }

  @Get()
  async getAllSintomas(): Promise<Sintoma[]> {
    return this.sintomasService.getAllSintomas();
  }

  @Get(':id')
  async getSintomaById(@Param('id') id: number): Promise<Sintoma> {
    return this.sintomasService.getSintomaById(id);
  }

  @Put(':id')
  async updateSintoma(
    @Param('id') id: number,
    @Body() sintomaData: Partial<Sintoma>,
  ): Promise<Sintoma> {
    return this.sintomasService.updateSintoma(id, sintomaData);
  }

  @Delete(':id')
  async deleteSintoma(@Param('id') id: number): Promise<void> {
    return this.sintomasService.deleteSintoma(id);
  }
}
