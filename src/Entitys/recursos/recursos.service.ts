// src/recursos/recursos.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recursos } from './recursos.entity';

@Injectable()
export class RecursosService {
  constructor(
    @InjectRepository(Recursos)
    private readonly recursoRepository: Repository<Recursos>,
  ) {}

  async create(recurso: Recursos): Promise<Recursos> {
    return this.recursoRepository.save(recurso);
  }

  async findAll(): Promise<Recursos[]> {
    return this.recursoRepository.find();
  }

  async findOne(id: number): Promise<Recursos> {
    return this.recursoRepository.findOne({ where: { id_recurso: id } });
  }

  async findByTipo(tipo_recurso: string): Promise<Recursos[]> {
    return this.recursoRepository.find({
      where: {
        tipo_recurso: tipo_recurso,
      },
    });
  }

  async update(id: number, recurso: Recursos): Promise<Recursos> {
    await this.recursoRepository.update(id, recurso);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.recursoRepository.delete(id);
  }
}
