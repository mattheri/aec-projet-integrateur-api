import { Test, TestingModule } from '@nestjs/testing';
import { ActivitySectorsController } from './activity-sectors.controller';
import { ActivitySectorsService } from './activity-sectors.service';

describe('ActivitySectorsController', () => {
  let controller: ActivitySectorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivitySectorsController],
      providers: [ActivitySectorsService],
    }).compile();

    controller = module.get<ActivitySectorsController>(ActivitySectorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
