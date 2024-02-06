import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Province } from 'src/provinces/schema/provinces.schema';

export type CandidateDocument = HydratedDocument<Candidate>;

@Schema()
export class Candidate {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  city: string;

  @Prop({ type: [String], required: true })
  skills: string[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: true,
  })
  province: Province;

  @Prop({ required: true })
  postalCode: string;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
