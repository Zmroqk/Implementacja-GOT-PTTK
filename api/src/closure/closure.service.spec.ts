import { Test, TestingModule } from '@nestjs/testing';
import { validate } from 'class-validator';
import { Closure } from 'src/Entities/Closure.entity';
import { SegmentService } from 'src/segment/segment.service';
import {
   seedDatabase,
   SeedDatabaseResponse,
   TypeOrmTestingModule,
} from 'src/typeorm.testing.module';
import { Connection, getConnection } from 'typeorm';
import { ClosureService } from './closure.service';
import { CreateClosureDto } from './dtos/createClosure.dto';

describe('ClosureService', () => {
   let connection: Connection;
   jest.setTimeout(30000);
   let service: ClosureService;
   let segmentService: SegmentService;
   let data: SeedDatabaseResponse;

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         imports: [...TypeOrmTestingModule()],
         providers: [ClosureService, SegmentService],
      }).compile();

      service = module.get<ClosureService>(ClosureService);
      segmentService = module.get<SegmentService>(SegmentService);
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
   it('Create closure - valid data', async () => {
      const segment = await segmentService.createSegment(
         data.waypoints[0].id,
         data.waypoints[3].id,
         '',
         2,
         3,
         true,
      );
      const request = new CreateClosureDto()
      request.segmentId = segment.id
      request.dateStart = '2022-01-23'
      request.dateEnd = '2022-02-26'
      request.reason = 'Test reason'
      expect(await validate(request)).toStrictEqual([])
      const response = await service.createClosure(
         request.segmentId,
         new Date(request.dateStart),
         new Date(request.dateEnd),
         request.reason,
      );
      expect(response.id).toBe(1)
      expect(response.closedFrom).toStrictEqual(new Date('2022-01-23'))
      expect(response.closedTo).toStrictEqual(new Date('2022-02-26'))
      expect(response.reason).toStrictEqual('Test reason')
      expect(response.segment.id).toBe(request.segmentId)
   });

   it('Create closure - invalid data', async () => {
      const segment = await segmentService.createSegment(
         data.waypoints[0].id,
         data.waypoints[3].id,
         '',
         2,
         3,
         true,
      );
      const request = new CreateClosureDto()
      request.segmentId = segment.id
      request.dateStart = new Date('2022-01-23')
      request.reason = 'Test reason'
      expect(await validate(request)).not.toBe([])
   });

   afterAll(async () => {
      await connection.close();
   });
});
