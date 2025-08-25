import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ITTrainingService } from '../services/it-training.service';
import { CreateITTrainingDto } from '../dto/create-it-training.dto';
import { UpdateITTrainingDto } from '../dto/update-it-training.dto';

@ApiTags('socio-economic/it-training')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('api/socio-economic/it-training')
export class ITTrainingController {
  constructor(private readonly service: ITTrainingService) {}

  @Post()
  create(@Body() dto: CreateITTrainingDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateITTrainingDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}


