import { Injectable } from '@nestjs/common';
import { CreateInternshipRequestDto } from './dto/create-internship-request.dto';
import { UpdateInternshipRequestDto } from './dto/update-internship-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InternshipRequest } from './schema/internship-requests.schema';
import { Model } from 'mongoose';
import { populatePaths } from './internship-requests.constants';

@Injectable()
export class InternshipRequestsService {
  constructor(
    @InjectModel(InternshipRequest.name)
    private internshipRequestModel: Model<InternshipRequest>,
  ) {}

  async create(createInternshipRequestDto: CreateInternshipRequestDto) {
    const createdInternshipRequest = new this.internshipRequestModel(
      createInternshipRequestDto,
    );
    const created = await createdInternshipRequest.save();
    return created.populate(populatePaths);
  }

  findAll() {
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
}
