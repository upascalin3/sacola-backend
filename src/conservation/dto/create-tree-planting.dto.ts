import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateTreePlantingDto {
  @ApiProperty({ description: 'Type of trees planted' })
  @IsString()
  treeType: string;

  @ApiProperty({ description: 'Location where trees were planted' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Number of trees planted' })
  @IsNumber()
  numberOfTrees: number;

  @ApiProperty({ description: 'Date when trees were planted' })
  @IsDate()
  datePlanted: Date;

  @ApiProperty({ description: 'Description of the tree planting project', required: false })
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
