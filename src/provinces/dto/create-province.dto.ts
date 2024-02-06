import { OmitType } from '@nestjs/swagger';
import { Province } from '../entities/province.entity';

export class CreateProvinceDto extends OmitType(Province, ['_id']) {}
