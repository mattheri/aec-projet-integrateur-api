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
import { InternshipOffersService } from './internship-offers.service';
import { CreateInternshipOfferDto } from './dto/create-internship-offer.dto';
import { UpdateInternshipOfferDto } from './dto/update-internship-offer.dto';
import { ApiResponse } from '@nestjs/swagger';
import { InternshipOfferResponseDto } from './dto/internship-offer-response.dto';
import { InternshipOffersQueryParamsDto } from './dto/internship-offers-query-params.dto';

@Controller('internship-offers')
export class InternshipOffersController {
  constructor(
    private readonly internshipOffersService: InternshipOffersService,
  ) {}

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, type: InternshipOfferResponseDto })
  create(@Body() createInternshipOfferDto: CreateInternshipOfferDto) {
    return this.internshipOffersService.create(createInternshipOfferDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [InternshipOfferResponseDto] })
  findAll(@Query() query: InternshipOffersQueryParamsDto) {
    return this.internshipOffersService.findAll(query);
  }

  @Get('count')
  @ApiResponse({ status: HttpStatus.OK, type: Number })
  count(@Query() query: InternshipOffersQueryParamsDto) {
    return this.internshipOffersService.count(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: InternshipOfferResponseDto })
  findOne(@Param('id') id: string) {
    return this.internshipOffersService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, type: InternshipOfferResponseDto })
  update(
    @Param('id') id: string,
    @Body() updateInternshipOfferDto: UpdateInternshipOfferDto,
  ) {
    return this.internshipOffersService.update(id, updateInternshipOfferDto);
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: InternshipOfferResponseDto })
  remove(@Param('id') id: string) {
    return this.internshipOffersService.remove(id);
  }
}
