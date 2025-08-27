import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateSportsDto } from './create-sports.dto';
import { IsOptional, IsString, Matches } from 'class-validator';

export class UpdateSportsDto extends PartialType(CreateSportsDto) {
  @ApiPropertyOptional({
    description: 'Date built (YYYY-MM-DD format)',
    example: '2024-01-15',
    format: 'date',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  dateBuilt?: string;
}


