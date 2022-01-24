import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from 'src/typeorm.testing.module';
import { TripPlanService } from './tripplan.service';

describe('TripplanService', () => {
  let service: TripPlanService;
  jest.setTimeout(30000);
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [TripPlanService],
    }).compile();

    service = module.get<TripPlanService>(TripPlanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
