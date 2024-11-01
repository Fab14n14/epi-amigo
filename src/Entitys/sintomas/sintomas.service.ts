import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sintoma } from './sintomas.entity';

@Injectable()
export class SintomasService {
  constructor(
    @InjectRepository(Sintoma)
    private sintomasRepository: Repository<Sintoma>,
  ) {}

  async createSintoma(sintomaData: Partial<Sintoma>): Promise<Sintoma> {
    const sintoma = this.sintomasRepository.create(sintomaData);
    return this.sintomasRepository.save(sintoma);
  }

  async getAllSintomas(): Promise<Sintoma[]> {
    return this.sintomasRepository.find();
  }

  async getSintomaById(id: number): Promise<Sintoma> {
    return this.sintomasRepository.findOne({ where: { id_sintoma: id } });
  }

  async updateSintoma(id: number, sintomaData: Partial<Sintoma>): Promise<Sintoma> {
    await this.sintomasRepository.update(id, sintomaData);
    return this.getSintomaById(id);
  }

  async deleteSintoma(id: number): Promise<void> {
    await this.sintomasRepository.delete(id);
  }
}
