import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvitacionesService } from './invitaciones.service';
import { InvitacionesController } from './invitaciones.controller';
import { Invitacion } from './invitaciones.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invitacion])],
  providers: [InvitacionesService],
  controllers: [InvitacionesController],
})
export class InvitacionesModule {}
