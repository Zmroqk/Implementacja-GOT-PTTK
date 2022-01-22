import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MountainGroup } from 'src/Entities/MountainGroup.entity';
import { MountainRange } from 'src/Entities/MountainRange.entity';
import { Segment } from 'src/Entities/Segment.entity';
import { Waypoint } from 'src/Entities/Waypoint.entity';
import { Repository } from 'typeorm';
import { RequiredDataCreateSegmentData } from './dtos/requiredDataCreateSegment.dto';

@Injectable()
export class SegmentService {
   constructor(
      @InjectRepository(MountainGroup)
      private mountainGroupRepository: Repository<MountainGroup>,
      @InjectRepository(MountainRange)
      private mountainRangeRepository: Repository<MountainRange>,
      @InjectRepository(Waypoint)
      private waypointRepository: Repository<Waypoint>,
      @InjectRepository(Segment)
      private segmentRepository: Repository<Segment>
   ) {}

   //CHANGE Directy downloads data
   async getData(): Promise<RequiredDataCreateSegmentData> {
      const groups = await this.mountainGroupRepository.find();
      const ranges = await this.mountainRangeRepository.find();
      const waypoints = await this.waypointRepository.find();
      const segments = await this.segmentRepository.find();
      const response = new RequiredDataCreateSegmentData();
      response.mountainGroups = groups;
      response.mountainRanges = ranges;
      response.waypoints = waypoints;
      response.segments = segments;
      return response;
   }
   // CHANGE Removed mountainGroupId and mountainRangeId they are not required as waypoints contains this information
   async createSegment(
      waypointFromId: number,
      waypointEndId: number,
      via: string,
      points: number,
      pointsReverse: number,
      inPoland: boolean
   ) {
      const waypoint = await this.waypointRepository.findOne(waypointFromId);
      const waypointEnd = await this.waypointRepository.findOne(waypointEndId);
      if(!waypoint || !waypointEnd)
         throw new NotFoundException(`Waypoint with id: ${waypointFromId} not found`)
      const segment = new Segment()
      segment.inPoland = inPoland
      segment.via = via
      segment.startPoint = waypoint
      segment.endPoint = waypointEnd
      segment.points = points
      segment.pointsReverse = pointsReverse
      return this.waypointRepository.save(segment)   
   }
}
