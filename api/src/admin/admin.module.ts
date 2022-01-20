import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from 'src/application/application.controller';
import { ApplicationService } from 'src/application/application.service';
import { Application } from 'src/Entities/Application.entity';
import { LeaderModule } from 'src/leader/leader.module';

@Module({
   imports: [LeaderModule, TypeOrmModule.forFeature([Application])],
   controllers: [ApplicationController],
   providers: [ApplicationService],
})
export class AdminModule {}
