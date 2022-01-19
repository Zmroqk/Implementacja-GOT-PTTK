import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Waypoint } from 'src/Entities/Waypoint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TripPlanService {
   constructor(@InjectRepository(Waypoint)private waypointsRepository: Repository<Waypoint>) {}

   async getAllPoints(): Promise<Waypoint[]> {
      return this.waypointsRepository.find()
   }

   
}
