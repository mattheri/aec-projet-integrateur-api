import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ActivitySectorDocument = HydratedDocument<ActivitySector>;

@Schema()
export class ActivitySector {
  @Prop({ required: true, unique: true })
  value: string;
}

export const ActivitySectorSchema =
  SchemaFactory.createForClass(ActivitySector);
