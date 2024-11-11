// src/modules/usuario-tipo-condicion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioTipoCondicion } from '../UsuarioTipoCondicion/UsuarioTipoCondicion.entity';
import { UsuarioTipoCondicionService } from '../UsuarioTipoCondicion/UsuarioTipoCondicion.service';
import { UsuarioTipoCondicionController } from '../UsuarioTipoCondicion/UsuarioTipoCondicion.controller';
import { UsuarioCondicionModule  } from '../Usuario_condicion/usuarios-condicion.module';
@Module({
  imports: [TypeOrmModule.forFeature([UsuarioTipoCondicion]) ,  UsuarioCondicionModule, ],
  controllers: [UsuarioTipoCondicionController],
  providers: [UsuarioTipoCondicionService],
  exports: [UsuarioTipoCondicionService],
})
export class UsuarioTipoCondicionModule {}
