import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitacion } from './invitaciones.entity';

@Injectable()
export class InvitacionesService {
  constructor(
    @InjectRepository(Invitacion)
    private invitacionesRepository: Repository<Invitacion>,
  ) {}

  async createInvitacion(invitacionData: Partial<Invitacion>): Promise<Invitacion> {
    const invitacion = this.invitacionesRepository.create(invitacionData);
    return this.invitacionesRepository.save(invitacion);
  }

  async getAllInvitaciones(): Promise<Invitacion[]> {
    return this.invitacionesRepository.find();
  }

  async getInvitacionById(id: number): Promise<Invitacion> {
    return this.invitacionesRepository.findOne({ where: { id_invitacion: id } });
  }

  async updateInvitacion(id: number, invitacionData: Partial<Invitacion>): Promise<Invitacion> {
    await this.invitacionesRepository.update(id, invitacionData);
    return this.getInvitacionById(id);
  }

  async deleteInvitacion(id: number): Promise<void> {
    await this.invitacionesRepository.delete(id);
  }
}
