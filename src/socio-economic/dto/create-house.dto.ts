import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateHouseDto {
  @ApiProperty()
  @IsString()
  houseCategory: string;

  @ApiProperty()
  @IsString()
  houseOwner: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @TransformDateNotFuture()
  dateBuilt: Date;

  @ApiProperty()
  @IsString()
  houseCondition: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  materials?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


