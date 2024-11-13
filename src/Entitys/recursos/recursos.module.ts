// src/recursos/recursos.module.ts

import { Module } from '@nestjs/common';
import { RecursosService } from './recursos.service';
import { RecursosController } from './recursos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recursos } from './recursos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recursos])],
  providers: [RecursosService],
  controllers: [RecursosController],
})
export class RecursosModule {}
