import { Injectable } from '@nestjs/common';
import { CreateInternshipOfferDto } from './dto/create-internship-offer.dto';
import { UpdateInternshipOfferDto } from './dto/update-internship-offer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InternshipOffer } from './schema/internship-offers.schema';
import { Model } from 'mongoose';
import { populatePaths } from './internship-offers.constants';
import { QueryParamsService } from 'src/query-params/query-params.service';
import { InternshipOffersQueryParamsDto } from './dto/internship-offers-query-params.dto';

@Injectable()
export class InternshipOffersService {
  constructor(
    @InjectModel(InternshipOffer.name)
    private internshipOfferModel: Model<InternshipOffer>,
    private readonly queryParams: QueryParamsService<Model<InternshipOffer>>,
  ) {}

  async create(createInternshipOfferDto: CreateInternshipOfferDto) {
    const createdInternshipOffer = new this.internshipOfferModel(
      createInternshipOfferDto,
    );
    const created = await createdInternshipOffer.save();
    return created.populate(populatePaths);
  }

  async findAll(query: InternshipOffersQueryParamsDto) {
    if (this.queryParams.queryIsNotEmpty(query)) {
      return this.queryParams.execute(this.internshipOfferModel, query, {
        paths: {
          enterprise: 'enterprise._id',
          enterpriseName: 'enterprise.name',
          internshipType: 'internshipType.value',
          province: 'province.value',
        },
        populate: true,
        populatePaths,
      });
    }

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

  async count(query: InternshipOffersQueryParamsDto) {
    if (this.queryParams.queryIsNotEmpty(query)) {
      const documentsFound = await this.queryParams.execute(
        this.internshipOfferModel,
        query,
        {
          paths: {
            enterprise: 'enterprise._id',
            enterpriseName: 'enterprise.name',
            internshipType: 'internshipType.value',
            province: 'province.value',
          },
          populate: false,
        },
      );

      return documentsFound.length;
    }

    return this.internshipOfferModel.countDocuments().exec();
  }
}
