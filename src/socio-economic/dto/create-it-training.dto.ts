import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateITTrainingDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  numPeople: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  materials?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  trainingDuration?: number;

  @ApiProperty()
  @TransformDateNotFuture()
  date: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


