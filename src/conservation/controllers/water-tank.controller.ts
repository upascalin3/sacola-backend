import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { UserRole } from '../../shared/enums/user-role.enum';
import { WaterTankService } from '../services/water-tank.service';
import { CreateWaterTankDto } from '../dto/create-water-tank.dto';
import { UpdateWaterTankDto } from '../dto/update-water-tank.dto';
import { PaginationDto } from '../dto/pagination.dto';
import { WaterTank } from '../entities/water-tank.entity';

@ApiTags('water-tanks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('water-tanks')
export class WaterTankController {
  constructor(private readonly waterTankService: WaterTankService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Create a new water tank' })
  @ApiResponse({ status: 201, description: 'Water tank successfully created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  create(@Body() createWaterTankDto: CreateWaterTankDto) {
    return this.waterTankService.create(createWaterTankDto);
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get all water tanks with pagination' })
  @ApiResponse({ status: 200, description: 'List of water tanks' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  findAll(@Query() paginationDto: PaginationDto<WaterTank>) {
    return this.waterTankService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get a water tank by ID' })
  @ApiResponse({ status: 200, description: 'Water tank details' })
  @ApiResponse({ status: 404, description: 'Water tank not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.waterTankService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Update a water tank' })
  @ApiResponse({ status: 200, description: 'Water tank successfully updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Water tank not found' })
  update(@Param('id') id: string, @Body() updateWaterTankDto: UpdateWaterTankDto) {
    return this.waterTankService.update(id, updateWaterTankDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a water tank' })
  @ApiResponse({ status: 200, description: 'Water tank successfully deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Water tank not found' })
  remove(@Param('id') id: string) {
    return this.waterTankService.remove(id);
  }

  @Get('project/:projectId')
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.VIEWER)
  @ApiOperation({ summary: 'Get all water tanks for a specific project' })
  @ApiResponse({ status: 200, description: 'List of water tanks for the project' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  findByProjectId(
    @Param('projectId') projectId: string,
    @Query() paginationDto: PaginationDto<WaterTank>,
  ) {
    return this.waterTankService.findByProjectId(projectId, paginationDto);
  }

  @Post(':id/maintenance')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Mark a water tank as needing maintenance' })
  @ApiResponse({ status: 200, description: 'Maintenance status updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Water tank not found' })
  requestMaintenance(@Param('id') id: string) {
    return this.waterTankService.requestMaintenance(id);
  }

  @Post(':id/complete-maintenance')
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({ summary: 'Mark maintenance as completed for a water tank' })
  @ApiResponse({ status: 200, description: 'Maintenance completed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 404, description: 'Water tank not found' })
  completeMaintenance(@Param('id') id: string) {
    return this.waterTankService.completeMaintenance(id);
  }
}
