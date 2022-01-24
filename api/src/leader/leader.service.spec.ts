import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from 'src/typeorm.testing.module';
import { LeaderService } from './leader.service';

describe('LeaderService', () => {
  let service: LeaderService;
  jest.setTimeout(30000);
   beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [LeaderService],
    }).compile();

    service = module.get<LeaderService>(LeaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
