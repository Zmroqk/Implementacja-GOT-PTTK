import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from 'src/typeorm.testing.module';
import { LegitimationService } from './legitimation.service';

describe('LegitimationService', () => {
  let service: LegitimationService;
  jest.setTimeout(30000);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [LegitimationService],
    }).compile();

    service = module.get<LegitimationService>(LegitimationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
