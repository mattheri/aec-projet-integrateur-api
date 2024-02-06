import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Enterprise } from 'src/enterprises/schema/enterprises.schema';
import { InternshipType } from 'src/internship-types/schema/internship-types.schema';
import { Province } from 'src/provinces/schema/provinces.schema';

export type InternshipOfferDocument = HydratedDocument<InternshipOffer>;

@Schema()
export class InternshipOffer {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Enterprise',
    required: true,
  })
  enterprise: Enterprise;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  weeklyWorkHours: number;

  @Prop({ required: false })
  salary: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: true,
  })
  province: Province;

  @Prop({ required: true, type: [String] })
  requiredSkills: string[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InternshipType',
  })
  internshipType: InternshipType;

  @Prop({ required: true })
  paid?: string;

  @Prop({ required: true })
  isActive: boolean;
}

export const InternshipOfferSchema =
  SchemaFactory.createForClass(InternshipOffer);
