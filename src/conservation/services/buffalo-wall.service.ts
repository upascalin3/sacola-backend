import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { BuffaloWall } from '../entities/buffalo-wall.entity';
import { CreateBuffaloWallDto } from '../dto/create-buffalo-wall.dto';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class BuffaloWallService {
  constructor(
    @InjectRepository(BuffaloWall)
    private buffaloWallRepository: Repository<BuffaloWall>,
  ) {}

  async create(createBuffaloWallDto: CreateBuffaloWallDto): Promise<BuffaloWall> {
    const buffaloWall = this.buffaloWallRepository.create(createBuffaloWallDto);
    return this.buffaloWallRepository.save(buffaloWall);
  }

  async findAll(query: Partial<PaginationDto<BuffaloWall>>): Promise<PaginationDto<BuffaloWall>> {
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
      where.dateBuilt = Between(new Date(startDate), new Date(endDate));
    }

    const [items, total] = await this.buffaloWallRepository.findAndCount({
      where,
      skip,
      take: limit,
      order: { dateBuilt: 'DESC' },
    });

    return new PaginationDto({
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  }

  async findOne(id: string): Promise<BuffaloWall> {
    const buffaloWall = await this.buffaloWallRepository.findOne({ 
      where: { id } 
    });
    
    if (!buffaloWall) {
      throw new NotFoundException(`Buffalo wall with ID ${id} not found`);
    }
    
    return buffaloWall;
  }

  async update(
    id: string,
    updateBuffaloWallDto: Partial<CreateBuffaloWallDto>,
  ): Promise<BuffaloWall> {
    const buffaloWall = await this.findOne(id);
    Object.assign(buffaloWall, updateBuffaloWallDto);
    return this.buffaloWallRepository.save(buffaloWall);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.buffaloWallRepository.delete(id);
  }

  async getStatistics() {
    const totalWalls = await this.buffaloWallRepository.count();
    const totalLength = await this.buffaloWallRepository
      .createQueryBuilder('buffaloWall')
      .select('SUM(length)', 'totalLength')
      .getRawOne();
    
    return {
      totalWalls,
      totalLength: parseFloat(totalLength.totalLength) || 0,
    };
  }
}
