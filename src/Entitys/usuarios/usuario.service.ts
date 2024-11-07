
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';
import { Medicamento } from '../medicamentos/medicamento.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CondicionService } from '../condiciones/condiciones.service';
import { MedicamentosService } from '../medicamentos/medicamentos.service';
import { UsuariosCondicionService } from '../Usuario_condicion/usuarios-condicion.service';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(UsuarioCondicion)
    private readonly usuarioCondicionRepository: Repository<UsuarioCondicion>,
    private readonly condicionService: CondicionService,
    private readonly medicamentoService: MedicamentosService,
    
  )  {}

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { id_usuario: id } });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async esUsuarioCondicion(idUsuario: number): Promise<boolean> {
    const usuarioCondicion = await this.usuarioCondicionRepository.findOne({ where: { id_usuario: idUsuario } });
    return !!usuarioCondicion; // Devuelve true si existe una relación en usuario_condicion
}

  async update(id: number, usuario: Usuario): Promise<Usuario> {
    await this.usuarioRepository.update(id, usuario);
    return this.usuarioRepository.findOne({ where: { id_usuario: id } });
  }

  async findByCorreo(correo: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { correo } });
  }

  

  
  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async findByRut(rut: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({ where: { rut } });
  }

} 