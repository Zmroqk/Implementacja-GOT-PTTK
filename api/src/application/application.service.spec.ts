import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Application } from 'src/Entities/Application.entity';
import { ApplicationType } from 'src/Entities/ApplicationType.entity';
import { ApplicationStatus } from 'src/Entities/Enums/ApplicationStatus.enum';
import { Leader } from 'src/Entities/Leader.entity';
import { Tourist } from 'src/Entities/Tourist.entity';
import { LeaderService } from 'src/leader/leader.service';
import { seedDatabase, TypeOrmTestingModule } from 'src/typeorm.testing.module';
import { getConnection, Repository } from 'typeorm';
import { ApplicationService } from './application.service';

describe('ApplicationService', () => {
   let service: ApplicationService;
   let applications: Application[];
   beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
         imports: [...TypeOrmTestingModule()],
         providers: [ApplicationService, LeaderService],
      }).compile();

      service = module.get<ApplicationService>(ApplicationService);
      const connection = await getConnection();
      const applicationRepository = connection.getRepository(Application);
      const data = await seedDatabase(connection);
      const application1 = new Application();
      application1.applicant = data.users.tourists[0];
      application1.body = 'Test application';
      application1.requestedMountainGroups = data.mountainGroups[0];
      application1.status = ApplicationStatus.Created;
      application1.type = data.types[0];
      const application1Declined = new Application();
      application1Declined.applicant = data.users.tourists[0];
      application1Declined.body = 'Test application';
      application1Declined.requestedMountainGroups = data.mountainGroups[0];
      application1Declined.status = ApplicationStatus.Declined;
      application1Declined.type = data.types[0];
      const application2Extend = new Application();
      application2Extend.applicant = data.users.leaders[0].tourist;
      application2Extend.body = 'Test application Extend';
      application2Extend.requestedMountainGroups = data.mountainGroups[1];
      application2Extend.status = ApplicationStatus.Created;
      application2Extend.type = data.types[1];
      applications = await applicationRepository.save([
         application1,
         application1Declined,
         application2Extend,
      ]);
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
      applications[0].status = ApplicationStatus.Accepted;
      expect(response).toMatchObject(applications[0]);
   });
   it('Accept accepted application should throw error', async () => {
      const response = await service.acceptApplication(applications[1].id)
      expect(response).toThrowError(BadRequestException)
   })
   it('Should decline application', async () => {
      const response = await service.declineApplication(applications[2].id);
      applications[2].status = ApplicationStatus.Declined
      expect(response).toMatchObject(applications[2])
   })
});
