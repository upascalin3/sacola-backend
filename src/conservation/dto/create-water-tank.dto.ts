import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsOptional } from 'class-validator';

export class CreateWaterTankDto {
  @ApiProperty({ description: 'Type of water tank' })
  @IsString()
  tankType: string;

  @ApiProperty({ description: 'Location where water tanks are installed' })
  @IsString()
  location: string;

  @ApiProperty({ description: 'Number of water tanks' })
  @IsNumber()
  numberOfTanks: number;

  @ApiProperty({ description: 'Date when water tanks were donated' })
  @IsDate()
  dateDonated: Date;

  @ApiProperty({ description: 'Description of the water tank project', required: false })
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
