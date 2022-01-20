import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Documentation } from 'src/Entities/Documentation.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { Trip } from 'src/Entities/Trip.entity';
import { TripPlan } from 'src/Entities/TripPlan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TripService {
   constructor(
      @InjectRepository(Trip) private tripsRepository: Repository<Trip>,
      @InjectRepository(TripPlan)
      private tripPlansRepository: Repository<TripPlan>,
      @InjectRepository(Tourist)
      private touristsRepository: Repository<Tourist>
   ) {}

   async getProgress(userId: number, badgeId: number): Promise<number> {
      const trips = await this.tripsRepository.find({
         where: {
            badge: {
               id: badgeId,
               touristId: userId,
            },
         },
      });
      let points = 0;
      for (let i in trips) {
         points += trips[i].points;
      }
      return points;
   }

   async getTripPlans(): Promise<TripPlan[]> {
      return this.tripPlansRepository.find()
   }

   async createTripFromTripPlan(userId: number, tripPlanId: number, dateStart: Date, dateEnd: Date, isLeaderPresent: boolean): Promise<Trip>{
      const tourist = await this.touristsRepository.findOne(userId)
      const plan = await this.tripPlansRepository.findOne(tripPlanId)
      if(!tourist)
         return null
      if(!plan)
         return null
      const newTrip = new Trip()
      newTrip.startDate = dateStart
      newTrip.endDate = dateEnd
      newTrip.tourist = tourist
      newTrip.badge = tourist.badges.find((b) => b.receivedDate == null)
      newTrip.plan = plan
      newTrip.points = plan.points
      // CHANGE zmiana koncepcji
      if(isLeaderPresent){     
         // TODO what to do when leader is present
      }
      return this.tripsRepository.save(newTrip)
   }
}
