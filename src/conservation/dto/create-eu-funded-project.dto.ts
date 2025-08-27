import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateEUFundedProjectDto {
  @ApiProperty({ description: 'District where the project is located' })
  @IsString()
  district: string;

  @ApiProperty({ description: 'Location of the project' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Number of trees planted' })
  @IsNumber()
  @Type(() => Number)
  numberOfTrees: number;

  @ApiProperty({ 
    description: 'Date when trees were planted',
    type: Date,
    example: '2024-01-15'
  })
  @TransformDateNotFuture()
  datePlanted: Date;

  @ApiProperty({ description: 'Description of the EU-funded project', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Target number of beneficiaries' })
  @IsNumber()
  @Type(() => Number)
  targetBeneficiaries: number;

  @ApiProperty({ description: 'Current number of beneficiaries' })
  @IsNumber()
  @Type(() => Number)
  currentBeneficiaries: number;
}
