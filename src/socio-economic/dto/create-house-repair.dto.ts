import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateHouseRepairDto {
  @ApiProperty()
  @IsString()
  houseOwner: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiProperty()
  @TransformDateNotFuture()
  dateRepaired: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}


