import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Candidate } from '../entities/candidate.entity';

export class CandidateResponseDto extends OmitType(Candidate, ['province']) {
  @ApiProperty({
    description: 'The _id of the province to retrieve from the database',
  })
  province: string;
}
