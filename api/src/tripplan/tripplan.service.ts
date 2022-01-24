import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { setDefaultResultOrder } from 'dns';
import { Segment } from 'src/Entities/Segment.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { TripPlan } from 'src/Entities/TripPlan.entity';
import { TripSegment } from 'src/Entities/TripSegment.entity';
import { UserSegment } from 'src/Entities/UserSegment.entity';
import { Waypoint } from 'src/Entities/Waypoint.entity';
import { In, Repository } from 'typeorm';
import { SegmentDto } from './dtos/requests/SegmentDto';

@Injectable()
export class TripPlanService {
   constructor(
      @InjectRepository(Waypoint)
      private waypointsRepository: Repository<Waypoint>,
      @InjectRepository(Tourist) private touristRepository: Repository<Tourist>,
      @InjectRepository(Segment) private segmentRepository: Repository<Segment>,
      @InjectRepository(UserSegment)
      private userSegmentRepository: Repository<UserSegment>,
      @InjectRepository(TripPlan)
      private tripPlansRepository: Repository<TripPlan>,
   ) {}

   async getAllPoints(): Promise<Waypoint[]> {
      return this.waypointsRepository.find();
   }

   async getAllSegments(): Promise<Segment[]> {
      return this.segmentRepository.find();
   }

   async getAllTripPlans(): Promise<TripPlan[]> {
      return this.tripPlansRepository.find();
   }

   async getAllUserSegments(user_id: number): Promise<UserSegment[]> {
      const user = await this.touristRepository.findOne(user_id);
      if (!user) return null;
      return this.userSegmentRepository.find({
         author: user,
      });
   }

   // CHANGE Massive change
   async createTripPlan(
      user_id: number,
      description: string,
      segmentsDtos: SegmentDto[],
   ): Promise<TripPlan> {
      const segments = segmentsDtos.filter((seg) => !seg.isUserSegment).flat();
      const userSegments = segmentsDtos
         .filter((seg) => seg.isUserSegment)
         .flat();
      const segmentsFromDb = await this.segmentRepository.find({
         relations: ['startPoint', 'endPoint'],
         where: {
            id: In(segments.map((seg) => seg.id)),
         },
      });
      const actualSegments = segments.map((s) =>
         segmentsFromDb.find((sd) => s.id == sd.id),
      );
      const userSegmentsFromDb = await this.userSegmentRepository.find({
         where: {
            id: In(userSegments.map((seg) => seg.id)),
         },
      });
      const userActualSegments = userSegments.map((us) =>
         userSegmentsFromDb.find((usd) => us.id == usd.id),
      );
      const tripPlan = new TripPlan();
      const user = await this.touristRepository.findOne(user_id);
      if (!user) return null;
      tripPlan.author = user;
      tripPlan.description = description;

      const tripSegments = actualSegments.map((seg) => {
         let index = -1;
         const segmentDto = segments.find((segDto, i) => {
            if (segDto.id == seg.id) {
               index = i;
               return segDto;
            }
         });
         const tripSegment = new TripSegment();
         tripSegment.segment = seg;
         tripSegment.consecutiveNumber = segmentDto.orderNumber;
         if (segmentDto.reverse) tripSegment.direction = seg.startPoint.name;
         else tripSegment.direction = seg.endPoint.name;
         segments.splice(index, 1);
         return tripSegment;
      });

      const userTripSegments = userActualSegments.map((seg) => {
         const segmentDto = segments.find((segDto) => segDto.id == seg.id);
         const tripSegment = new TripSegment();
         tripSegment.userSegment = seg;
         tripSegment.consecutiveNumber = segmentDto.orderNumber;
         tripSegment.direction = seg.description;
         return tripSegment;
      });
      tripSegments.push(...userTripSegments);
      tripPlan.tripSegments = tripSegments;
      tripPlan.implicit = false;
      tripPlan.points = tripSegments
         .map((seg) => {
            if (seg.segment) {
               if (seg.direction == seg.segment.startPoint.name)
                  return seg.segment.pointsReverse;
               else return seg.segment.points;
            } else if (seg.userSegment) {
               return seg.userSegment.points;
            }
         })
         .reduce((acc, curr) => (acc += curr), 0);
      const databaseTripPlan = await this.tripPlansRepository.save(tripPlan);
      return databaseTripPlan;
   }
}
