import { Module } from '@nestjs/common';
import { InternshipTypesService } from './internship-types.service';
import { InternshipTypesController } from './internship-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InternshipType,
  InternshipTypeSchema,
} from './schema/internship-types.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InternshipType.name, schema: InternshipTypeSchema },
    ]),
  ],
  controllers: [InternshipTypesController],
  providers: [InternshipTypesService],
})
export class InternshipTypesModule {}
