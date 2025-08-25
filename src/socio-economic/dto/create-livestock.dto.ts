import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateLivestockDto {
  @ApiProperty()
  @IsString()
  animalType: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  distributedAnimals: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  deaths: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  soldAnimals: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  transferredAnimals: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  currentlyOwned: number;

  @ApiProperty()
  @IsDateString()
  dateDonated: Date;

  @ApiProperty()
  @IsInt()
  @Min(0)
  targetBeneficiaries: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  currentBeneficiaries: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


