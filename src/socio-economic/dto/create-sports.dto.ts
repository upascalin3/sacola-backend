import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateSportsDto {
  @ApiProperty()
  @IsString()
  sportName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  condition: string;

  @ApiProperty({ 
    description: 'Date built (YYYY-MM-DD format)',
    example: '2024-01-15',
    format: 'date',
    type: String
  })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  dateBuilt: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


