import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioCondicion } from './usuarios-condicion.entity';
import { Medicamento } from '../medicamentos/medicamento.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Condicion } from '../condiciones/condiciones.entity';

@Injectable()
export class UsuariosCondicionService {
  constructor(
    @InjectRepository(UsuarioCondicion)
    private readonly usuarioCondicionRepository: Repository<UsuarioCondicion>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    
    @InjectRepository(Condicion)
    private condicionRepository: Repository<Condicion>,
  ) {}

  findAll(): Promise<UsuarioCondicion[]> {
    return this.usuarioCondicionRepository.find({ relations: ['condicion', 'medicamento'] });
  }

  findOne(id: number): Promise<UsuarioCondicion | null> {
    return this.usuarioCondicionRepository.findOne({
      where: { id_usuario_condicion: id },
      relations: ['condicion', 'medicamento'],
    });
  }

  create(usuario: Partial<UsuarioCondicion>): Promise<UsuarioCondicion> {
    const newUser = this.usuarioCondicionRepository.create(usuario);
    return this.usuarioCondicionRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioCondicionRepository.delete(id);
  }

  async findMedicamentosByID(id: number): Promise<Medicamento[]> {
    const usuarioCondicion = await this.usuarioCondicionRepository
      .findOne({
        where: { id_usuario_condicion: id },
        relations: ['medicamentos'],
      });
  
    return usuarioCondicion?.medicamentos || [];
  }

  async findUsuarioByCodigoInvitacion(codigoInvitacion: number): Promise<Usuario | null> {
    return this.usuarioCondicionRepository
      .createQueryBuilder('uc')
      .innerJoinAndSelect('uc.usuario', 'usuario')
      .where('uc.codigo_invitacion = :codigoInvitacion', { codigoInvitacion })
      .getOne()
      .then(result => result?.usuario);
  }


  async cambiarUsuarioAUsuarioCondicion(usuarioId: number, condicionId: number, codigoInvitacion: number): Promise<UsuarioCondicion> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: usuarioId } });
    const condicion = await this.condicionRepository.findOne({ where: { idcondicion: condicionId } });

    if (!usuario || !condicion) {
      throw new Error('Usuario o condición no encontrada');
    }

    const usuarioCondicion = this.usuarioCondicionRepository.create({
      usuario,
      condicion,
      codigo_invitacion: codigoInvitacion,
    });

    return this.usuarioCondicionRepository.save(usuarioCondicion);
  }
  
  
}
