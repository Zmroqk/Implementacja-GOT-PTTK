import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from 'src/Entities/Badge.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { Trip } from 'src/Entities/Trip.entity';
import { TripPlan } from 'src/Entities/TripPlan.entity';
import { User } from 'src/Entities/User.entity';
import { Waypoint } from 'src/Entities/Waypoint.entity';
import { ProofController } from 'src/proof/proof.controller';
import { ProofService } from 'src/proof/proof.service';
import { TripController } from 'src/trip/trip.controller';
import { TripService } from 'src/trip/trip.service';
import { TripPlanController } from 'src/tripplan/tripplan.controller';
import { TripPlanService } from 'src/tripplan/tripplan.service';
import { TouristController } from './tourist.controller';
import { TouristService } from './tourist.service';

@Module({
   imports: [TypeOrmModule.forFeature([Badge, Trip, TripPlan, Tourist, User, Waypoint])],
   controllers: [TouristController, TripController, ProofController, TripPlanController],
   providers: [TouristService, TripService, ProofService, TripPlanService],
})
export class TouristModule {}
