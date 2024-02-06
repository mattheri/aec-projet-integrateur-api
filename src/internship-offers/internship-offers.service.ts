import { Injectable } from '@nestjs/common';
import { CreateInternshipOfferDto } from './dto/create-internship-offer.dto';
import { UpdateInternshipOfferDto } from './dto/update-internship-offer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InternshipOffer } from './schema/internship-offers.schema';
import { Model } from 'mongoose';

@Injectable()
export class InternshipOffersService {
  constructor(
    @InjectModel(InternshipOffer.name)
    private internshipOfferModel: Model<InternshipOffer>,
  ) {}

  create(createInternshipOfferDto: CreateInternshipOfferDto) {
    const createdInternshipOffer = new this.internshipOfferModel(
      createInternshipOfferDto,
    );
    return createdInternshipOffer.save();
  }

  findAll() {
    return this.internshipOfferModel.find().exec();
  }

  findOne(id: string) {
    return this.internshipOfferModel.findById(id).exec();
  }

  update(id: string, updateInternshipOfferDto: UpdateInternshipOfferDto) {
    return this.internshipOfferModel
      .findByIdAndUpdate(id, updateInternshipOfferDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.internshipOfferModel.findByIdAndDelete(id).exec();
  }
}
