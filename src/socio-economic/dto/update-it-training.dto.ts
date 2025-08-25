import { PartialType } from '@nestjs/swagger';
import { CreateITTrainingDto } from './create-it-training.dto';

export class UpdateITTrainingDto extends PartialType(CreateITTrainingDto) {}


