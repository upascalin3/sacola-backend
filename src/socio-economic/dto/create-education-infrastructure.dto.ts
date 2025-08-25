import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateEducationInfrastructureDto {
  @ApiProperty()
  @IsString()
  schoolName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  infrastructureType: string;

  @ApiProperty()
  @IsDateString()
  dateDonated: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


