import { PartialType } from '@nestjs/swagger';
import { CreateSportsDto } from './create-sports.dto';

export class UpdateSportsDto extends PartialType(CreateSportsDto) {}


