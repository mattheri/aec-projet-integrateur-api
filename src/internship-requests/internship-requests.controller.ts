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
import { InternshipRequestsService } from './internship-requests.service';
import { CreateInternshipRequestDto } from './dto/create-internship-request.dto';
import { UpdateInternshipRequestDto } from './dto/update-internship-request.dto';
import { ApiResponse } from '@nestjs/swagger';
import { InternshipRequestResponseDto } from './dto/internship-request-response.dto';
import { InternshipRequestsQueryParams } from './dto/internship-requests-query-params.dto';

@Controller('internship-requests')
export class InternshipRequestsController {
  constructor(
    private readonly internshipRequestsService: InternshipRequestsService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: InternshipRequestResponseDto,
  })
  create(@Body() createInternshipRequestDto: CreateInternshipRequestDto) {
    return this.internshipRequestsService.create(createInternshipRequestDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [InternshipRequestResponseDto] })
  findAll(@Query() query: InternshipRequestsQueryParams) {
    return this.internshipRequestsService.findAll(query);
  }

  @Get('count')
  @ApiResponse({ status: HttpStatus.OK, type: Number })
  count(@Query() query: InternshipRequestsQueryParams) {
    return this.internshipRequestsService.count(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: InternshipRequestResponseDto })
  findOne(@Param('id') id: string) {
    return this.internshipRequestsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: InternshipRequestResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateInternshipRequestDto: UpdateInternshipRequestDto,
  ) {
    return this.internshipRequestsService.update(
      id,
      updateInternshipRequestDto,
    );
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: InternshipRequestResponseDto })
  remove(@Param('id') id: string) {
    return this.internshipRequestsService.remove(id);
  }
}
