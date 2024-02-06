import { Inject, Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Enterprise } from './schema/enterprises.schema';
import { Model } from 'mongoose';
import { ActivitySectorsService } from 'src/activity-sectors/activity-sectors.service';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectModel(Enterprise.name) private enterpriseModel: Model<Enterprise>,
    private activitySectorsService: ActivitySectorsService,
  ) {}

  async create(createEnterpriseDto: CreateEnterpriseDto) {
    let activitySector = createEnterpriseDto.activitySector;
    const activitySectorExists = await this.activitySectorsService.exists(
      createEnterpriseDto.activitySector.value,
    );

    if (!activitySectorExists) {
      activitySector = await this.activitySectorsService.create(
        createEnterpriseDto.activitySector,
      );
    }

    const createdEnterprise = new this.enterpriseModel({
      ...createEnterpriseDto,
      activitySector,
    });
    return createdEnterprise.save();
  }

  findAll() {
    return this.enterpriseModel.find().exec();
  }

  findOne(id: string) {
    return this.enterpriseModel.findById(id).exec();
  }

  update(id: string, updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.enterpriseModel
      .findByIdAndUpdate(id, updateEnterpriseDto, { new: true })
      .exec();
  }

  remove(id: string) {
    return this.enterpriseModel.findByIdAndDelete(id).exec();
  }
}
