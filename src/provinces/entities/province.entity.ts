import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ProvinceEnum } from '../provinces.interfaces';

export class Province {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  @IsEnum(ProvinceEnum)
  value: string;
}
