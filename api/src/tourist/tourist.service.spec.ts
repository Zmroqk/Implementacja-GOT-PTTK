import { Test, TestingModule } from '@nestjs/testing';
import { TouristService } from './tourist.service';

describe('TouristService', () => {
  let service: TouristService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TouristService],
    }).compile();

    service = module.get<TouristService>(TouristService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
