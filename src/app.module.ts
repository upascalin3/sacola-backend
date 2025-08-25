import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './auth/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const isRender = !!process.env.DATABASE_URL;

        return isRender
          ? {
              type: 'postgres',
              url: process.env.DATABASE_URL,
              ssl: { rejectUnauthorized: false },
              autoLoadEntities: true,
              synchronize: true, // ⚠️ set to false in prod with migrations
            }
          : {
              type: 'postgres',
              host: process.env.DB_HOST || 'localhost',
              port: parseInt(process.env.DB_PORT || '5432', 10),
              username: process.env.DB_USERNAME || 'postgres',
              password: process.env.DB_PASSWORD || 'root',
              database: process.env.DB_DATABASE || 'sacola',
              schema: process.env.DB_SCHEMA || 'public',
              autoLoadEntities: true,
              synchronize: true,
            };
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
