import { OmitType } from '@nestjs/swagger';
import { InternshipRequest } from '../entities/internship-request.entity';

export class CreateInternshipRequestDto extends OmitType(InternshipRequest, [
  '_id',
]) {}
