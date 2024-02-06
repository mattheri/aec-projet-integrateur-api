import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateActivitySectorDto } from './dto/create-activity-sector.dto';
import { UpdateActivitySectorDto } from './dto/update-activity-sector.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ActivitySector } from './entities/activity-sector.entity';
import { Model } from 'mongoose';

@Injectable()
export class ActivitySectorsService {
  constructor(
    @InjectModel(ActivitySector.name)
    private activitySectionModel: Model<ActivitySector>,
  ) {}

  async create(
    createActivitySectorDto: CreateActivitySectorDto,
  ): Promise<ActivitySector> {
    const exists = await this.activitySectionModel.exists({
      value: createActivitySectorDto.value,
    });

    if (exists)
      throw new HttpException(
        'Activity Sector already exists',
        HttpStatus.BAD_REQUEST,
      );

    const createdActivitySector = new this.activitySectionModel(
      createActivitySectorDto,
    );
    return createdActivitySector.save();
  }

  findAll(): Promise<ActivitySector[]> {
    return this.activitySectionModel.find().exec();
  }

  findOne(id: string): Promise<ActivitySector | null> {
    const activitySector = this.activitySectionModel.findById(id).exec();
    if (!activitySector) {
      return null;
    }
    return activitySector;
  }

  update(
    id: string,
    updateActivitySectorDto: UpdateActivitySectorDto,
  ): Promise<ActivitySector | null> {
    const activitySector = this.activitySectionModel
      .findByIdAndUpdate(id, updateActivitySectorDto, { new: true })
      .exec();
    if (!activitySector) {
      return null;
    }
    return activitySector;
  }

  remove(id: string) {
    return this.activitySectionModel.findByIdAndDelete(id).exec();
  }

  async exists(value: string): Promise<boolean> {
    return !!(await this.activitySectionModel.exists({ value }));
  }
}
