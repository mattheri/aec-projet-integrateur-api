import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ActivitySector } from 'src/activity-sectors/schema/activity-sectors.schema';
import { Province } from 'src/provinces/schema/provinces.schema';

export type EnterpriseDocument = HydratedDocument<Enterprise>;

@Schema()
export class Enterprise {
  @Prop({ required: false })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  city: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    required: true,
  })
  province: Province;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActivitySector',
    required: true,
  })
  activitySector: ActivitySector;

  @Prop({ required: false })
  website: string;
}

export const EnterpriseSchema = SchemaFactory.createForClass(Enterprise);
