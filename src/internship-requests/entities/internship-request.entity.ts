import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Candidate } from 'src/candidates/entities/candidate.entity';
import { InternshipType } from 'src/internship-types/entities/internship-type.entity';
import { Province } from 'src/provinces/entities/province.entity';

export class InternshipRequest {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @ValidateNested()
  candidate: Candidate;
  @ApiProperty()
  @Transform(({ value }) => {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  })
  @IsString()
  startDate: Date;
  @ApiProperty()
  @Transform(({ value }) => {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  })
  @IsString()
  endDate: Date;
  @ApiProperty()
  @IsNumber()
  weeklyWorkHours: number;
  @ApiProperty()
  @ValidateNested()
  province: Province;
  @ApiProperty()
  @IsString({ each: true })
  skills: string[];
  @ApiProperty()
  @ValidateNested()
  internshipType: InternshipType;
  @ApiProperty()
  @IsString()
  @IsOptional()
  additionalInformation?: string;
  @ApiProperty()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value === 'true';
    }

    return value;
  })
  isActive: boolean;
}
