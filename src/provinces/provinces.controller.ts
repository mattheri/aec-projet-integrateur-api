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
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Province } from './entities/province.entity';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Province })
  create(@Body() createProvinceDto: CreateProvinceDto) {
    return this.provincesService.create(createProvinceDto);
  }

  @Post('populate')
  @ApiResponse({ status: HttpStatus.OK })
  populateWithDefaultValues() {
    return this.provincesService.populateWithDefaultValues();
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Province] })
  findAll() {
    return this.provincesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Province || null })
  findOne(@Param('id') id: string) {
    return this.provincesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Province || null })
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    return this.provincesService.update(id, updateProvinceDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.provincesService.remove(id);
  }
}
