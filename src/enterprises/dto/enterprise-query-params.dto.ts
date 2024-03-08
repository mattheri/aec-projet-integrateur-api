import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Enterprise } from '../entities/enterprise.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProvinceEnum } from 'src/provinces/provinces.interfaces';

export class EnterpriseQueryParamsDto extends PartialType(
  OmitType(Enterprise, [
    '_id',
    'address',
    'activitySector',
    'description',
    'image',
    'phone',
    'postalCode',
    'website',
    'province',
  ]),
) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Activity Sector',
  })
  activitySector?: string;

  @IsOptional()
  @IsEnum(ProvinceEnum)
  @ApiProperty({
    required: false,
    type: String,
    description: 'Province',
    enum: ProvinceEnum,
  })
  province?: ProvinceEnum;
}
