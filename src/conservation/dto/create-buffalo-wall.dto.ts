import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate } from 'class-validator';

export class CreateBuffaloWallDto {
  @ApiProperty({ description: 'Date when the buffalo wall was repaired' })
  @IsDate()
  dateRepaired: Date;

  @ApiProperty({ description: 'Cost of the buffalo wall repair' })
  @IsNumber()
  cost: number;
}
