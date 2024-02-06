import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Enterprise } from '../entities/enterprise.entity';

export class EnterpriseResponseDto extends OmitType(Enterprise, [
  'province',
  'activitySector',
] as const) {
  @ApiProperty({
    description: 'The _id of the province to retrieve from the database',
  })
  province: string;
  @ApiProperty({
    description: 'The _id of the activity sector to retrieve from the database',
  })
  activitySector: string;
}
