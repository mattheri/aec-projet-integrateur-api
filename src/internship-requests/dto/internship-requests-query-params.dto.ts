import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { InternshipRequest } from '../entities/internship-request.entity';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ProvinceEnum } from 'src/provinces/provinces.interfaces';
import { InternshipTypeEnum } from 'src/internship-types/internship-types.interface';

export class InternshipRequestsQueryParams extends PartialType(
  OmitType(InternshipRequest, [
    '_id',
    'additionalInformation',
    'candidate',
    'description',
    'internshipType',
    'province',
  ]),
) {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false, type: String, description: 'Candidate id' })
  candidate?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Candidate email',
  })
  email?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Candidate first name',
  })
  firstName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Candidate last name',
  })
  lastName?: string;

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
