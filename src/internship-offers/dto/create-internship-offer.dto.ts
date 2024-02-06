import { OmitType } from '@nestjs/swagger';
import { InternshipOffer } from '../entities/internship-offer.entity';

export class CreateInternshipOfferDto extends OmitType(InternshipOffer, [
  '_id',
]) {}
