import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateHousingMaterialsDto {
  @ApiProperty()
  @IsString()
  materialType: string;

  @ApiProperty()
  @IsInt()
  @Min(1)
  distributedMaterials: number;

  @ApiProperty()
  @IsString()
  location: string;

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


