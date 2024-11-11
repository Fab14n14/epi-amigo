import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicamento } from './medicamento.entity';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';

@Injectable()
export class MedicamentosService {
  constructor(
    @InjectRepository(Medicamento)
    private readonly medicamentoRepository: Repository<Medicamento>,
    @InjectRepository(UsuarioCondicion)
    private readonly usuarioCondicionRepository: Repository<UsuarioCondicion>,
  ) {}

  async findAll(): Promise<Medicamento[]> {
    return this.medicamentoRepository.find({ relations: ['usuarioCondicion'] });
  }

  async create(medicamento: Partial<Medicamento>, usuarioId: number): Promise<Medicamento> {
    try {
      const usuario = await this.usuarioCondicionRepository.findOneBy({ id_usuario_condicion: usuarioId });
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
      }

      const nuevoMedicamento = this.medicamentoRepository.create({ ...medicamento, usuarioCondicion: usuario });
      return this.medicamentoRepository.save(nuevoMedicamento);
    } catch (error) {
      throw new Error(`Error al crear medicamento: ${error.message}`);
    }
  } 

  async findByUsuario(usuarioId: number): Promise<Medicamento[]> {
    const medicamentos = await this.medicamentoRepository.find({
      where: { usuarioCondicion: { id_usuario_condicion: usuarioId } },
      relations: ['usuarioCondicion'],
    });

    if (medicamentos.length === 0) {
      throw new NotFoundException(`No se encontraron medicamentos para el usuario con ID ${usuarioId}`);
    }

    return medicamentos;
  }

  async findOne(id: number): Promise<Medicamento> {
    const medicamento = await this.medicamentoRepository.findOne({ where: { idmedicamento: id }, relations: ['usuarioCondicion'] });
    if (!medicamento) {
      throw new NotFoundException(`Medicamento con ID ${id} no encontrado`);
    }
    return medicamento;
  }

  async update(id: number, medicamento: Partial<Medicamento>): Promise<Medicamento> {
    const existingMedicamento = await this.findOne(id);
    await this.medicamentoRepository.update(id, medicamento);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const medicamento = await this.findOne(id);
    await this.medicamentoRepository.delete(id);
  }
}