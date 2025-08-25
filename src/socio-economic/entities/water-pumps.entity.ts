import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('water_pumps_entries')
export class WaterPumpsEntryData {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Pump name' })
  pumpName: string;

  @Column()
  @ApiProperty({ description: 'Location' })
  location: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Date built' })
  dateBuilt: Date;

  @Column()
  @ApiProperty({ description: 'Pump condition (Good/Bad)' })
  pumpCondition: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ description: 'Description', required: false })
  description?: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Created at' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Updated at' })
  updatedAt: Date;
}


