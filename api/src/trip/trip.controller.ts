import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post } from '@nestjs/common';
import { Trip } from 'src/Entities/Trip.entity';
import { TripPlan } from 'src/Entities/TripPlan.entity';
import { CreateTripFromTripPlanRequest } from './dtos/requests/CreateTripFromPlanRequest';
import { TripService } from './trip.service';

@Controller('trip')
export class TripController {
   constructor(private tripService: TripService) {}

   @Get('trips')
   async getTripPlans(): Promise<TripPlan[]> {
      return this.tripService.getTripPlans()
   }

   @Post('create/plan')
   async createTripFromTripPlan(@Body() data: CreateTripFromTripPlanRequest): Promise<Trip>{
      if(data.dateEnd < data.dateStart){
         throw new BadRequestException('End date cannot be before start date')
      }
      const trip = this.tripService.createTripFromTripPlan(data.userId, data.tripPlanId, data.dateStart, data.dateEnd, data.isLeaderPresent)
      if(!trip){
         throw new InternalServerErrorException('Cannot create trip')
      }
      return trip
   }
}
