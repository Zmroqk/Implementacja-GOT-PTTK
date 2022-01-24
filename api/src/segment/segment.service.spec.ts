import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import { Segment } from 'src/Entities/Segment.entity';
import {
   seedDatabase,
   SeedDatabaseResponse,
   TypeOrmTestingModule,
} from 'src/typeorm.testing.module';
import { Connection, getConnection } from 'typeorm';
import { CreateSegmentDataDto } from './dtos/createSegmentData.dto';
import { RequiredDataCreateSegmentData } from './dtos/requiredDataCreateSegment.dto';
import { SegmentService } from './segment.service';

describe('SegmentService', () => {
   let service: SegmentService;
   let connection: Connection;
   let data: SeedDatabaseResponse;
   jest.setTimeout(30000);

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         imports: [...TypeOrmTestingModule()],
         providers: [SegmentService],
      }).compile();

      service = module.get<SegmentService>(SegmentService);
      connection = await getConnection();
      data = await seedDatabase(connection);
      data.mountainGroups.forEach((mg) => {
         mg.mountainRanges.forEach((mr) => {
            delete mr.waypoints;
         });
      });
      data.mountainRanges.forEach((mr) => {
         for (const i in mr.waypoints) {
            const foundWaypoint = data.waypoints.find(
               (w) => w.id == mr.waypoints[i].id,
            );
            foundWaypoint.mountainRange = mr;
         }
         delete mr.waypoints;
      });
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });
   it('Return required data for creating segment', async () => {
      const expectedData = {
         mountainGroups: data.mountainGroups,
         mountainRanges: data.mountainRanges,
         waypoints: data.waypoints,
         segments: [],
      };
      expect(await service.getData()).toMatchObject(expectedData);
   });
   it('Expect to create segment - valid data', async () => {
      const request = new CreateSegmentDataDto()
      request.waypointFromId = data.waypoints[0].id
      request.waypointEndId = data.waypoints[7].id
      request.via = ''
      request.points = 12
      request.pointsReverse = 5
      request.inPoland = true
      expect(await validate(request)).toStrictEqual([]);
      const response = await service.createSegment(
         request.waypointFromId,
         request.waypointEndId,
         request.via,
         request.points,
         request.pointsReverse,
         request.inPoland,
      );
      expect(response.startPoint.id).toBe(request.waypointFromId);
      expect(response.endPoint.id).toBe(request.waypointEndId);
      expect(response.name).toBeDefined();
      expect(response.id).toBe(1);
   });
   it('Expect to create segment - invalid data', async () => {
      const request = new CreateSegmentDataDto()
      request.waypointFromId = data.waypoints[0].id
      request.via = ''
      request.points = 12
      request.inPoland = true
      expect(await validate(request)).not.toBe([]);
   })
});
