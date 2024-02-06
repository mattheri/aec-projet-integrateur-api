import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './schema/candidates.schema';
import { Model } from 'mongoose';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectModel(Candidate.name) private candidateModel: Model<Candidate>,
  ) {}

  create(createCandidateDto: CreateCandidateDto) {
    const createdCandidate = new this.candidateModel(createCandidateDto);
    return createdCandidate.save();
  }

  findAll() {
    return this.candidateModel.find().exec();
  }

  findOne(id: string) {
    return this.candidateModel.findById(id).exec();
  }

  update(id: string, updateCandidateDto: UpdateCandidateDto) {
    return this.candidateModel
      .findByIdAndUpdate(id, updateCandidateDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.candidateModel.findByIdAndDelete(id).exec();
  }
}
