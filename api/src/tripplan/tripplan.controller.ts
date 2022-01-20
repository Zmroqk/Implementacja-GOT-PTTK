import {
   Body,
   Controller,
   Get,
   NotFoundException,
   Param,
   Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Segment } from 'src/Entities/Segment.entity';
import { TripPlan } from 'src/Entities/TripPlan.entity';
import { UserSegment } from 'src/Entities/UserSegment.entity';
import { Waypoint } from 'src/Entities/Waypoint.entity';
import { CreateTripPlanDto } from './dtos/requests/CreateTripPlanDto';
import { TripPlanService } from './tripplan.service';

@Controller('tripplan')
export class TripPlanController {
   constructor(private tripPlanService: TripPlanService) {}

   @Get()
   async getAllTripPlans(): Promise<TripPlan[]> {
      return this.getAllTripPlans();
   }

   @Get('waypoints')
   async getAllPoints(): Promise<Waypoint[]> {
      return this.tripPlanService.getAllPoints();
   }

   @Get('segments')
   async getAllSegments(): Promise<Segment[]> {
      return this.tripPlanService.getAllSegments();
   }

   @Get('segments/user/:user_id')
   async getAllUserSegments(
      @Param('user_id') user_id: number,
   ): Promise<UserSegment[]> {
      const userSegments = await this.tripPlanService.getAllUserSegments(
         user_id,
      );
      if (!userSegments) throw new NotFoundException('User does not exist');
      return userSegments;
   }

   @ApiBody({type: CreateTripPlanDto})
   @Post('create')
   async createTripPlan(
      @Body() createTripPlan: CreateTripPlanDto,
   ): Promise<TripPlan> {
      // CHANGE segmenty - zamiast punktów
      const tripPlan = this.tripPlanService.createTripPlan(
         createTripPlan.user_id,
         createTripPlan.description,
         createTripPlan.segments,
      );
      if (!tripPlan) throw new NotFoundException('User does not exist');
      return tripPlan;
   }
}
