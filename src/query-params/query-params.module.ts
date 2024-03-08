import { Module } from '@nestjs/common';
import { QueryParamsService } from './query-params.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  exports: [QueryParamsService],
  providers: [QueryParamsService],
  imports: [DatabaseModule],
})
export class QueryParamsModule {}
