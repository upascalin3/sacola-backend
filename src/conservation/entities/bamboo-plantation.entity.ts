import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bamboo_plantations')
export class BambooPlantation {
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
  datePlanted: Date;

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
