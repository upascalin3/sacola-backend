import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateWaterPumpsDto {
  @ApiProperty()
  @IsString()
  pumpName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @TransformDateNotFuture()
  dateBuilt: Date;

  @ApiProperty()
  @IsString()
  pumpCondition: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


