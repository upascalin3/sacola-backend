import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('buffalo_walls')
export class BuffaloWall {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier of the buffalo wall repair' })
  id: string;

  @Column({ type: 'date' })
  @ApiProperty({ description: 'Date when the buffalo wall was repaired' })
  dateRepaired: Date;

  @Column()
  @ApiProperty({ description: 'Cost of the buffalo wall repair' })
  cost: number;

  @CreateDateColumn()
  @ApiProperty({ description: 'Timestamp when the record was created' })
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty({ description: 'Timestamp when the record was last updated' })
  updatedAt: Date;
}
