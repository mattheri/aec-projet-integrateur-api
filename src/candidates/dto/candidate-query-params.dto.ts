import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { Candidate } from '../entities/candidate.entity';
import { IsEnum, IsOptional } from 'class-validator';
import { ProvinceEnum } from 'src/provinces/provinces.interfaces';

export class CandidateQueryParamsDto extends PartialType(
  OmitType(Candidate, [
    '_id',
    'address',
    'description',
    'phone',
    'province',
    'postalCode',
  ]),
) {
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
