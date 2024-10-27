// contactos-emergencia.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactoEmergencia } from './contacto-emergencia.entity'; // Asegúrate de que el path sea correcto
import { ContactoEmergenciaService } from './contacto-emergencia.service';
import { ContactoEmergenciaController } from './contacto-emergencia.controller';
import { UsuarioCondicion } from '../Usuario_condicion/usuarios-condicion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactoEmergencia , UsuarioCondicion])],
  providers: [ContactoEmergenciaService],
  controllers: [ContactoEmergenciaController],
})
export class ContactosEmergenciaModule {}
