import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('housing_materials_entries')
export class HousingMaterialsEntryData {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Material type' })
  materialType: string;

  @Column()
  @ApiProperty({ description: 'Location' })
  location: string;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Distributed materials count' })
  distributedMaterials: number;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Date donated' })
  dateDonated: Date;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Target number of beneficiaries' })
  targetBeneficiaries: number;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Current number of beneficiaries' })
  currentBeneficiaries: number;

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


