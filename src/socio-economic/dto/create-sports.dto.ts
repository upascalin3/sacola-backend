import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateSportsDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  condition: string;

  @ApiProperty()
  @TransformDateNotFuture()
  dateBuilt: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


