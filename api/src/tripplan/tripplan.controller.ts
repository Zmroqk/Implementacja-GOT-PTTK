import { Body, Controller, Get, Post } from '@nestjs/common';
import { Waypoint } from 'src/Entities/Waypoint.entity';
import { TripPlanService } from './tripplan.service';

@Controller('tripplan')
export class TripPlanController {
   constructor(private tripPlanService: TripPlanService) {}

   @Get()
   async getAllPoints(): Promise<Waypoint[]> {
      return this.tripPlanService.getAllPoints()
   }

   @Post('create')
   async createTripPlan(@Body() waypoints: any) { // TODO Check points Tworzenie planu wyczieczki 2.1
      
   }
}
