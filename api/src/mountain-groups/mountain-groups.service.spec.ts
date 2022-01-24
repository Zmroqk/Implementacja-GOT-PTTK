import { Test, TestingModule } from '@nestjs/testing';
import { MountainGroup } from 'src/Entities/MountainGroup.entity';
import { seedDatabase, TypeOrmTestingModule } from 'src/typeorm.testing.module';
import { Connection, getConnection } from 'typeorm';
import { MountainGroupsService } from './mountain-groups.service';

describe('MountainGroupsService', () => {
   let connection: Connection;
   jest.setTimeout(30000);
   let service: MountainGroupsService;
   let mountainGroups: MountainGroup[]

   beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
         imports: [...TypeOrmTestingModule()],
         providers: [MountainGroupsService],
      }).compile();

      service = module.get<MountainGroupsService>(MountainGroupsService);
      connection = await getConnection();
      let data = await seedDatabase(connection);
      mountainGroups = data.mountainGroups
      mountainGroups.forEach(mg => {
         mg.mountainRanges.forEach(mr => {
            delete mr.waypoints
         })
      })
   });

   it('should be defined', () => {
      expect(service).toBeDefined();
   });
   it('should return mountain groups', async () => {
      expect(await service.getAllMountainGroups()).toMatchObject(mountainGroups)
   })

   afterAll(async () => {
      await connection.close()
   })
});
