import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CalculatorStateUpdateDto {
  @ApiProperty({
    description: 'Memory value of the calculator',
    example: 42,
  })
  @IsNumber()
  memory: number;

  @ApiProperty({
    description: 'Current expression in the calculator',
    example: '3+4',
  })
  @IsString()
  currentExpression: string;
}

export class CalculationDto {
  @ApiProperty({
    description: 'The expression to evaluate',
    example: '5+5',
  })
  @IsString()
  expression: string;

  @ApiProperty({
    description: 'The result of the calculation',
    example: 10,
  })
  @IsNumber()
  result: number;

  @ApiProperty({
    description: 'Timestamp of the calculation',
    example: '2023-11-15T14:30:00Z',
  })
  timestamp: Date;
}

export class CalculatorStateResponseDto {
  @ApiProperty({
    description: 'Memory value of the calculator',
    example: 42,
  })
  memory: number;

  @ApiProperty({
    description: 'Current expression in the calculator',
    example: '3+4',
  })
  currentExpression: string;

  @ApiProperty({
    description: 'History of calculations',
    type: [CalculationDto],
  })
  history: CalculationDto[];
}

export class CalculateRequestDto {
  @ApiProperty({
    description: 'The expression to calculate',
    example: '5+5',
  })
  @IsString()
  expression: string;
}

export class CalculationResultDto {
  @ApiProperty({
    description: 'The expression that was calculated',
    example: '5+5',
  })
  @IsString()
  expression: string;

  @ApiProperty({
    description: 'The result of the calculation',
    example: 10,
  })
  @IsNumber()
  result: number;
}
