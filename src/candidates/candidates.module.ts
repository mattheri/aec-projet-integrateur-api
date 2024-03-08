import { Module } from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CandidatesController } from './candidates.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Candidate, CandidateSchema } from './schema/candidates.schema';
import { QueryParamsModule } from 'src/query-params/query-params.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Candidate.name, schema: CandidateSchema },
    ]),
    QueryParamsModule,
  ],
  controllers: [CandidatesController],
  providers: [CandidatesService],
})
export class CandidatesModule {}
