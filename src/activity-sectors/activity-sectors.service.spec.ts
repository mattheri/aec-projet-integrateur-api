import { Test, TestingModule } from '@nestjs/testing';
import { ActivitySectorsService } from './activity-sectors.service';

describe('ActivitySectorsService', () => {
  let service: ActivitySectorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivitySectorsService],
    }).compile();

    service = module.get<ActivitySectorsService>(ActivitySectorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
