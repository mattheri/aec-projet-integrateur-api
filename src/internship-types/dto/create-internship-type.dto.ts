import { OmitType } from '@nestjs/swagger';
import { InternshipType } from '../entities/internship-type.entity';

export class CreateInternshipTypeDto extends OmitType(InternshipType, [
  '_id',
]) {}
