import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('tree_planting')
export class TreePlanting {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  treeType: string;

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
