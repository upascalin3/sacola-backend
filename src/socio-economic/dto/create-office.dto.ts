import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateOfficeDto {
  @ApiProperty()
  @IsString()
  officeName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @TransformDateNotFuture()
  dateBuilt: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


