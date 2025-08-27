import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateEducationInfrastructureDto {
  @ApiProperty()
  @IsString()
  schoolName: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @IsString()
  infrastructureType: string;

  @ApiProperty()
  @TransformDateNotFuture()
  dateDonated: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


