import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  ValidateNested,
  IsPostalCode,
} from 'class-validator';
import { Province } from 'src/provinces/entities/province.entity';

export class Candidate {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  @IsString()
  description: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsString()
  firstName: string;
  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()
  @IsString()
  address: string;
  @ApiProperty()
  @IsPhoneNumber('CA', {
    message: 'Phone number must be a valid Canadian phone number',
  })
  phone: string;
  @ApiProperty()
  @IsString()
  city: string;
  @ApiProperty()
  @IsString({ each: true })
  skills: string[];
  @ApiProperty()
  @ValidateNested()
  province: Province;
  @ApiProperty()
  @IsPostalCode('CA', {
    message: 'Postal code must be a valid Canadian postal code',
  })
  postalCode: string;
}
