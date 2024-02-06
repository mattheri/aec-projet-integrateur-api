import { Module } from '@nestjs/common';
import { ActivitySectorsService } from './activity-sectors.service';
import { ActivitySectorsController } from './activity-sectors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ActivitySector,
  ActivitySectorSchema,
} from './schema/activity-sectors.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ActivitySector.name, schema: ActivitySectorSchema },
    ]),
  ],
  controllers: [ActivitySectorsController],
  providers: [ActivitySectorsService],
  exports: [ActivitySectorsService],
})
export class ActivitySectorsModule {}
