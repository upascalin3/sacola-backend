import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateBambooPlantationDto {
  @ApiProperty({ description: 'Distance covered by the bamboo plantation' })
  @IsNumber()
  distanceCovered: number;

  @ApiProperty({ description: 'Location of the bamboo plantation' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Date when bamboo was planted' })
  @IsDate()
  datePlanted: Date;

  @ApiProperty({ description: 'Description of the bamboo plantation project', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
