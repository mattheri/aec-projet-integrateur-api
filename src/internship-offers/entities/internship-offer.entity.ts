import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Enterprise } from 'src/enterprises/entities/enterprise.entity';
import { InternshipType } from 'src/internship-types/entities/internship-type.entity';
import { Province } from 'src/provinces/entities/province.entity';
import { InternshipOfferPaidStatus } from '../internship-offers.interface';

export class InternshipOffer {
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
  enterprise: Enterprise;
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
  @IsNumber()
  @IsOptional()
  salary?: number;
  @ApiProperty()
  @ValidateNested()
  province: Province;
  @ApiProperty()
  @IsString({ each: true })
  requiredSkills: string[];
  @ApiProperty()
  @ValidateNested()
  internshipType: InternshipType;
  @ApiProperty({
    enum: InternshipOfferPaidStatus,
  })
  @IsOptional()
  @IsEnum(InternshipOfferPaidStatus)
  paid: InternshipOfferPaidStatus;
  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
