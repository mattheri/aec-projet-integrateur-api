import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInternshipTypeDto } from './dto/create-internship-type.dto';
import { UpdateInternshipTypeDto } from './dto/update-internship-type.dto';
import { InjectModel } from '@nestjs/mongoose';
import { InternshipType } from './schema/internship-types.schema';
import { Model } from 'mongoose';
import { InternshipTypeEnum } from './internship-types.interface';

@Injectable()
export class InternshipTypesService {
  constructor(
    @InjectModel(InternshipType.name)
    private internshipTypeModel: Model<InternshipType>,
  ) {}

  async create(createInternshipTypeDto: CreateInternshipTypeDto) {
    const exists = await this.internshipTypeModel.exists({
      value: createInternshipTypeDto.value,
    });

    if (exists)
      throw new HttpException(
        'Internship Type already exists',
        HttpStatus.BAD_REQUEST,
      );

    const createdInternshipType = new this.internshipTypeModel(
      createInternshipTypeDto,
    );
    return createdInternshipType.save();
  }

  findAll() {
    return this.internshipTypeModel.find().exec();
  }

  findOne(id: string) {
    return this.internshipTypeModel.findById(id).exec();
  }

  update(id: string, updateInternshipTypeDto: UpdateInternshipTypeDto) {
    return this.internshipTypeModel
      .findByIdAndUpdate(id, updateInternshipTypeDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.internshipTypeModel.findByIdAndDelete(id).exec();
  }

  populateWithDefaultValues() {
    const InternshipTypes = Object.values(InternshipTypeEnum);

    return Promise.allSettled(
      InternshipTypes.map((internshipType) =>
        this.create({ value: internshipType }),
      ),
    );
  }
}
