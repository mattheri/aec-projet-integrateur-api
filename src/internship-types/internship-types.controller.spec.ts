import { Test, TestingModule } from '@nestjs/testing';
import { InternshipTypesController } from './internship-types.controller';
import { InternshipTypesService } from './internship-types.service';

describe('InternshipTypesController', () => {
  let controller: InternshipTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternshipTypesController],
      providers: [InternshipTypesService],
    }).compile();

    controller = module.get<InternshipTypesController>(InternshipTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
