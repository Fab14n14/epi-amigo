// usuarios-condicion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosCondicionController } from './usuarios-condicion.controller';
import { UsuariosCondicionService } from './usuarios-condicion.service';
import { UsuarioCondicion } from './usuarios-condicion.entity';
import { Usuario } from '../usuarios/usuario.entity';
import { Condicion } from '../condiciones/condiciones.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioCondicion, Usuario, Condicion]),
  ],
  controllers: [UsuariosCondicionController],
  providers: [UsuariosCondicionService],
  exports: [TypeOrmModule], // Exporta el TypeOrmModule
})
export class UsuarioCondicionModule {}