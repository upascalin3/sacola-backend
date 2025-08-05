import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as path from 'path';
import { createRequire } from 'module';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;
  private hbs: any;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.initializeTransporter();
  }

 
private async initializeTransporter() {
  const mailConfig = {
    host: this.configService.get<string>('MAIL_HOST', 'smtp.gmail.com'),
    port: this.configService.get<number>('MAIL_PORT', 465),
    secure: this.configService.get<boolean>('MAIL_SECURE', true), 
    auth: {
      user: this.configService.get<string>('pascuwayo@gmail.com'),
      pass: this.configService.get<string>('fcgr otqg tyyp jerb'),
    },
  };
    this.transporter = nodemailer.createTransport(mailConfig);

    try {
      // Use dynamic import for ESM module
      const hbsModule = await import('nodemailer-express-handlebars');
      this.hbs = hbsModule.default || hbsModule;

      // Configure Handlebars for email templates
      const viewPath = path.join(process.cwd(), 'dist/mail/templates/views');
      const partialsPath = path.join(process.cwd(), 'dist/mail/templates/partials');

      // Create a simple adapter function that works with the ESM module
      const hbsOptions = {
        viewEngine: {
          extname: '.hbs',
          layoutsDir: viewPath,
          partialsDir: partialsPath,
          defaultLayout: false,
        },
        viewPath,
        extName: '.hbs',
      };

      // Apply the plugin using the ESM-compatible approach
      this.transporter.use('compile', this.hbs(hbsOptions));
      
      this.logger.log('Email templates initialized successfully');
    } catch (error) {
      this.logger.error('Failed to initialize email templates', error);
      // Don't throw here to allow the app to start without email functionality
      // This makes the email service optional
      this.logger.warn('Email functionality will be disabled due to initialization error');
    }
  }

  async sendMail(
    to: string,
    subject: string,
    template: string,
    context: Record<string, any> = {},
  ): Promise<boolean> {
    // If transporter initialization failed, log a warning and return false
    if (!this.transporter) {
      this.logger.warn('Mail transporter not initialized. Email not sent.');
      return false;
    }

    try {
      const mailOptions = {
        from: this.configService.get<string>('MAIL_FROM'),
        to,
        subject,
        template,
        context: {
          ...context,
          appName: this.configService.get<string>('APP_NAME', 'SACOLA'),
          appUrl: this.configService.get<string>('APP_URL', 'https://sacola.rw'),
        },
      };

      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`Email sent: ${info.messageId}`);
      return true;
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`, error.stack);
      return false;
    }
  }

  async sendVerificationEmail(email: string, name: string, token: string): Promise<boolean> {
    const verificationUrl = `${this.configService.get<string>('APP_URL')}/auth/verify-email?token=${token}`;
    
    return this.sendMail(
      email,
      'Verify Your Email Address',
      'email-verification',
      {
        name,
        verificationUrl,
        expiryHours: 24,
      },
    );
  }

  async sendPasswordResetEmail(email: string, name: string, token: string): Promise<boolean> {
    const resetUrl = `${this.configService.get<string>('APP_URL')}/auth/reset-password?token=${token}`;
    
    return this.sendMail(
      email,
      'Reset Your Password',
      'password-reset',
      {
        name,
        resetUrl,
        expiryHours: 1,
      },
    );
  }

  async sendWelcomeEmail(email: string, name: string): Promise<boolean> {
    return this.sendMail(
      email,
      'Welcome to SACOLA',
      'welcome',
      {
        name,
        supportEmail: this.configService.get<string>('MAIL_SUPPORT', 'support@sacola.rw'),
      },
    );
  }
}
