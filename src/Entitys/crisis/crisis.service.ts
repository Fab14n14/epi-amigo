import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crisis } from './crisis.entity';

@Injectable()
export class CrisisService {
  constructor(
    @InjectRepository(Crisis)
    private crisisRepository: Repository<Crisis>,
  ) {}

  async createCrisis(crisisData: Partial<Crisis>): Promise<Crisis> {
    const crisis = this.crisisRepository.create(crisisData);
    return this.crisisRepository.save(crisis);
  }

  async getAllCrisis(): Promise<Crisis[]> {
    return this.crisisRepository.find();
  }

  async getCrisisById(id: number): Promise<Crisis> {
    return this.crisisRepository.findOne({ where: { id_crisis: id } });
  }

  async updateCrisis(id: number, crisisData: Partial<Crisis>): Promise<Crisis> {
    await this.crisisRepository.update(id, crisisData);
    return this.getCrisisById(id);
  }

  async deleteCrisis(id: number): Promise<void> {
    await this.crisisRepository.delete(id);
  }
}
