import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsNumber, IsDateString, IsString, IsUUID, IsUrl, MaxLength, Min } from 'class-validator';
import { WaterTankType, WaterTankStatus } from '../entities/water-tank.entity';

export class UpdateWaterTankDto {
  @ApiPropertyOptional({
    description: 'Type of the water tank',
    enum: WaterTankType,
  })
  @IsEnum(WaterTankType)
  @IsOptional()
  type?: WaterTankType;

  @ApiPropertyOptional({
    description: 'ID of the associated conservation project',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsOptional()
  projectId?: string;

  @ApiPropertyOptional({
    description: 'Capacity of the water tank in liters',
    example: 5000,
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  @IsOptional()
  capacityLiters?: number;

  @ApiPropertyOptional({
    description: 'Latitude coordinate of the water tank location',
    example: -1.2921,
  })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate of the water tank location',
    example: 36.8219,
  })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiPropertyOptional({
    description: 'Detailed location description',
    example: 'Near the community center, next to the main road',
    maxLength: 500,
  })
  @IsString()
  @MaxLength(500)
  @IsOptional()
  locationDescription?: string;

  @ApiPropertyOptional({
    description: 'Date when the water tank was installed (ISO 8601 format)',
    example: '2023-01-15',
  })
  @IsDateString()
  @IsOptional()
  installationDate?: Date;

  @ApiPropertyOptional({
    description: 'Current status of the water tank',
    enum: WaterTankStatus,
  })
  @IsEnum(WaterTankStatus)
  @IsOptional()
  status?: WaterTankStatus;

  @ApiPropertyOptional({
    description: 'Additional notes about the water tank',
    example: 'Needs regular cleaning every 3 months',
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({
    description: 'Name or identifier of the person who installed the tank',
    example: 'John Doe',
    maxLength: 100,
  })
  @IsString()
  @MaxLength(100)
  @IsOptional()
  installedBy?: string;

  @ApiPropertyOptional({
    description: 'Photo URL of the water tank',
    example: 'https://example.com/photos/water-tank-1.jpg',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(255)
  photoUrl?: string;

  @ApiPropertyOptional({
    description: 'Date of last maintenance',
    example: '2023-06-15',
  })
  @IsDateString()
  @IsOptional()
  lastMaintenanceDate?: Date;
}
