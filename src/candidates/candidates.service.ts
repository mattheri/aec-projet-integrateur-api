import { Injectable } from '@nestjs/common';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Candidate } from './schema/candidates.schema';
import { Model } from 'mongoose';
import { populatePaths } from './candidate.constants';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectModel(Candidate.name) private candidateModel: Model<Candidate>,
  ) {}

  async create(createCandidateDto: CreateCandidateDto) {
    const createdCandidate = new this.candidateModel(createCandidateDto);
    const created = await createdCandidate.save();

    return created.populate(populatePaths);
  }

  findAll() {
    return this.candidateModel.find().populate(populatePaths).exec();
  }

  findOne(id: string) {
    return this.candidateModel.findById(id).populate(populatePaths).exec();
  }

  update(id: string, updateCandidateDto: UpdateCandidateDto) {
    return this.candidateModel
      .findByIdAndUpdate(id, updateCandidateDto, { new: true })
      .populate(populatePaths)
      .exec();
  }

  remove(id: string) {
    return this.candidateModel.findByIdAndDelete(id).exec();
  }
}
