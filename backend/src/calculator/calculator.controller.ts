import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CalculatorService } from './calculator.service';
import { CalculatorStateDto } from './dto/calculator-state.dto';

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
    type: CalculatorStateDto 
  })
  @Get('state')
  async getState(@Request() req): Promise<CalculatorStateDto> {
    return this.calculatorService.getState(req.user.userId);
  }

  @ApiOperation({ summary: 'Update the calculator state' })
  @ApiResponse({ 
    status: 200, 
    description: 'Returns the updated calculator state', 
    type: CalculatorStateDto 
  })
  @Post('state')
  async updateState(
    @Request() req,
    @Body() updateDto: CalculatorStateDto,
  ): Promise<CalculatorStateDto> {
    return this.calculatorService.updateState(
      req.user.userId,
      updateDto.memory,
      updateDto.history,
    );
  }
} 