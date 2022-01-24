import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingModule } from 'src/typeorm.testing.module';
import { ProofService } from './proof.service';

describe('ProofService', () => {
  let service: ProofService;
  jest.setTimeout(30000);
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingModule()],
      providers: [ProofService],
    }).compile();

    service = module.get<ProofService>(ProofService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
