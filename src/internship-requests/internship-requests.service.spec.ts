import { Test, TestingModule } from '@nestjs/testing';
import { InternshipRequestsService } from './internship-requests.service';

describe('InternshipRequestsService', () => {
  let service: InternshipRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InternshipRequestsService],
    }).compile();

    service = module.get<InternshipRequestsService>(InternshipRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
