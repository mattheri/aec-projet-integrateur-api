import { Injectable } from '@nestjs/common';
import { CreateInternshipOfferDto } from './dto/create-internship-offer.dto';
import { UpdateInternshipOfferDto } from './dto/update-internship-offer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InternshipOffer } from './schema/internship-offers.schema';
import { Model } from 'mongoose';
import { populatePaths } from './internship-offers.constants';

@Injectable()
export class InternshipOffersService {
  constructor(
    @InjectModel(InternshipOffer.name)
    private internshipOfferModel: Model<InternshipOffer>,
  ) {}

  async create(createInternshipOfferDto: CreateInternshipOfferDto) {
    const createdInternshipOffer = new this.internshipOfferModel(
      createInternshipOfferDto,
    );
    const created = await createdInternshipOffer.save();
    return created.populate(populatePaths);
  }

  findAll() {
    return this.internshipOfferModel.find().populate(populatePaths).exec();
  }

  findOne(id: string) {
    return this.internshipOfferModel
      .findById(id)
      .populate(populatePaths)
      .exec();
  }

  update(id: string, updateInternshipOfferDto: UpdateInternshipOfferDto) {
    return this.internshipOfferModel
      .findByIdAndUpdate(id, updateInternshipOfferDto, { new: true })
      .populate(populatePaths)
      .exec();
  }

  remove(id: string) {
    return this.internshipOfferModel.findByIdAndDelete(id).exec();
  }
}
