import {
   BadRequestException,
   Body,
   Controller,
   Get,
   InternalServerErrorException,
   Param,
   Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Trip } from 'src/Entities/Trip.entity';
import { TripPlan } from 'src/Entities/TripPlan.entity';
import { CreateTripFromTripPlanRequest } from './dtos/requests/CreateTripFromPlanRequest';
import { TripService } from './trip.service';

@ApiTags('Trip')
@Controller('trip')
export class TripController {
   constructor(private tripService: TripService) {}

   @Get('plans')
   async getTripPlans(): Promise<TripPlan[]> {
      return await this.tripService.getTripPlans();
   }

   @Get('trip/:userId')
   async getUserTrips(@Param('userId') userId: number): Promise<Trip[]> {
      return await this.tripService.getUserTrips(userId)
   }

   @Post('create/plan')
   async createTripFromTripPlan(
      @Body() data: CreateTripFromTripPlanRequest,
   ): Promise<Trip> {
      if (data.dateEnd < data.dateStart) {
         throw new BadRequestException('End date cannot be before start date');
      }
      const trip = this.tripService.createTripFromTripPlan(
         data.userId,
         data.tripPlanId,
         new Date(data.dateStart),
         new Date(data.dateEnd),
         data.isLeaderPresent,
      );
      if (!trip) {
         throw new InternalServerErrorException('Cannot create trip');
      }
      return trip;
   }
}
