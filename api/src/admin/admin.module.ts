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
import { ClosureService } from 'src/closure/closure.service';
import { ClosureController } from 'src/closure/closure.controller';
import { RouterModule } from '@nestjs/core';
import { Closure } from 'src/Entities/Closure.entity';
import { LegitimationController } from 'src/legitimation/legitimation.controller';
import { LegitimationService } from 'src/legitimation/legitimation.service';
import { Leader } from 'src/Entities/Leader.entity';

@Module({
   imports: [
      LeaderModule,
      TypeOrmModule.forFeature([
         Application,
         Segment,
         MountainGroup,
         MountainRange,
         Waypoint,
         Closure,
         Leader,
      ]),
   ],
   controllers: [ApplicationController, SegmentController, ClosureController, LegitimationController],
   providers: [ApplicationService, SegmentService, ClosureService, LegitimationService],
})
export class AdminModule {}
