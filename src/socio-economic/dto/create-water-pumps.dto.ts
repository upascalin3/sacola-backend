import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateWaterPumpsDto {
  @ApiProperty()
  @IsString()
  pumpName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsDateString()
  dateBuilt: Date;

  @ApiProperty()
  @IsString()
  pumpCondition: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


