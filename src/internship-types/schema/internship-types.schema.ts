import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type InternshipTypeDocument = HydratedDocument<InternshipType>;

@Schema()
export class InternshipType {
  @Prop({ required: true, unique: true })
  value: string;
}

export const InternshipTypeSchema =
  SchemaFactory.createForClass(InternshipType);
