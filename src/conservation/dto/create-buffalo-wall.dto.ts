import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional, IsEnum } from 'class-validator';

export class CreateBuffaloWallDto {
  @ApiProperty({ description: 'Location where the buffalo wall is built' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Length of the buffalo wall in meters' })
  @IsNumber()
  length: number;

  @ApiProperty({ description: 'Date when the wall was built' })
  @IsDate()
  dateBuilt: Date;

  @ApiProperty({ 
    description: 'Status of the buffalo wall',
    enum: ['planned', 'in_progress', 'completed', 'maintenance_required'],
    default: 'completed'
  })
  @IsString()
  status: string;

  @ApiProperty({ 
    description: 'Number of beneficiaries',
    required: false,
    default: 0
  })
  @IsNumber()
  @IsOptional()
  beneficiaryCount?: number;

  @ApiProperty({ 
    description: 'Additional notes about the buffalo wall',
    required: false 
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({ 
    description: 'Name of the implementing organization',
    required: false 
  })
  @IsString()
  @IsOptional()
  implementingOrganization?: string;
}
