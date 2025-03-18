import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CalculatorService } from './calculator.service';
import { CalculatorController } from './calculator.controller';
import { CalculatorState, CalculatorStateSchema } from './schemas/calculator-state.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CalculatorState.name, schema: CalculatorStateSchema }]),
  ],
  controllers: [CalculatorController],
  providers: [CalculatorService],
})
export class CalculatorModule {} 