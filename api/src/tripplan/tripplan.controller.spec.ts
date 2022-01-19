import { Test, TestingModule } from '@nestjs/testing';
import { TripPlanController } from './tripplan.controller';

describe('TripplanController', () => {
  let controller: TripPlanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripPlanController],
    }).compile();

    controller = module.get<TripPlanController>(TripPlanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
