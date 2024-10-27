import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condicion } from './condiciones.entity'; // Importa la entidad
import { CondicionService } from './condiciones.service';
import { CondicionesController } from './condiciones.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Condicion])], // Registra el repositorio
  providers: [CondicionService], // Provee el servicio
  controllers: [CondicionesController], // Controlador
  exports: [CondicionService], // Exporta el servicio si es necesario en otros módulos
})
export class CondicionesModule {}
