import { OmitType } from '@nestjs/swagger';
import { Enterprise } from '../entities/enterprise.entity';

export class CreateEnterpriseDto extends OmitType(Enterprise, ['_id']) {}
