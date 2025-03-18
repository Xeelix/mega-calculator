import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CalculatorService } from './calculator.service';
import { 
  CalculatorStateResponseDto, 
  CalculatorStateUpdateDto, 
  CalculateRequestDto,
  CalculationDto
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

  @ApiOperation({ summary: 'Perform a calculation and save it to history' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the result of the calculation and updated state', 
    type: CalculatorStateResponseDto 
  })
  @Post('calculate')
  async calculate(
    @Request() req,
    @Body() calculateDto: CalculateRequestDto,
  ): Promise<CalculatorStateResponseDto> {
    let result: number;
    try {
      // NOTE: I'm using eval for demonstration purposes. In a real app, it should be a safer evaluation method
      result = eval(calculateDto.expression);
    } catch (error) {
      result = NaN;
    }
    
    // Save calculation to history
    await this.calculatorService.addCalculation(
      req.user.userId, 
      calculateDto.expression, 
      result
    );
    
    // Update current expression with the result
    return this.calculatorService.updateState(
      req.user.userId,
      req.user.calculatorState?.memory || 0,
      result.toString()
    );
  }
} 