import { Test, TestingModule } from '@nestjs/testing';
import { InternshipOffersController } from './internship-offers.controller';
import { InternshipOffersService } from './internship-offers.service';

describe('InternshipOffersController', () => {
  let controller: InternshipOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternshipOffersController],
      providers: [InternshipOffersService],
    }).compile();

    controller = module.get<InternshipOffersController>(InternshipOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
