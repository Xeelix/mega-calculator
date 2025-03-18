import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString } from 'class-validator';

export class CalculatorStateDto {
  @ApiProperty({
    description: 'Memory value of the calculator',
    example: 42,
  })
  @IsNumber()
  memory: number;

  @ApiProperty({
    description: 'History of calculations',
    example: ['5+5=10', '10*2=20'],
    isArray: true,
    type: String,
  })
  @IsArray()
  @IsString({ each: true })
  history: string[];
} 