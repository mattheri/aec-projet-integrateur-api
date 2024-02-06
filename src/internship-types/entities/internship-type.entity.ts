import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { InternshipTypeEnum } from '../internship-types.interface';

export class InternshipType {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  @IsEnum(InternshipTypeEnum)
  value: string;
}
