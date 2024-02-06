import { ApiProperty, OmitType } from '@nestjs/swagger';
import { InternshipRequest } from '../entities/internship-request.entity';

export class InternshipRequestResponseDto extends OmitType(InternshipRequest, [
  'candidate',
  'internshipType',
  'province',
]) {
  @ApiProperty({
    description: 'The _id of the candidate to retrieve from the database',
  })
  candidate: string;
  @ApiProperty({
    description: 'The _id of the internship type to retrieve from the database',
  })
  internshipType: string;
  @ApiProperty({
    description: 'The _id of the province to retrieve from the database',
  })
  province: string;
}
