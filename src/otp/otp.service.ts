import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import * as speakeasy from 'speakeasy';

@Injectable()
export class OtpService {
  constructor(private readonly configService: ConfigService) {}

  generateOtp(email: string, expiresInMinutes = 10): { secret: string; otp: string; expiresAt: Date } {
    const secret = speakeasy.generateSecret({ length: 20 }).base32;
    const otp = speakeasy.totp({
      secret,
      encoding: 'base32',
      step: expiresInMinutes * 60, // Convert minutes to seconds
      digits: 6,
    });

    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

    return {
      secret,
      otp,
      expiresAt,
    };
  }

  verifyOtp(token: string, secret: string, window = 1): boolean {
    return speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
      window, // Allow 1 step (30-60s) before/after current time
      digits: 6,
    });
  }

  generateRandomToken(length = 32): string {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  }

  generatePasswordResetToken(): { token: string; expiresAt: Date } {
    const token = this.generateRandomToken(32);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Token expires in 1 hour

    return {
      token,
      expiresAt,
    };
  }
}
