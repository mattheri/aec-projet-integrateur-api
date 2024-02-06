import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ActivitySector {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  @IsString()
  value: string;
}
