import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateSupportedStudentDto {
  @ApiProperty()
  @IsString()
  studentName: string;

  @ApiProperty()
  @IsString()
  studentLocation: string;

  @ApiProperty()
  @IsString()
  schoolName: string;

  @ApiProperty()
  @IsString()
  schoolLocation: string;

  @ApiProperty()
  @IsString()
  class: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  fundingYears: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  supportAmount: number;

  @ApiProperty()
  @TransformDateNotFuture()
  date: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


