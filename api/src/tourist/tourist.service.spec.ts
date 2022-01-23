import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from 'src/trip/trip.service';
import { TypeOrmTestingModule } from 'src/typeorm.testing.module';
import { TouristService } from './tourist.service';

describe('TouristService', () => {
  let service: TouristService;
  jest.setTimeout(30000);
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [TouristService, TripService],
    }).compile();

    service = module.get<TouristService>(TouristService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
