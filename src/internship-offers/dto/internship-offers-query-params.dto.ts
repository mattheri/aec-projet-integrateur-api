import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { InternshipOffer } from '../entities/internship-offer.entity';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProvinceEnum } from 'src/provinces/provinces.interfaces';
import { InternshipTypeEnum } from 'src/internship-types/internship-types.interface';

export class InternshipOffersQueryParamsDto extends PartialType(
  OmitType(InternshipOffer, [
    '_id',
    'description',
    'enterprise',
    'internshipType',
    'province',
    'salary',
    'weeklyWorkHours',
  ]),
) {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String, description: 'Enterprise id' })
  enterprise?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Enterprise name',
  })
  enterpriseName?: string;

  @IsOptional()
  @IsEnum(ProvinceEnum)
  @ApiProperty({
    required: false,
    type: String,
    description: 'Province',
    enum: ProvinceEnum,
  })
  province?: ProvinceEnum;

  @IsOptional()
  @IsEnum(InternshipTypeEnum)
  @ApiProperty({
    required: false,
    type: String,
    description: 'Internship type',
    enum: InternshipTypeEnum,
  })
  internshipType?: InternshipTypeEnum;
}
