import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrisisService } from './crisis.service';
import { CrisisController } from './crisis.controller';
import { Crisis } from './crisis.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Crisis])],
  providers: [CrisisService],
  controllers: [CrisisController],
})
export class CrisisModule {}
