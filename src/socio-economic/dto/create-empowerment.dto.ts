import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateEmpowermentDto {
  @ApiProperty()
  @IsString()
  tailoringCenter: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  people: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  trainingDuration?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  materials?: string;

  @ApiProperty()
  @TransformDateNotFuture()
  date: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


