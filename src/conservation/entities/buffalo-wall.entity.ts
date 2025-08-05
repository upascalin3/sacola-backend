import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('buffalo_walls')
export class BuffaloWall {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  location: string;

  @Column()
  @ApiProperty()
  distanceCovered: number;

  @Column({ type: 'date' })
  @ApiProperty()
  dateBuilt: Date;

  @Column()
  @ApiProperty()
  targetBeneficiaries: number;

  @Column()
  @ApiProperty()
  currentBeneficiaries: number;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  description: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;
}
