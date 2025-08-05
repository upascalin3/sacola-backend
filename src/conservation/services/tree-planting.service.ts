import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { TreePlanting } from '../entities/tree-planting.entity';
import { CreateTreePlantingDto } from '../dto/create-tree-planting.dto';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class TreePlantingService {
  constructor(
    @InjectRepository(TreePlanting)
    private treePlantingRepository: Repository<TreePlanting>,
  ) {}

  async create(createTreePlantingDto: CreateTreePlantingDto): Promise<TreePlanting> {
    const treePlanting = this.treePlantingRepository.create(createTreePlantingDto);
    return this.treePlantingRepository.save(treePlanting);
  }

  async findAll(query: Partial<PaginationDto<TreePlanting>>): Promise<PaginationDto<TreePlanting>> {
    const { 
      page = 1, 
      limit = 10, 
      location, 
      startDate, 
      endDate 
    } = query;
    
    const skip = (page - 1) * limit;
    const where: any = {};

    if (location) where.location = location;
    if (startDate && endDate) {
      where.datePlanted = Between(new Date(startDate), new Date(endDate));
    }

    const [items, total] = await this.treePlantingRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { datePlanted: 'DESC' },
    });

    return new PaginationDto({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  }

  async findOne(id: string): Promise<TreePlanting> {
    const treePlanting = await this.treePlantingRepository.findOne({ 
      where: { id } 
    });
    
    if (!treePlanting) {
      throw new NotFoundException(`Tree planting with ID ${id} not found`);
    }
    
    return treePlanting;
  }

  async update(
    id: string,
    updateTreePlantingDto: Partial<CreateTreePlantingDto>,
  ): Promise<TreePlanting> {
    const treePlanting = await this.findOne(id);
    Object.assign(treePlanting, updateTreePlantingDto);
    return this.treePlantingRepository.save(treePlanting);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.treePlantingRepository.delete(id);
  }

  async getStatistics() {
    const totalTrees = await this.treePlantingRepository
      .createQueryBuilder('tree')
      .select('SUM(numberOfTrees)', 'totalTrees')
      .getRawOne();
    
    const totalArea = await this.treePlantingRepository
      .createQueryBuilder('tree')
      .select('SUM(area)', 'totalArea')
      .getRawOne();
    
    return {
      totalTrees: parseInt(totalTrees.totalTrees) || 0,
      totalArea: parseFloat(totalArea.totalArea) || 0,
    };
  }
}
