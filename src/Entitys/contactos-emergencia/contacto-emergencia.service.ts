import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactoEmergencia } from './contacto-emergencia.entity';
import { CreateContactoEmergenciaDto } from './createcontactemergen.dto';
import { UpdateContactoEmergenciaDto } from './updatecontactemergen.dto';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';


@Injectable()
export class ContactoEmergenciaService {
  constructor(
    @InjectRepository(ContactoEmergencia)
    private contactoRepository: Repository<ContactoEmergencia>,
    @InjectRepository(UsuarioCondicion)
    private usuarioCondicionRepository: Repository<UsuarioCondicion>,
  ) {}

  async create(dto: CreateContactoEmergenciaDto): Promise<ContactoEmergencia> {
    const contacto = this.contactoRepository.create(dto);
    return this.contactoRepository.save(contacto);
  }

  async findAll(): Promise<ContactoEmergencia[]> {
    return this.contactoRepository.find({ relations: ['usuarioCondicion'] });
  }

  async findOne(id: number): Promise<ContactoEmergencia> {
    const contacto = await this.contactoRepository.findOne({
      where: { id_contacto: id },
      relations: ['usuarioCondicion'],
    });
    if (!contacto) throw new NotFoundException(`Contacto con id ${id} no encontrado`);
    return contacto;
  }

  async update(id: number, dto: UpdateContactoEmergenciaDto): Promise<ContactoEmergencia> {
    const contacto = await this.findOne(id);
    const updated = Object.assign(contacto, dto);
    return this.contactoRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const contacto = await this.findOne(id);
    await this.contactoRepository.remove(contacto);
  }

  async findByUsuarioCondicion(id_usuario_condicion: number): Promise<ContactoEmergencia[]> {
    return this.contactoRepository.find({
      where: { usuarioCondicion: { id_usuario_condicion } },
      relations: ['usuario'], // Carga la relación con el usuario que es el contacto
    });
  }

  async findUsuarioCondicionByContacto(id_contacto_usuario: number): Promise<UsuarioCondicion | null> {
    const contacto = await this.contactoRepository.findOne({
      where: { id_contacto_usuario },
      relations: ['usuarioCondicion'], // Cargar la relación con UsuarioCondicion
    });
  
    return contacto ? contacto.usuarioCondicion : null;
  }

   // Método para buscar contactos de emergencia mediante código QR con datos del usuario
   async findByCodigoQR(codigoQR: string): Promise<any> {
    const usuarioCondicion = await this.usuarioCondicionRepository.findOne({
      where: { codeqr: codigoQR },
      relations: ['contactosEmergencia', 'usuario'], // Incluye las relaciones
    });

    if (!usuarioCondicion) {
      throw new NotFoundException('Usuario_condicion no encontrado con ese código QR.');
    }

    // Mapeo para estructurar la respuesta
    return usuarioCondicion.contactosEmergencia.map((contacto) => ({
      id_contacto: contacto.id_contacto,
      relacion: contacto.relacion,
      usuario: {
        id_usuario: usuarioCondicion.usuario.id_usuario,
        nombre: usuarioCondicion.usuario.nombre,
        apellido: usuarioCondicion.usuario.apellido,
      },
    }));
  }
  
}
