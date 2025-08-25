import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('housing_repairments_entries')
export class HousingRepairmentsEntryData {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @Column()
  @ApiProperty({ description: 'House owner' })
  houseOwner: string;

  @Column()
  @ApiProperty({ description: 'Location' })
  location: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Repair date' })
  dateRepaired: Date;

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


