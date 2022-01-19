import { Module } from '@nestjs/common';
import { ApplicationController } from 'src/application/application.controller';
import { ApplicationService } from 'src/application/application.service';
import { LeaderModule } from 'src/leader/leader.module';

@Module({
   imports: [LeaderModule],
   controllers: [ApplicationController],
   providers: [ApplicationService],
})
export class AdminModule {}
