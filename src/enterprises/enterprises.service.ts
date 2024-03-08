import { Injectable } from '@nestjs/common';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Enterprise } from './schema/enterprises.schema';
import { Model } from 'mongoose';
import { ActivitySectorsService } from 'src/activity-sectors/activity-sectors.service';
import { populatePaths } from './enterprise.constants';
import { QueryParamsService } from 'src/query-params/query-params.service';
import { EnterpriseQueryParamsDto } from './dto/enterprise-query-params.dto';

@Injectable()
export class EnterprisesService {
  constructor(
    @InjectModel(Enterprise.name) private enterpriseModel: Model<Enterprise>,
    private activitySectorsService: ActivitySectorsService,
    private readonly queryParams: QueryParamsService<Model<Enterprise>>,
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
    const savedEnterprise = await createdEnterprise.save();

    return savedEnterprise.populate(populatePaths);
  }

  findAll(query: EnterpriseQueryParamsDto) {
    if (this.queryParams.queryIsNotEmpty(query)) {
      return this.queryParams.execute(this.enterpriseModel, query, {
        paths: {
          activitySector: 'activitySector.value',
          province: 'province.value',
        },
        populate: true,
        populatePaths,
      });
    }

    return this.enterpriseModel.find().populate(populatePaths).exec();
  }

  findOne(id: string) {
    return this.enterpriseModel.findById(id).populate(populatePaths).exec();
  }

  update(id: string, updateEnterpriseDto: UpdateEnterpriseDto) {
    return this.enterpriseModel
      .findByIdAndUpdate(id, updateEnterpriseDto, { new: true })
      .populate(populatePaths)
      .exec();
  }

  remove(id: string) {
    return this.enterpriseModel.findByIdAndDelete(id).exec();
  }

  async count(query: EnterpriseQueryParamsDto) {
    if (this.queryParams.queryIsNotEmpty(query)) {
      const documentsFound = await this.queryParams.execute(
        this.enterpriseModel,
        query,
        {
          paths: {
            activitySector: 'activitySector.value',
            province: 'province.value',
          },
          populate: false,
        },
      );

      return documentsFound.length;
    }

    return this.enterpriseModel.countDocuments().exec();
  }
}
