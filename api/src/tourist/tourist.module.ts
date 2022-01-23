import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from 'src/Entities/Application.entity';
import { Badge } from 'src/Entities/Badge.entity';
import { Documentation } from 'src/Entities/Documentation.entity';
import { DocumentationStatus } from 'src/Entities/DocumentationStatus.entity';
import { MountainGroup } from 'src/Entities/MountainGroup.entity';
import { Segment } from 'src/Entities/Segment.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { Trip } from 'src/Entities/Trip.entity';
import { TripPlan } from 'src/Entities/TripPlan.entity';
import { User } from 'src/Entities/User.entity';
import { UserSegment } from 'src/Entities/UserSegment.entity';
import { Waypoint } from 'src/Entities/Waypoint.entity';
import { MountainGroupController } from 'src/mountain-groups/mountain-groups.controller';
import { MountainGroupsService } from 'src/mountain-groups/mountain-groups.service';
import { ProofController } from 'src/proof/proof.controller';
import { ProofService } from 'src/proof/proof.service';
import { TripController } from 'src/trip/trip.controller';
import { TripService } from 'src/trip/trip.service';
import { TripPlanController } from 'src/tripplan/tripplan.controller';
import { TripPlanService } from 'src/tripplan/tripplan.service';
import { TouristController } from './tourist.controller';
import { TouristService } from './tourist.service';

@Module({
   imports: [
      TypeOrmModule.forFeature([
         Badge,
         Trip,
         TripPlan,
         Tourist,
         User,
         Waypoint,
         DocumentationStatus,
         Documentation,
         Segment,
         UserSegment,
         MountainGroup
      ]),
   ],
   controllers: [
      TouristController,
      TripController,
      ProofController,
      TripPlanController,
      MountainGroupController,
   ],
   providers: [
      TouristService,
      TripService,
      ProofService,
      TripPlanService,
      MountainGroupsService,
   ],
})
export class TouristModule {}
