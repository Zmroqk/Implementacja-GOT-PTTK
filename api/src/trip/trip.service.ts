import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TestScheduler } from 'rxjs/testing';
import { Documentation } from 'src/Entities/Documentation.entity';
import { DocumentationStatus } from 'src/Entities/DocumentationStatus.entity';
import { MountainRange } from 'src/Entities/MountainRange.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { Trip } from 'src/Entities/Trip.entity';
import { TripPlan } from 'src/Entities/TripPlan.entity';
import { Repository } from 'typeorm';

/**
 * Service that is responsible for handling getting users trip progress as well as for returning trip plans
 * and users trips.
 */
@Injectable()
export class TripService {
   constructor(
      @InjectRepository(Trip) private tripsRepository: Repository<Trip>,
      @InjectRepository(TripPlan)
      private tripPlansRepository: Repository<TripPlan>,
      @InjectRepository(Tourist)
      private touristsRepository: Repository<Tourist>,
      @InjectRepository(DocumentationStatus)
      private documentationStatusRepository: Repository<DocumentationStatus>,
   ) {}

   /**
    * Get user progress
    * @param userId User for which we want to check progress
    * @param badgeId User badge id we are checking progress for
    * @returns Object of currently acquired points, ratio of trips in poland and unique mountian ranges count
    */
   async getProgress(
      userId: number,
      badgeId: number,
   ): Promise<{
      points: number;
      inPolandRatio: number;
      mountainRangesCount: number;
   }> {
      const trips = await this.tripsRepository
         .createQueryBuilder('trip')
         .innerJoinAndSelect('trip.badge', 'badge')
         .innerJoinAndSelect('trip.plan', 'plan')
         .innerJoinAndSelect('plan.tripSegments', 'tripSegments')
         .innerJoinAndSelect('tripSegments.segment', 'segment')
         .innerJoinAndSelect('segment.startPoint', 'startPoint')
         .innerJoinAndSelect('segment.endPoint', 'endPoint')
         .innerJoinAndSelect('startPoint.mountainRange', 'mountainRange')
         .innerJoinAndSelect('endPoint.mountainRange', 'mountainRange2')       
         .innerJoinAndSelect('trip.documentation', 'documentation')
         .innerJoinAndSelect('documentation.status', 'status')
         .where('badge.id = :badgeId', { badgeId })
         .andWhere('badge.touristId = :touristId', { touristId: userId })
         .andWhere('status.status = \'Verified\'')
         .getMany();
      const inPolandArray = trips
         .map((trip) => trip.plan.tripSegments.map((ts) => ts.segment.inPoland))
         .flat();
      const mountainRanges: MountainRange[] = [];
      trips
         .filter((trip) => trip.documentation.status.status == 'Verified')
         .map((trip) => trip.plan.tripSegments.map((ts) => ts.segment))
         .flat()
         .forEach((seg) => {
            mountainRanges.push(seg.startPoint.mountainRange);
            mountainRanges.push(seg.endPoint.mountainRange);
         });
      const uniqueMountainRanges = [];
      mountainRanges.forEach((mr) => {
         if (!uniqueMountainRanges.find((umr) => umr.id == mr.id)) {
            uniqueMountainRanges.push(mr);
         }
      });
      let count = 0;
      let fullCount = 0;
      for (const inPoland of inPolandArray) {
         if (inPoland) count++;
         fullCount++;
      }
      let points = 0;
      for (let i in trips) {
         points += trips[i].points;
      }
      return {
         points,
         inPolandRatio: count / fullCount,
         mountainRangesCount: uniqueMountainRanges.length,
      };
   }

   /**
    * Get users trips
    * @param userId User id for which trips we want to get
    * @returns Array of user trips
    */
   async getUserTrips(userId: number): Promise<Trip[]> {
      const trips = await this.tripsRepository.find({
         join: {
            alias: 'trip',
            leftJoinAndSelect: {
               documentation: 'trip.documentation',
               status: 'documentation.status'
            }
         },
         where: {
            tourist: {
               id: userId
            }
         }
      })
      return trips
   }

   /**
    * Get all trip plans
    * @returns Array of trip plans
    */
   async getTripPlans(): Promise<TripPlan[]> {
      return this.tripPlansRepository.find();
   }

   /**
    * Create new trip using existing trip plan
    * @param userId User id for which new trip should be assosiated
    * @param tripPlanId Trip plan id from which we create trip
    * @param dateStart Date when trip started
    * @param dateEnd Date when trip ended
    * @param isLeaderPresent Was leader present on trip
    * @returns New trip that was created in database
    */
   async createTripFromTripPlan(
      userId: number,
      tripPlanId: number,
      dateStart: Date,
      dateEnd: Date,
      isLeaderPresent: boolean,
   ): Promise<Trip> {
      const tourist = await this.touristsRepository.findOne({
         where: { id: userId },
         relations: ['badges'],
      });
      const plan = await this.tripPlansRepository.findOne(tripPlanId);
      if (!tourist) return null;
      if (!plan) return null;
      const newTrip = new Trip();
      newTrip.startDate = dateStart;
      newTrip.endDate = dateEnd;
      newTrip.tourist = tourist;
      newTrip.badge = tourist.badges.find((b) => b.receivedDate == null);
      newTrip.plan = plan;
      newTrip.points = plan.points;
      const documentation = new Documentation();
      documentation.description = ""
      documentation.book = tourist.book;
      // CHANGE zmiana koncepcji
      if (isLeaderPresent) {
         documentation.status =
            await this.documentationStatusRepository.findOne({
               status: 'Verified',
            });
         if(!documentation.status){
            const status = new DocumentationStatus()
            status.status = 'Verified'
            documentation.status = status
         }
      } else {
         documentation.status =
            await this.documentationStatusRepository.findOne({
               status: 'Created',
            });
         if(!documentation.status){
            const status = new DocumentationStatus()
            status.status = 'Created'
            documentation.status = status
         }
      }
      newTrip.documentation = documentation
      return this.tripsRepository.save(newTrip);
   }
}
