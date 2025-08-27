import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateVillageHousingDto {
  @ApiProperty()
  @IsString()
  villageName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  numHouses: number;

  @ApiProperty()
  @TransformDateNotFuture()
  date: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


