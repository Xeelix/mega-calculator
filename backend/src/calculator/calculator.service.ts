import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CalculatorState, CalculatorStateDocument } from './schemas/calculator-state.schema';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectModel(CalculatorState.name) private calculatorStateModel: Model<CalculatorStateDocument>,
  ) {}

  async getState(userId: string): Promise<CalculatorState> {
    let state = await this.calculatorStateModel.findOne({ userId }).exec();
    if (!state) {
      state = await this.calculatorStateModel.create({ userId, memory: 0, history: [] });
    }
    return state;
  }

  async updateState(userId: string, memory: number, history: string[]): Promise<CalculatorState> {
    return this.calculatorStateModel.findOneAndUpdate(
      { userId },
      { memory, history },
      { new: true, upsert: true },
    ).exec();
  }
} 