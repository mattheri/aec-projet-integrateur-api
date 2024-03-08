import { Injectable } from '@nestjs/common';
import { CreateInternshipRequestDto } from './dto/create-internship-request.dto';
import { UpdateInternshipRequestDto } from './dto/update-internship-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InternshipRequest } from './schema/internship-requests.schema';
import { Model } from 'mongoose';
import { populatePaths } from './internship-requests.constants';
import { QueryParamsService } from 'src/query-params/query-params.service';
import { InternshipRequestsQueryParams } from './dto/internship-requests-query-params.dto';

@Injectable()
export class InternshipRequestsService {
  constructor(
    @InjectModel(InternshipRequest.name)
    private internshipRequestModel: Model<InternshipRequest>,
    private readonly queryParams: QueryParamsService<Model<InternshipRequest>>,
  ) {}

  async create(createInternshipRequestDto: CreateInternshipRequestDto) {
    const createdInternshipRequest = new this.internshipRequestModel(
      createInternshipRequestDto,
    );
    const created = await createdInternshipRequest.save();
    return created.populate(populatePaths);
  }

  async findAll(query: InternshipRequestsQueryParams) {
    if (Object.keys(query).length) {
      return await this.queryParams.execute(
        this.internshipRequestModel,
        query,
        {
          paths: {
            province: 'province.value',
            candidate: 'candidate._id',
            email: 'candidate.email',
            firstName: 'candidate.firstName',
            lastName: 'candidate.lastName',
            internshipType: 'internshipType.value',
            skills: {
              path: 'candidate.skills',
              type: 'Array',
            },
          },
          populate: true,
          populatePaths,
        },
      );
    }

    return this.internshipRequestModel.find().populate(populatePaths).exec();
  }

  findOne(id: string) {
    return this.internshipRequestModel
      .findById(id)
      .populate(populatePaths)
      .exec();
  }

  update(id: string, updateInternshipRequestDto: UpdateInternshipRequestDto) {
    return this.internshipRequestModel
      .findByIdAndUpdate(id, updateInternshipRequestDto, { new: true })
      .populate(populatePaths)
      .exec();
  }

  remove(id: string) {
    return this.internshipRequestModel.findByIdAndDelete(id).exec();
  }

  async count(query: InternshipRequestsQueryParams) {
    if (Object.keys(query).length) {
      const documentsFound = await this.queryParams.execute(
        this.internshipRequestModel,
        query,
        {
          paths: {
            province: 'province.value',
            candidate: 'candidate._id',
            email: 'candidate.email',
            firstName: 'candidate.firstName',
            lastName: 'candidate.lastName',
            internshipType: 'internshipType.value',
            skills: {
              path: 'candidate.skills',
              type: 'Array',
            },
          },
          populate: false,
        },
      );

      return documentsFound.length;
    }

    return this.internshipRequestModel.countDocuments().exec();
  }
}
