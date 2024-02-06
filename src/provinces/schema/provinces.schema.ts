import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProvinceDocument = HydratedDocument<Province>;

@Schema()
export class Province {
  @Prop({ required: true, unique: true })
  value: string;
}

export const ProvinceSchema = SchemaFactory.createForClass(Province);
