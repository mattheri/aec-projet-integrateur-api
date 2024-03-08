import { Module } from '@nestjs/common';
import { EnterprisesService } from './enterprises.service';
import { EnterprisesController } from './enterprises.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Enterprise, EnterpriseSchema } from './schema/enterprises.schema';
import { ActivitySectorsModule } from 'src/activity-sectors/activity-sectors.module';
import { QueryParamsModule } from 'src/query-params/query-params.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Enterprise.name, schema: EnterpriseSchema },
    ]),
    ActivitySectorsModule,
    QueryParamsModule,
  ],
  controllers: [EnterprisesController],
  providers: [EnterprisesService],
})
export class EnterprisesModule {}
