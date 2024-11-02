import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SintomasService } from './sintomas.service';
import { SintomasController } from './sintomas.controller';
import { Sintoma } from './sintomas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sintoma])],
  providers: [SintomasService],
  controllers: [SintomasController],
})
export class SintomasModule {}
