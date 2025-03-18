import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CalculationDocument = Calculation & Document;

@Schema()
export class Calculation {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  expression: string;

  @Prop({ required: true })
  result: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const CalculationSchema = SchemaFactory.createForClass(Calculation); 