import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { TransformDateNotFuture } from '../../common/transformers/date.transformer';

export class CreateBuffaloWallDto {
  @ApiProperty({ description: 'Date when the buffalo wall was repaired' })
  @TransformDateNotFuture()
  dateRepaired: Date;

  @ApiProperty({ description: 'Cost of the buffalo wall repair' })
  @IsNumber()
  cost: number;
}
