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
import { EnterprisesService } from './enterprises.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { EnterpriseResponseDto } from './dto/enterprise-reponse.dto';

@Controller('enterprises')
export class EnterprisesController {
  constructor(private readonly enterprisesService: EnterprisesService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: EnterpriseResponseDto,
  })
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterprisesService.create(createEnterpriseDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [EnterpriseResponseDto] })
  findAll() {
    return this.enterprisesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: EnterpriseResponseDto })
  findOne(@Param('id') id: string) {
    return this.enterprisesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: EnterpriseResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.enterprisesService.update(id, updateEnterpriseDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: EnterpriseResponseDto })
  remove(@Param('id') id: string) {
    return this.enterprisesService.remove(id);
  }
}
