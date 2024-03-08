import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';
import { CreateCandidateDto } from './dto/create-candidate.dto';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Candidate } from './entities/candidate.entity';
import { CandidateQueryParamsDto } from './dto/candidate-query-params.dto';

@Controller('candidates')
export class CandidatesController {
  constructor(private readonly candidatesService: CandidatesService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: Candidate })
  create(@Body() createCandidateDto: CreateCandidateDto) {
    return this.candidatesService.create(createCandidateDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [Candidate] })
  findAll(@Query() query: CandidateQueryParamsDto) {
    return this.candidatesService.findAll(query);
  }

  @Get('count')
  @ApiResponse({ status: HttpStatus.OK, type: Number })
  count(@Query() query: CandidateQueryParamsDto) {
    return this.candidatesService.count(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Candidate })
  findOne(@Param('id') id: string) {
    return this.candidatesService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Candidate })
  update(
    @Param('id') id: string,
    @Body() updateCandidateDto: UpdateCandidateDto,
  ) {
    return this.candidatesService.update(id, updateCandidateDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: Candidate })
  remove(@Param('id') id: string) {
    return this.candidatesService.remove(id);
  }
}
