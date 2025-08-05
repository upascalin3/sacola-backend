import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional, IsArray, IsEnum } from 'class-validator';

class ProjectPartnerDto {
  @ApiProperty({ description: 'Name of the partner organization' })
  @IsString()
  name: string;

  @ApiProperty({ 
    description: 'Role of the partner in the project',
    required: false 
  })
  @IsString()
  @IsOptional()
  role?: string;

  @ApiProperty({ 
    description: 'Contribution amount from this partner',
    required: false 
  })
  @IsNumber()
  @IsOptional()
  contribution?: number;
}

export class CreateEUFundedProjectDto {
  @ApiProperty({ description: 'Name of the EU-funded project' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Description of the project' })
  @IsString()
  description: string;

  @ApiProperty({ 
    description: 'EU project reference number',
    required: false 
  })
  @IsString()
  @IsOptional()
  referenceNumber?: string;

  @ApiProperty({ 
    description: 'Start date of the project',
    type: Date 
  })
  @IsDate()
  startDate: Date;

  @ApiProperty({ 
    description: 'End date of the project',
    type: Date 
  })
  @IsDate()
  endDate: Date;

  @ApiProperty({ 
    description: 'Total budget of the project in EUR',
    minimum: 0 
  })
  @IsNumber()
  totalBudget: number;

  @ApiProperty({ 
    description: 'EU contribution amount in EUR',
    minimum: 0 
  })
  @IsNumber()
  euContribution: number;

  @ApiProperty({ 
    description: 'List of project partners',
    type: [ProjectPartnerDto],
    required: false 
  })
  @IsArray()
  @IsOptional()
  partners?: ProjectPartnerDto[];

  @ApiProperty({ 
    description: 'Project objectives',
    type: [String],
    required: false 
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  objectives?: string[];

  @ApiProperty({ 
    description: 'Expected outcomes',
    type: [String],
    required: false 
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  expectedOutcomes?: string[];

  @ApiProperty({ 
    description: 'Project status',
    enum: ['proposed', 'approved', 'ongoing', 'completed', 'cancelled'],
    default: 'proposed'
  })
  @IsString()
  status: string;

  @ApiProperty({ 
    description: 'Geographic scope of the project',
    required: false 
  })
  @IsString()
  @IsOptional()
  geographicScope?: string;

  @ApiProperty({ 
    description: 'Name of the EU program funding the project',
    required: false 
  })
  @IsString()
  @IsOptional()
  euProgram?: string;

  @ApiProperty({ 
    description: 'Contact person for the project',
    required: false 
  })
  @IsString()
  @IsOptional()
  contactPerson?: string;

  @ApiProperty({ 
    description: 'Contact email for the project',
    required: false 
  })
  @IsString()
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({ 
    description: 'Project website URL',
    required: false 
  })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ 
    description: 'Additional notes about the project',
    required: false 
  })
  @IsString()
  @IsOptional()
  notes?: string;
}
