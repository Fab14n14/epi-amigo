// contacts.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioCondicion } from './Entitys/Usuario_condicion/usuarios-condicion.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(UsuarioCondicion)
    private usuarioCondicionRepository: Repository<UsuarioCondicion>,
  ) {}

  
}