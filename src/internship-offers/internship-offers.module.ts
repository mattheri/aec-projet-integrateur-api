import { Module } from '@nestjs/common';
import { InternshipOffersService } from './internship-offers.service';
import { InternshipOffersController } from './internship-offers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  InternshipOffer,
  InternshipOfferSchema,
} from './schema/internship-offers.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InternshipOffer.name, schema: InternshipOfferSchema },
    ]),
  ],
  controllers: [InternshipOffersController],
  providers: [InternshipOffersService],
})
export class InternshipOffersModule {}
