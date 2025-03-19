import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class CalculatorState {
  @Prop({ default: 0 })
  memory: number;

  @Prop({ default: '' })
  currentExpression: string;
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: CalculatorState,
    default: () => ({ memory: 0, currentExpression: '' }),
  })
  calculatorState: CalculatorState;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
