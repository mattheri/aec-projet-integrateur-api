import { Module } from '@nestjs/common';
import { InternshipRequestsService } from './internship-requests.service';
import { InternshipRequestsController } from './internship-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InternshipRequest,
  InternshipRequestSchema,
} from './schema/internship-requests.schema';
import { QueryParamsModule } from 'src/query-params/query-params.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InternshipRequest.name, schema: InternshipRequestSchema },
    ]),
    QueryParamsModule,
  ],
  controllers: [InternshipRequestsController],
  providers: [InternshipRequestsService],
})
export class InternshipRequestsModule {}
