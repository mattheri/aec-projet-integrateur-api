import { Test, TestingModule } from '@nestjs/testing';
import { InternshipRequestsController } from './internship-requests.controller';
import { InternshipRequestsService } from './internship-requests.service';

describe('InternshipRequestsController', () => {
  let controller: InternshipRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternshipRequestsController],
      providers: [InternshipRequestsService],
    }).compile();

    controller = module.get<InternshipRequestsController>(InternshipRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
