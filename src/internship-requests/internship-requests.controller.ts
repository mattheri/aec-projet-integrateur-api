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
import { InternshipRequestsService } from './internship-requests.service';
import { CreateInternshipRequestDto } from './dto/create-internship-request.dto';
import { UpdateInternshipRequestDto } from './dto/update-internship-request.dto';
import { ApiResponse } from '@nestjs/swagger';
import { InternshipRequestResponseDto } from './dto/internship-request-response.dto';

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
  findAll() {
    return this.internshipRequestsService.findAll();
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
