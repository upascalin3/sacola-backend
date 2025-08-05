import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ConservationProject } from './conservation-project.entity';

export enum WaterTankType {
  FERRO_CEMENT = 'ferro_cement',
  CONCRETE = 'concrete',
  PLASTIC = 'plastic',
  METAL = 'metal',
  OTHER = 'other',
}

export enum WaterTankStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  NEEDS_MAINTENANCE = 'needs_maintenance',
  MAINTENANCE_COMPLETED = 'maintenance_completed',
  DECOMMISSIONED = 'decommissioned',
}

@Entity('water_tanks')
export class WaterTank {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier of the water tank', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ManyToOne(() => ConservationProject, project => project.waterTanks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'projectId' })
  @ApiProperty({ description: 'The conservation project this water tank is associated with' })
  project: ConservationProject;

  @Column({ type: 'uuid' })
  @ApiProperty({ description: 'ID of the associated conservation project' })
  projectId: string;

  @Column({
    type: 'enum',
    enum: WaterTankType,
    default: WaterTankType.FERRO_CEMENT,
  })
  @ApiProperty({
    description: 'Type of the water tank',
    enum: WaterTankType,
    example: WaterTankType.FERRO_CEMENT,
  })
  type: WaterTankType;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @ApiProperty({
    description: 'Capacity of the water tank in liters',
    example: 5000,
    required: false,
  })
  capacityLiters: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  @ApiProperty({
    description: 'Latitude coordinate of the water tank location',
    example: -1.2921,
    required: false,
  })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
  @ApiProperty({
    description: 'Longitude coordinate of the water tank location',
    example: 36.8219,
    required: false,
  })
  longitude: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  @ApiProperty({
    description: 'Detailed location description',
    example: 'Near the community center, next to the main road',
    required: false,
  })
  locationDescription: string;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    description: 'Date when the water tank was installed',
    example: '2023-01-15',
    required: false,
  })
  installationDate: Date;

  @Column({
    type: 'enum',
    enum: WaterTankStatus,
    default: WaterTankStatus.PLANNED,
  })
  @ApiProperty({
    description: 'Current status of the water tank',
    enum: WaterTankStatus,
    example: WaterTankStatus.COMPLETED,
  })
  status: WaterTankStatus;

  @Column({ type: 'date', nullable: true })
  @ApiProperty({
    description: 'Date of last maintenance',
    example: '2023-01-15',
    required: false,
  })
  lastMaintenanceDate?: Date;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    description: 'Additional notes about the water tank',
    example: 'Needs regular cleaning every 3 months',
    required: false,
  })
  notes: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  @ApiProperty({
    description: 'Name or identifier of the person who installed the tank',
    example: 'John Doe',
    required: false,
  })
  installedBy: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @ApiProperty({
    description: 'Photo URL of the water tank',
    example: 'https://example.com/photos/water-tank-1.jpg',
    required: false,
  })
  photoUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty({ description: 'Timestamp when the record was created' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty({ description: 'Timestamp when the record was last updated' })
  updatedAt: Date;

  // Helper method to get the full location as an object
  getLocation(): { lat: number; lng: number; description?: string } | null {
    if (this.latitude && this.longitude) {
      return {
        lat: this.latitude,
        lng: this.longitude,
        description: this.locationDescription,
      };
    }
    return null;
  }

  // Check if the water tank is operational
  isOperational(): boolean {
    return this.status === WaterTankStatus.COMPLETED;
  }

  // Check if maintenance is needed
  needsMaintenance(): boolean {
    return this.status === WaterTankStatus.NEEDS_MAINTENANCE;
  }
}
