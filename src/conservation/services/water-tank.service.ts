import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, Like } from 'typeorm';
import { WaterTank, WaterTankStatus } from '../entities/water-tank.entity';
import { CreateWaterTankDto } from '../dto/create-water-tank.dto';
import { UpdateWaterTankDto } from '../dto/update-water-tank.dto';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class WaterTankService {
  constructor(
    @InjectRepository(WaterTank)
    private readonly waterTankRepository: Repository<WaterTank>,
  ) {}

  async create(createWaterTankDto: CreateWaterTankDto): Promise<WaterTank> {
    const waterTank = this.waterTankRepository.create(createWaterTankDto);
    return this.waterTankRepository.save(waterTank);
  }

  async findAll(paginationDto: PaginationDto<WaterTank>) {
    const { page = 1, limit = 10, sortBy, sortOrder = 'DESC', ...filters } = paginationDto;
    
    const where: any = {};
    
    // Apply filters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (typeof value === 'string') {
            where[key] = Like(`%${value}%`);
          } else {
            where[key] = value;
          }
        }
      });
    }

    const [items, total] = await this.waterTankRepository.findAndCount({
      where,
      order: sortBy ? { [sortBy]: sortOrder } : { createdAt: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      relations: ['project'],
    });

    return {
      items,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<WaterTank> {
    const waterTank = await this.waterTankRepository.findOne({ 
      where: { id },
      relations: ['project'] 
    });
    
    if (!waterTank) {
      throw new NotFoundException(`Water tank with ID ${id} not found`);
    }
    
    return waterTank;
  }

  async update(id: string, updateWaterTankDto: UpdateWaterTankDto): Promise<WaterTank> {
    const waterTank = await this.findOne(id);
    
    Object.assign(waterTank, updateWaterTankDto);
    
    if (updateWaterTankDto.status === WaterTankStatus.MAINTENANCE_COMPLETED) {
      waterTank.lastMaintenanceDate = new Date();
    }
    
    return this.waterTankRepository.save(waterTank);
  }

  async remove(id: string): Promise<void> {
    const result = await this.waterTankRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Water tank with ID ${id} not found`);
    }
  }

  async findByProjectId(projectId: string, paginationDto: PaginationDto<WaterTank>) {
    const pagination = new PaginationDto<WaterTank>({
      ...paginationDto,
      projectId,
    });
    return this.findAll(pagination);
  }

  async requestMaintenance(id: string): Promise<WaterTank> {
    const waterTank = await this.findOne(id);
    waterTank.status = WaterTankStatus.NEEDS_MAINTENANCE;
    return this.waterTankRepository.save(waterTank);
  }

  async completeMaintenance(id: string): Promise<WaterTank> {
    const waterTank = await this.findOne(id);
    waterTank.status = WaterTankStatus.MAINTENANCE_COMPLETED;
    waterTank.lastMaintenanceDate = new Date();
    return this.waterTankRepository.save(waterTank);
  }

  async getWaterTankStats() {
    const total = await this.waterTankRepository.count();
    const byStatus = await this.waterTankRepository
      .createQueryBuilder('waterTank')
      .select('waterTank.status', 'status')
      .addSelect('COUNT(waterTank.id)', 'count')
      .groupBy('waterTank.status')
      .getRawMany();

    const byType = await this.waterTankRepository
      .createQueryBuilder('waterTank')
      .select('waterTank.type', 'type')
      .addSelect('COUNT(waterTank.id)', 'count')
      .groupBy('waterTank.type')
      .getRawMany();

    return {
      total,
      byStatus: byStatus.reduce((acc, { status, count }) => ({
        ...acc,
        [status]: parseInt(count, 10),
      }), {}),
      byType: byType.reduce((acc, { type, count }) => ({
        ...acc,
        [type]: parseInt(count, 10),
      }), {}),
    };
  }
}
