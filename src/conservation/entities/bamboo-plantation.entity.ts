import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bamboo_plantations')
export class BambooPlantation {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier of the bamboo plantation' })
  id: string;

  @Column()
  @ApiProperty({ description: 'Distance covered by the bamboo plantation' })
  distanceCovered: number;

  @Column()
  @ApiProperty({ description: 'Location of the bamboo plantation' })
  location: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Date when bamboo was planted' })
  datePlanted: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Description of the bamboo plantation project', required: false })
  description: string;

  @CreateDateColumn()
  @ApiProperty({ description: 'Timestamp when the record was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Timestamp when the record was last updated' })
  updatedAt: Date;
}
