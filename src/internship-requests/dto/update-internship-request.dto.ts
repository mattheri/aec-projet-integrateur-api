import { PartialType } from '@nestjs/swagger';
import { CreateInternshipRequestDto } from './create-internship-request.dto';

export class UpdateInternshipRequestDto extends PartialType(CreateInternshipRequestDto) {}
