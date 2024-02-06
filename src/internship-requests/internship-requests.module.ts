import { Module } from '@nestjs/common';
import { InternshipRequestsService } from './internship-requests.service';
import { InternshipRequestsController } from './internship-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InternshipRequest,
  InternshipRequestSchema,
} from './schema/internship-requests.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InternshipRequest.name, schema: InternshipRequestSchema },
    ]),
  ],
  controllers: [InternshipRequestsController],
  providers: [InternshipRequestsService],
})
export class InternshipRequestsModule {}
