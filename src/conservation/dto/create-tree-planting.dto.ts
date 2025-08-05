import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional, IsEnum, IsArray } from 'class-validator';

class TreeSpeciesDto {
  @ApiProperty({ description: 'Name of the tree species' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Number of trees planted for this species' })
  @IsNumber()
  count: number;
}

export class CreateTreePlantingDto {
  @ApiProperty({ description: 'Location where trees were planted' })
  @IsString()
  location: string;

  @ApiProperty({ 
    description: 'Date when trees were planted',
    type: Date 
  })
  @IsDate()
  plantingDate: Date;

  @ApiProperty({ 
    description: 'Total number of trees planted',
    minimum: 1
  })
  @IsNumber()
  numberOfTrees: number;

  @ApiProperty({ 
    description: 'Total area covered by the plantation in hectares',
    minimum: 0.01
  })
  @IsNumber()
  area: number;

  @ApiProperty({ 
    description: 'List of tree species planted',
    type: [TreeSpeciesDto],
    required: false 
  })
  @IsArray()
  @IsOptional()
  species?: TreeSpeciesDto[];

  @ApiProperty({ 
    description: 'Status of the plantation',
    enum: ['planned', 'planted', 'maintained', 'harvested'],
    default: 'planted'
  })
  @IsString()
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
    description: 'Additional notes about the plantation',
    required: false 
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
