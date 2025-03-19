import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../auth/schemas/user.schema';
import { Calculation, CalculationDocument } from './schemas/calculation.schema';

@Injectable()
export class CalculatorService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Calculation.name)
    private calculationModel: Model<CalculationDocument>,
  ) {}

  async getState(userId: string) {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    const calculationHistory = await this.calculationModel
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(10)
      .exec();

    return {
      memory: user.calculatorState.memory,
      currentExpression: user.calculatorState.currentExpression,
      history: calculationHistory.map((calc) => ({
        expression: calc.expression,
        result: calc.result,
        timestamp: calc.timestamp,
      })),
    };
  }

  async updateState(userId: string, memory: number, currentExpression: string) {
    const user = await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          'calculatorState.memory': memory,
          'calculatorState.currentExpression': currentExpression,
        },
        { new: true },
      )
      .exec();

    if (!user) {
      throw new Error('User not found');
    }

    const calculationHistory = await this.calculationModel
      .find({ userId })
      .sort({ timestamp: -1 })
      .limit(10)
      .exec();

    return {
      memory: user.calculatorState.memory,
      currentExpression: user.calculatorState.currentExpression,
      history: calculationHistory.map((calc) => ({
        expression: calc.expression,
        result: calc.result,
        timestamp: calc.timestamp,
      })),
    };
  }

  async addCalculation(userId: string, expression: string, result: number) {
    const calculation = await this.calculationModel.create({
      userId,
      expression,
      result,
      timestamp: new Date(),
    });

    return calculation;
  }

  async clearHistory(userId: string) {
    await this.calculationModel.deleteMany({ userId }).exec();

    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }

    return {
      memory: user.calculatorState.memory,
      currentExpression: user.calculatorState.currentExpression,
      history: [],
    };
  }
}
