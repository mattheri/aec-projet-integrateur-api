import { ApiProperty, OmitType } from '@nestjs/swagger';
import { InternshipOffer } from '../entities/internship-offer.entity';

export class InternshipOfferResponseDto extends OmitType(InternshipOffer, [
  'enterprise',
  'internshipType',
  'province',
]) {
  @ApiProperty({
    description: 'The _id of the enterprise to retrieve from the database',
  })
  enterprise: string;
  @ApiProperty({
    description: 'The _id of the internship type to retrieve from the database',
  })
  internshipType: string;
  @ApiProperty({
    description: 'The _id of the province to retrieve from the database',
  })
  province: string;
}
