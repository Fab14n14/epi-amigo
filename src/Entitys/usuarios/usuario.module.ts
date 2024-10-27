// usuario.module.ts
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { UsuarioCondicionModule } from '../Usuario_condicion/usuarios-condicion.module';
import { CondicionesModule } from '../condiciones/condiciones.module';
import { MedicamentosModule } from '../medicamentos/medicamentos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario]),
    UsuarioCondicionModule,
    CondicionesModule,
     MedicamentosModule, // Importa el UsuarioCondicionModule
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}