import { Test, TestingModule } from '@nestjs/testing';
import { InternshipOffersService } from './internship-offers.service';

describe('InternshipOffersService', () => {
  let service: InternshipOffersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternshipOffersService],
    }).compile();

    service = module.get<InternshipOffersService>(InternshipOffersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
