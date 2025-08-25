import { PartialType } from '@nestjs/swagger';
import { CreateHealthCenterDto } from './create-health-center.dto';

export class UpdateHealthCenterDto extends PartialType(CreateHealthCenterDto) {}


