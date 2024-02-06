import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Candidate } from 'src/candidates/schema/candidates.schema';
import { InternshipType } from 'src/internship-types/schema/internship-types.schema';
import { Province } from 'src/provinces/schema/provinces.schema';

export type InternshipRequestDocument = HydratedDocument<InternshipRequest>;

@Schema()
export class InternshipRequest {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  })
  candidate: Candidate;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  weeklyWorkHours: number;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: true,
  })
  province: Province;

  @Prop({ required: true, type: [String] })
  skills: string[];

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InternshipType',
  })
  internshipType: InternshipType;

  @Prop({ required: false })
  additionalInformation: string;

  @Prop({ required: true })
  isActive: boolean;
}

export const InternshipRequestSchema =
  SchemaFactory.createForClass(InternshipRequest);
