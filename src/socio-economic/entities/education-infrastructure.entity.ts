import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('education_infrastructures_entries')
export class EducationInfrastructuresEntryData {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @Column()
  @ApiProperty({ description: 'School name' })
  schoolName: string;

  @Column()
  @ApiProperty({ description: 'Location' })
  location: string;

  @Column()
  @ApiProperty({ description: 'Infrastructure type (ECD, Nursery, Primary, etc.)' })
  infrastructureType: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Date donated' })
  dateDonated: Date;

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


