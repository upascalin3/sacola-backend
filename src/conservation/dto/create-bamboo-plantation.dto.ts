import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional, IsEnum, IsArray } from 'class-validator';

class BambooSpeciesDto {
  @ApiProperty({ description: 'Name of the bamboo species' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Number of bamboo plants for this species' })
  @IsNumber()
  count: number;
}

export class CreateBambooPlantationDto {
  @ApiProperty({ description: 'Location of the bamboo plantation' })
  @IsString()
  location: string;

  @ApiProperty({ 
    description: 'Date when the bamboo was planted',
    type: Date 
  })
  @IsDate()
  plantingDate: Date;

  @ApiProperty({ 
    description: 'Total number of bamboo plants',
    minimum: 1
  })
  @IsNumber()
  numberOfPlants: number;

  @ApiProperty({ 
    description: 'Total area covered by the plantation in hectares',
    minimum: 0.01
  })
  @IsNumber()
  area: number;

  @ApiProperty({ 
    description: 'List of bamboo species planted',
    type: [BambooSpeciesDto],
    required: false 
  })
  @IsArray()
  @IsOptional()
  species?: BambooSpeciesDto[];

  @ApiProperty({ 
    description: 'Status of the plantation',
    enum: ['planned', 'planted', 'maintained', 'harvested'],
    default: 'planted'
  })
  @IsString()
  @IsEnum(['planned', 'planted', 'maintained', 'harvested'])
  status: string;

  @ApiProperty({ 
    description: 'Estimated survival rate percentage (0-100)',
    minimum: 0,
    maximum: 100,
    required: false
  })
  @IsNumber()
  @IsOptional()
  survivalRate?: number;

  @ApiProperty({ 
    description: 'Name of the organization responsible',
    required: false 
  })
  @IsString()
  @IsOptional()
  organization?: string;

  @ApiProperty({ 
    description: 'GPS coordinates of the plantation (latitude,longitude)',
    example: '-1.2921,36.8219',
    required: false
  })
  @IsString()
  @IsOptional()
  coordinates?: string;

  @ApiProperty({ 
    description: 'Intended use of the bamboo',
    enum: ['erosion_control', 'construction', 'handicraft', 'other'],
    required: false
  })
  @IsString()
  @IsEnum(['erosion_control', 'construction', 'handicraft', 'other'])
  @IsOptional()
  intendedUse?: string;

  @ApiProperty({ 
    description: 'Additional notes about the plantation',
    required: false 
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
