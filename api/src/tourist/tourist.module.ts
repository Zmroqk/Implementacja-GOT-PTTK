import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Badge } from 'src/Entities/Badge.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { Trip } from 'src/Entities/Trip.entity';
import { User } from 'src/Entities/User.entity';
import { TripService } from 'src/trip/trip.service';
import { TouristService } from './tourist.service';

@Module({
   imports: [TypeOrmModule.forFeature([Badge, Trip, Tourist, User])],
   providers: [TouristService, TripService],
})
export class TouristModule {}
