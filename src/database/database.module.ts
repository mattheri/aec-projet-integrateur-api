import { Module } from '@nestjs/common';
import { DatabaseSearchService } from './database-search.service';

@Module({
  exports: [DatabaseSearchService],
  providers: [DatabaseSearchService],
})
export class DatabaseModule {}
