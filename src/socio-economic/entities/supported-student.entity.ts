import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('education_students_entries')
export class EducationStudentsEntryData {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Student name' })
  studentName: string;

  @Column()
  @ApiProperty({ description: 'Student location' })
  studentLocation: string;

  @Column()
  @ApiProperty({ description: 'School name' })
  schoolName: string;

  @Column()
  @ApiProperty({ description: 'School location' })
  schoolLocation: string;

  @Column()
  @ApiProperty({ description: 'Class' })
  class: string;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Funding years' })
  fundingYears: number;

  @Column({ type: 'int' })
  @ApiProperty({ description: 'Support amount or count' })
  supportAmount: number;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Date of support' })
  date: Date;

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


