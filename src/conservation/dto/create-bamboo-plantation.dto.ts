import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateBambooPlantationDto {
  @ApiProperty({ description: 'Distance covered by the bamboo plantation' })
  @IsNumber()
  @Type(() => Number)
  distanceCovered: number;

  @ApiProperty({ description: 'Location of the bamboo plantation' })
  @IsString()
  location: string;

  @ApiProperty({ 
    description: 'Date when bamboo was planted',
    type: Date,
    example: '2024-01-15'
  })
  @TransformDateNotFuture()
  datePlanted: Date;

  @ApiProperty({ description: 'Description of the bamboo plantation project', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
