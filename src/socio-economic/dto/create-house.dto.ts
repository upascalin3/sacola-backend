import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

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
  @IsDateString()
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


