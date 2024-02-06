import { ApiProperty } from '@nestjs/swagger';
import {
  IsBase64,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ActivitySector } from 'src/activity-sectors/entities/activity-sector.entity';
import { Province } from 'src/provinces/entities/province.entity';

export class Enterprise {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  @IsOptional()
  @IsBase64()
  image?: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsPostalCode('CA', {
    message: 'Postal code must be a valid Canadian postal code',
  })
  postalCode: string;
  @ApiProperty()
  @IsString()
  city: string;
  @ApiProperty()
  @ValidateNested()
  province: Province;
  @ApiProperty()
  @IsPhoneNumber('CA', {
    message: 'Phone number must be a valid Canadian phone number',
  })
  phone: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @ValidateNested()
  activitySector: ActivitySector;
  @ApiProperty()
  @IsOptional()
  @IsString()
  website?: string;
}
