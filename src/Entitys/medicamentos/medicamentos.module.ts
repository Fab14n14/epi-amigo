// medicamentos.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicamentosService } from './medicamentos.service';
import { MedicamentosController } from './medicamentos.controller';
import { Medicamento } from './medicamento.entity';
import { UsuarioCondicionModule } from '../Usuario_condicion/usuarios-condicion.module'; // Importamos el módulo

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicamento]),
    UsuarioCondicionModule, // Importamos el módulo aquí
  ],
  controllers: [MedicamentosController],
  providers: [MedicamentosService],
  exports: [MedicamentosService],
})
export class MedicamentosModule {}
