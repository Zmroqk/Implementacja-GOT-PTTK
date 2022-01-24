import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/Entities/Application.entity';
import { Leader } from 'src/Entities/Leader.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { LeaderController } from './leader.controller';
import { LeaderService } from './leader.service';

@Module({
  imports: [TypeOrmModule.forFeature([Leader, Tourist])],
  providers: [LeaderService],
  controllers: [LeaderController],
  exports: [LeaderService]
})
export class LeaderModule {}
