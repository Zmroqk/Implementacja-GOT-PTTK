import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Badge } from 'src/Entities/Badge.entity';
import { TripService } from 'src/trip/trip.service';
import { IsNull, Not, Repository } from 'typeorm';
import { GetOngoingBadgeResponse } from './dtos/GetOngoingBadgeResponse';

@Injectable()
export class TouristService {
   constructor(
      @InjectRepository(Badge) private badgeRepository: Repository<Badge>,
      @Inject(TripService) private tripsService: TripService,
   ) {}

   async getBadges(userId: number): Promise<Badge[]> {
      const badges = await this.badgeRepository.find({
         tourist: {
            id: userId
         },
         receivedDate: Not(IsNull()),
      });
      return badges;
   }

   async getOngoingBadge(userId: number): Promise<GetOngoingBadgeResponse> {
      const badge = await this.badgeRepository.findOne({
         tourist: {
            id: userId
         },
         receivedDate: IsNull(),
      });
      if (!badge) {
         return null;
      }
      const points = await this.tripsService.getProgress(userId, badge.id);
      const response = new GetOngoingBadgeResponse();
      response.badge = badge;
      response.points = points;
      return response;
   }
}
