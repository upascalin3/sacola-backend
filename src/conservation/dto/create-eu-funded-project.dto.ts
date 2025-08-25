import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateEUFundedProjectDto {
  @ApiProperty({ description: 'District where the project is located' })
  @IsString()
  district: string;

  @ApiProperty({ description: 'Location of the project' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Number of trees planted' })
  @IsNumber()
  numberOfTrees: number;

  @ApiProperty({ description: 'Date when trees were planted' })
  @IsDate()
  datePlanted: Date;

  @ApiProperty({ description: 'Description of the EU-funded project', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Target number of beneficiaries' })
  @IsNumber()
  targetBeneficiaries: number;

  @ApiProperty({ description: 'Current number of beneficiaries' })
  @IsNumber()
  currentBeneficiaries: number;
}
