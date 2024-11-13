import { Injectable  , NotFoundException } from '@nestjs/common';
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

  async findOne(id: number): Promise<UsuarioCondicion | null> {
    return this.usuarioCondicionRepository.findOne({
      where: { id_usuario_condicion: id },
    });
  }

  async updateCodigoInvitacion(id: number, codigo_invitacion: string): Promise<void> {
    // Validar si el código de invitación es un número
    const codigoInvitacionNumerico = Number(codigo_invitacion);
    if (isNaN(codigoInvitacionNumerico)) {
      throw new Error('Código de invitación inválido');
    }
  
    // Buscar la entidad en la base de datos para asegurarse de que existe
    const usuarioCondicion = await this.usuarioCondicionRepository.findOne({
      where: {
        id_usuario: id  // Asegúrate de que la propiedad coincida con la definición de la entidad
      }
    });
    if (!usuarioCondicion) {
      throw new Error('No se encontró el registro con el ID proporcionado');
    }
  
    // Actualizar el código de invitación
    usuarioCondicion.codigo_invitacion = codigoInvitacionNumerico;
  
    try {
      // Usar save() en lugar de update() para asegurar que los cambios se guarden correctamente
      await this.usuarioCondicionRepository.save(usuarioCondicion);
    } catch (error) {
      throw new Error(`Error al guardar el código de invitación: ${error.message}`);
    }
  } 

  create(usuario: Partial<UsuarioCondicion>): Promise<UsuarioCondicion> {
    const newUser = this.usuarioCondicionRepository.create(usuario);
    return this.usuarioCondicionRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioCondicionRepository.delete(id);
  }

  async findMedicamentosByID(id: number): Promise<{ message: string } | Medicamento[]> {
    const usuarioCondicion = await this.usuarioCondicionRepository.findOne({
      where: { id_usuario_condicion: id },
      relations: ['medicamentos'],
    });
  
    if (!usuarioCondicion) {
      return { message: `Usuario con id ${id} no encontrado` };
    }
  
    if (usuarioCondicion.medicamentos.length === 0) {
      return { message: 'El usuario no posee medicamentos aún' };
    }
  
    return usuarioCondicion.medicamentos;
  }
    

  async findUsuarioByCodigoInvitacion(codigoInvitacion: number): Promise<any> {
    const usuarioCondicion = await this.usuarioCondicionRepository
      .createQueryBuilder('uc')
      .innerJoinAndSelect('uc.usuario', 'usuario')
      .where('uc.codigo_invitacion = :codigoInvitacion', { codigoInvitacion })
      .getOne();
  
    if (!usuarioCondicion) {
      throw new Error('Usuario no encontrado');
    }
  
    // Devuelves tanto el usuario como el id_usuario_condicion
    return {
      usuario: usuarioCondicion.usuario, // El usuario relacionado con la condición
      id_usuario_condicion: usuarioCondicion.id_usuario_condicion, // El id de la condición
    };
  }

  async update(id: number, usuarioCondicion: UsuarioCondicion): Promise<UsuarioCondicion> {
    await this.usuarioCondicionRepository.update(id, usuarioCondicion);
    return this.findOne(id);
}

  async cambiarUsuarioAUsuarioCondicion(usuarioId: number, condicion_Id: number, codigoInvitacion: number , codeqr: string): Promise<UsuarioCondicion> {
    const usuario = await this.usuarioRepository.findOne({ where: { id_usuario: usuarioId } });
    const condicion = await this.condicionRepository.findOne({ where: { id_condicion: condicion_Id } });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
    }

    if (!condicion) {
      throw new NotFoundException(`Condición con ID ${condicion_Id} no encontrada`);
    }

    const usuarioCondicion = this.usuarioCondicionRepository.create({
      usuario,
      condicion,
      codigo_invitacion: codigoInvitacion,
      codeqr
    });

    return this.usuarioCondicionRepository.save(usuarioCondicion);
  }
  
  async findByUsuarioId(id: number): Promise<UsuarioCondicion | null> {
    return this.usuarioCondicionRepository.findOne({
      where: { usuario: { id_usuario: id } }, // Usamos 'id_usuario' en lugar de 'id'
      relations: ['usuario', 'condicion', 'medicamentos', 'contactosEmergencia'], // Las relaciones necesarias
    });
  }
  
}
