// usuarios-condicion.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosCondicionController } from './usuarios-condicion.controller';
import { UsuariosCondicionService } from './usuarios-condicion.service';
import { UsuarioCondicion } from './usuarios-condicion.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsuarioCondicion]),
  ],
  controllers: [UsuariosCondicionController],
  providers: [UsuariosCondicionService],
  exports: [TypeOrmModule], // Exporta el TypeOrmModule
})
export class UsuarioCondicionModule {}