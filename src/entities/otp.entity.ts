import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('otps')
export class Otp {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier of the OTP' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty({ description: 'Email address associated with the OTP' })
  email: string;

  @Column({ type: 'varchar', length: 10 })
  @ApiProperty({ description: 'The one-time password' })
  code: string;

  @Column({ type: 'boolean', default: false })
  @ApiProperty({ description: 'Whether the OTP has been used' })
  isUsed: boolean;

  @Column({ type: 'timestamp with time zone' })
  @ApiProperty({ description: 'Expiration timestamp of the OTP' })
  expiresAt: Date;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  @ApiProperty({ description: 'Last update timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  @ApiProperty({ description: 'Deletion timestamp', nullable: true })
  deletedAt: Date | null;
}
