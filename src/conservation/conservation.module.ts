import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConservationProject } from './entities/conservation-project.entity';
import { WaterTank } from './entities/water-tank.entity';
import { ConservationProjectController } from './controllers/conservation-project.controller';
import { ConservationProjectService } from './services/conservation-project.service';
import { WaterTankService } from './services/water-tank.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConservationProject, WaterTank]), 
  ],
  controllers: [ConservationProjectController],
  providers: [ConservationProjectService, WaterTankService],
  exports: [ConservationProjectService, WaterTankService], 
})
export class ConservationModule {}
