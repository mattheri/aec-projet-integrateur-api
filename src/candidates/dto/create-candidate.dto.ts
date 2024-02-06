import { OmitType } from '@nestjs/swagger';
import { Candidate } from '../entities/candidate.entity';

export class CreateCandidateDto extends OmitType(Candidate, ['_id']) {}
