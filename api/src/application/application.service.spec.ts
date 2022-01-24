import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Application } from 'src/Entities/Application.entity';
import { ApplicationStatus } from 'src/Entities/Enums/ApplicationStatus.enum';
import { Leader } from 'src/Entities/Leader.entity';
import { LeaderLegitimation } from 'src/Entities/LeaderLegitimation.entity';
import { LeaderService } from 'src/leader/leader.service';
import { seedDatabase, TypeOrmTestingModule } from 'src/typeorm.testing.module';
import { Connection, getConnection, Repository } from 'typeorm';
import { ApplicationService } from './application.service';

describe('ApplicationService', () => {
   let connection: Connection;
   jest.setTimeout(30000);
   let service: ApplicationService;
   let applications: Application[];
   let data;
   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         imports: [...TypeOrmTestingModule()],
         providers: [ApplicationService, LeaderService],
      }).compile();

      service = module.get<ApplicationService>(ApplicationService);
      connection = await getConnection();
      data = await seedDatabase(connection);
      applications = data.applications.map(ap => ({ ...ap }))
      applications.forEach(er => {
         delete er.applicant.badges
         er.requestedMountainGroups.forEach(mg => {
            mg.mountainRanges.forEach(mr => {
               delete mr.waypoints
            })
         })
      });
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });
   it('Return all aplications', async () => {
      const response = await service.getAllAplications();
      expect(response).toMatchObject(applications);
   });
   it('Should accept application', async () => {
      const response = await service.acceptApplication(applications[0].id);
      expect(response).toBeInstanceOf(Leader)
      expect(response.id).toBe(applications[0].applicant.id)
      expect(response.legitimation).toBeInstanceOf(LeaderLegitimation)
   });
   it('Accept accepted application should throw error', async () => {
      await service.acceptApplication(applications[0].id).catch(e => expect(e).toBeInstanceOf(NotFoundException))
   });
   it('Should decline application', async () => {
      const response = await service.declineApplication(applications[2].id);
      expect(response).toBeInstanceOf(Application);
      expect(response.id).toBe(applications[2].id)
      expect(response.status).toBe(ApplicationStatus.Declined)
   });

   afterAll(async () => {
      await connection.close()
   })
});
