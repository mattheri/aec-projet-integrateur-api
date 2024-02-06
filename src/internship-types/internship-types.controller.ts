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
import { InternshipTypesService } from './internship-types.service';
import { CreateInternshipTypeDto } from './dto/create-internship-type.dto';
import { UpdateInternshipTypeDto } from './dto/update-internship-type.dto';
import { ApiResponse } from '@nestjs/swagger';
import { InternshipType } from './entities/internship-type.entity';

@Controller('internship-types')
export class InternshipTypesController {
  constructor(
    private readonly internshipTypesService: InternshipTypesService,
  ) {}

  @Post()
  @ApiResponse({ type: InternshipType, status: HttpStatus.CREATED })
  create(@Body() createInternshipTypeDto: CreateInternshipTypeDto) {
    return this.internshipTypesService.create(createInternshipTypeDto);
  }

  @Get()
  @ApiResponse({ type: [InternshipType], status: HttpStatus.OK })
  findAll() {
    return this.internshipTypesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ type: InternshipType, status: HttpStatus.OK })
  findOne(@Param('id') id: string) {
    return this.internshipTypesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ type: InternshipType, status: HttpStatus.OK })
  update(
    @Param('id') id: string,
    @Body() updateInternshipTypeDto: UpdateInternshipTypeDto,
  ) {
    return this.internshipTypesService.update(id, updateInternshipTypeDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.internshipTypesService.remove(id);
  }
}
