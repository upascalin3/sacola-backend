import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('eu_funded_projects')
export class EUFundedProject {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  district: string;

  @Column()
  @ApiProperty()
  location: string;

  @Column()
  @ApiProperty()
  numberOfTreesPlanted: number;

  @Column({ type: 'date' })
  @ApiProperty()
  datePlanted: Date;

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
