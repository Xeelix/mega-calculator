import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalculatorStateDocument = CalculatorState & Document;

@Schema()
export class CalculatorState {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  memory: number;

  @Prop({ type: [String], default: [] })
  history: string[];
}

export const CalculatorStateSchema = SchemaFactory.createForClass(CalculatorState); 