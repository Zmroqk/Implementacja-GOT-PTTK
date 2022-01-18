import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Badge } from 'src/Entities/Badge.entity';
import { Trip } from 'src/Entities/Trip.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TripService {
   constructor(
      @InjectRepository(Badge) private tripsRepository: Repository<Trip>,
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
}
