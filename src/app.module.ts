import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InternshipRequestsModule } from './internship-requests/internship-requests.module';
import { InternshipOffersModule } from './internship-offers/internship-offers.module';
import { CandidatesModule } from './candidates/candidates.module';
import { EnterprisesModule } from './enterprises/enterprises.module';
import { InternshipTypesModule } from './internship-types/internship-types.module';
import { ActivitySectorsModule } from './activity-sectors/activity-sectors.module';
import { ProvincesModule } from './provinces/provinces.module';

import databaseConfig from './database/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('url'),
        };
      },
      inject: [ConfigService],
    }),
    InternshipRequestsModule,
    InternshipOffersModule,
    CandidatesModule,
    EnterprisesModule,
    InternshipTypesModule,
    ActivitySectorsModule,
    ProvincesModule,
  ],
})
export class AppModule {}
