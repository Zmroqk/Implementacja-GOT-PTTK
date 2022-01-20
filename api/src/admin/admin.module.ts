import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationController } from 'src/application/application.controller';
import { ApplicationService } from 'src/application/application.service';
import { Application } from 'src/Entities/Application.entity';
import { MountainGroup } from 'src/Entities/MountainGroup.entity';
import { MountainRange } from 'src/Entities/MountainRange.entity';
import { Segment } from 'src/Entities/Segment.entity';
import { Waypoint } from 'src/Entities/Waypoint.entity';
import { LeaderModule } from 'src/leader/leader.module';
import { SegmentController } from 'src/segment/segment.controller';
import { SegmentService } from 'src/segment/segment.service';

@Module({
   imports: [
      LeaderModule,
      TypeOrmModule.forFeature([
         Application,
         Segment,
         MountainGroup,
         MountainRange,
         Waypoint,
      ]),
   ],
   controllers: [ApplicationController, SegmentController],
   providers: [ApplicationService, SegmentService],
})
export class AdminModule {}
