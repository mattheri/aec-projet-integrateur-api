import { Injectable } from '@nestjs/common';
import { CreateInternshipRequestDto } from './dto/create-internship-request.dto';
import { UpdateInternshipRequestDto } from './dto/update-internship-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InternshipRequest } from './schema/internship-requests.schema';
import { Model } from 'mongoose';

@Injectable()
export class InternshipRequestsService {
  constructor(
    @InjectModel(InternshipRequest.name)
    private internshipRequestModel: Model<InternshipRequest>,
  ) {}

  create(createInternshipRequestDto: CreateInternshipRequestDto) {
    const createdInternshipRequest = new this.internshipRequestModel(
      createInternshipRequestDto,
    );
    return createdInternshipRequest.save();
  }

  findAll() {
    return this.internshipRequestModel.find().exec();
  }

  findOne(id: string) {
    return this.internshipRequestModel.findById(id).exec();
  }

  update(id: string, updateInternshipRequestDto: UpdateInternshipRequestDto) {
    return this.internshipRequestModel
      .findByIdAndUpdate(id, updateInternshipRequestDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.internshipRequestModel.findByIdAndDelete(id).exec();
  }
}
