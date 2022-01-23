import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from 'src/typeorm.testing.module';
import { TripService } from './trip.service';

describe('TripService', () => {
  let service: TripService;
  jest.setTimeout(30000);
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [TripService],
    }).compile();

    service = module.get<TripService>(TripService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
