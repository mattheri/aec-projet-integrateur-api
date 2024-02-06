import { Test, TestingModule } from '@nestjs/testing';
import { InternshipTypesService } from './internship-types.service';

describe('InternshipTypesService', () => {
  let service: InternshipTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternshipTypesService],
    }).compile();

    service = module.get<InternshipTypesService>(InternshipTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
