import { OmitType } from '@nestjs/swagger';
import { ActivitySector } from '../entities/activity-sector.entity';

export class CreateActivitySectorDto extends OmitType(ActivitySector, [
  '_id',
]) {}
