import { Controller, Get, Post, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CalculatorService } from './calculator.service';
import { 
  CalculatorStateResponseDto, 
  CalculatorStateUpdateDto, 
  CalculationResultDto
} from './dto/calculator-state.dto';

@ApiTags('calculator')
@ApiBearerAuth('access-token')
@Controller('calculator')
@UseGuards(JwtAuthGuard)
export class CalculatorController {
  constructor(private calculatorService: CalculatorService) {}

  @ApiOperation({ summary: 'Get the current calculator state' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the current calculator state', 
    type: CalculatorStateResponseDto 
  })
  @Get('state')
  async getState(@Request() req): Promise<CalculatorStateResponseDto> {
    return this.calculatorService.getState(req.user.userId);
  }

  @ApiOperation({ summary: 'Update the calculator state' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the updated calculator state', 
    type: CalculatorStateResponseDto 
  })
  @Post('state')
  async updateState(
    @Request() req,
    @Body() updateDto: CalculatorStateUpdateDto,
  ): Promise<CalculatorStateResponseDto> {
    return this.calculatorService.updateState(
      req.user.userId,
      updateDto.memory,
      updateDto.currentExpression
    );
  }

  @ApiOperation({ summary: 'Save a calculation result to history' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the updated calculator state', 
    type: CalculatorStateResponseDto 
  })
  @Post('save-calculation')
  async saveCalculation(
    @Request() req,
    @Body() calculationResult: CalculationResultDto,
  ): Promise<CalculatorStateResponseDto> {
    // Save calculation to history
    await this.calculatorService.addCalculation(
      req.user.userId, 
      calculationResult.expression, 
      calculationResult.result
    );
    
    // Update current expression with the result
    return this.calculatorService.updateState(
      req.user.userId,
      req.user.calculatorState?.memory || 0,
      calculationResult.result.toString()
    );
  }

  @ApiOperation({ summary: 'Clear calculation history' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the updated calculator state with empty history', 
    type: CalculatorStateResponseDto 
  })
  @Delete('history')
  async clearHistory(@Request() req): Promise<CalculatorStateResponseDto> {
    return this.calculatorService.clearHistory(req.user.userId);
  }
} 