import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InvitacionesService } from './invitaciones.service';
import { Invitacion } from './invitaciones.entity';

@Controller('invitaciones')
export class InvitacionesController {
  constructor(private readonly invitacionesService: InvitacionesService) {}

  @Post()
  async createInvitacion(@Body() invitacionData: Partial<Invitacion>): Promise<Invitacion> {
    return this.invitacionesService.createInvitacion(invitacionData);
  }

  @Get()
  async getAllInvitaciones(): Promise<Invitacion[]> {
    return this.invitacionesService.getAllInvitaciones();
  }

  @Get(':id')
  async getInvitacionById(@Param('id') id: number): Promise<Invitacion> {
    return this.invitacionesService.getInvitacionById(id);
  }

  @Put(':id')
  async updateInvitacion(
    @Param('id') id: number,
    @Body() invitacionData: Partial<Invitacion>,
  ): Promise<Invitacion> {
    return this.invitacionesService.updateInvitacion(id, invitacionData);
  }

  @Delete(':id')
  async deleteInvitacion(@Param('id') id: number): Promise<void> {
    return this.invitacionesService.deleteInvitacion(id);
  }
}
