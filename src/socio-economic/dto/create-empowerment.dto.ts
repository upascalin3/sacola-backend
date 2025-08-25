import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

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
  @IsDateString()
  date: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


