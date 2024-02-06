import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Province } from './schema/provinces.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectModel(Province.name) private provinceModel: Model<Province>,
  ) {}

  async create(createProvinceDto: CreateProvinceDto) {
    const exists = await this.provinceModel.exists({
      value: createProvinceDto.value,
    });

    if (exists)
      throw new HttpException(
        'Province already exists',
        HttpStatus.BAD_REQUEST,
      );

    const createdProvince = new this.provinceModel(createProvinceDto);
    return createdProvince.save();
  }

  findAll() {
    return this.provinceModel.find().exec();
  }

  findOne(id: string) {
    return this.provinceModel.findById(id).exec();
  }

  update(id: string, updateProvinceDto: UpdateProvinceDto) {
    return this.provinceModel
      .findByIdAndUpdate(id, updateProvinceDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.provinceModel.findByIdAndDelete(id).exec();
  }
}
