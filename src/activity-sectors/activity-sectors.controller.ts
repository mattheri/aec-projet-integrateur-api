import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ActivitySectorsService } from './activity-sectors.service';
import { CreateActivitySectorDto } from './dto/create-activity-sector.dto';
import { UpdateActivitySectorDto } from './dto/update-activity-sector.dto';
import { ActivitySector } from './entities/activity-sector.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('activity-sectors')
export class ActivitySectorsController {
  constructor(
    private readonly activitySectorsService: ActivitySectorsService,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: ActivitySector })
  create(
    @Body() createActivitySectorDto: CreateActivitySectorDto,
  ): Promise<ActivitySector> {
    return this.activitySectorsService.create(createActivitySectorDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [ActivitySector] })
  findAll() {
    return this.activitySectorsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ActivitySector || null })
  findOne(@Param('id') id: string) {
    return this.activitySectorsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ActivitySector || null })
  update(
    @Param('id') id: string,
    @Body() updateActivitySectorDto: UpdateActivitySectorDto,
  ) {
    return this.activitySectorsService.update(id, updateActivitySectorDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.activitySectorsService.remove(id);
  }
}
