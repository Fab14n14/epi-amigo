import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Condicion } from './condiciones.entity';

@Injectable()
export class CondicionService {
  constructor(
    @InjectRepository(Condicion)
    private readonly condicionRepository: Repository<Condicion>,
  ) {}

  async findAll(): Promise<Condicion[]> {
    return this.condicionRepository.find();
  }

  async findOne(id: number): Promise<Condicion> {
    return this.condicionRepository.findOne({
      where: { idcondicion: id },
    });
  }

  public async create(condicion: Partial<Condicion>): Promise<Condicion> {
    return this.condicionRepository.save(condicion);
  }

  async findByID(id: number): Promise<Condicion> {
    return this.condicionRepository.findOne({
      where: { idcondicion: id },
    });
  }
}