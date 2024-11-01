import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CrisisService } from './crisis.service';
import { Crisis } from './crisis.entity';

@Controller('crisis')
export class CrisisController {
  constructor(private readonly crisisService: CrisisService) {}

  @Post()
  async createCrisis(@Body() crisisData: Partial<Crisis>): Promise<Crisis> {
    return this.crisisService.createCrisis(crisisData);
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
}
