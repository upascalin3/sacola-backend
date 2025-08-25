import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class GenerateReportDto {
  @ApiProperty({ enum: ['Conservation', 'Socio-Economic'] })
  @IsEnum(['Conservation', 'Socio-Economic'] as any)
  projectCategory: 'Conservation' | 'Socio-Economic';

  @ApiProperty()
  @IsString()
  projectType: string;

  @ApiProperty({ enum: ['Annual', 'Monthly', 'Custom'] })
  @IsEnum(['Annual', 'Monthly', 'Custom'] as any)
  reportType: 'Annual' | 'Monthly' | 'Custom';

  @ApiProperty()
  @IsDateString()
  dateRangeStart: Date;

  @ApiProperty()
  @IsDateString()
  dateRangeEnd: Date;
}


