import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioTipoCondicion } from '../UsuarioTipoCondicion/UsuarioTipoCondicion.entity';
import { UsuarioCondicion } from '../Usuario_Condicion/usuarios-condicion.entity';  // Asegúrate de importar la entidad UsuarioCondicion
import { Condicion } from '../Condiciones/condiciones.entity';  // Asegúrate de importar la entidad Condicion

@Injectable()
export class UsuarioTipoCondicionService {
  constructor(
    @InjectRepository(UsuarioTipoCondicion)
    private usuarioTipoCondicionRepository: Repository<UsuarioTipoCondicion>,
    
    @InjectRepository(UsuarioCondicion)
    private usuarioCondicionRepository: Repository<UsuarioCondicion>,  // Inyecta el repositorio de UsuarioCondicion
    
    @InjectRepository(Condicion)
    private condicionRepository: Repository<Condicion>  // Inyecta el repositorio de Condicion
  ) {}

  // Crear una nueva relación entre UsuarioCondicion y Condicion
  async createRelation(idUsuarioCondicion: number, idCondicion: number): Promise<UsuarioTipoCondicion> {
    // Obtén las entidades completas usando los IDs proporcionados
    const usuarioCondicion = await this.usuarioCondicionRepository.findOne({ where: { id_usuario_condicion: idUsuarioCondicion } });
    const condicion = await this.condicionRepository.findOne({ where: { id_condicion: idCondicion } });
  
    if (!usuarioCondicion || !condicion) {
      throw new Error('UsuarioCondicion o Condicion no encontrados.');
    }
  
    // Crea la relación
    const usuarioTipoCondicion = this.usuarioTipoCondicionRepository.create({
      usuarioCondicion, // Usa la entidad completa
      condicion,        // Usa la entidad completa
    });
  
    return await this.usuarioTipoCondicionRepository.save(usuarioTipoCondicion);
  }

  // Obtener todas las condiciones asociadas a un UsuarioCondicion
  async findConditionsByUsuario(idUsuarioCondicion: number): Promise<UsuarioTipoCondicion[]> {
    return await this.usuarioTipoCondicionRepository.find({
      where: { usuarioCondicion: { id_usuario_condicion: idUsuarioCondicion } },
      relations: ['condicion'],
    });
  }

  // Obtener todos los usuarios con una condición específica
  async findUsuariosByCondicion(idCondicion: number): Promise<UsuarioTipoCondicion[]> {
    return await this.usuarioTipoCondicionRepository.find({
      where: { condicion: { id_condicion: idCondicion } },
      relations: ['usuarioCondicion'],
    });
  }

  // Eliminar una relación entre UsuarioCondicion y Condicion
  async removeRelation(id: number): Promise<void> {
    await this.usuarioTipoCondicionRepository.delete(id);
  }
}
