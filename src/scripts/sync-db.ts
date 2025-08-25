import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import dotenv from 'dotenv';

dotenv.config();

async function syncDatabase() {
  console.log('Starting database synchronization...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('DATABASE_URL:', process.env.DATABASE_URL); // Log to debug

  if (!process.env.DATABASE_URL) {
    console.error('Error: DATABASE_URL is not set in environment variables');
    process.exit(1);
  }

  const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false, // SSL only in production
    schema: process.env.DB_SCHEMA || 'public',
    entities: [User],
    synchronize: process.env.NODE_ENV === 'production' ? false : true, // Disable sync in production
    logging: true,
  });

  try {
    const connection = await AppDataSource.initialize();
    console.log('Database connection established successfully!');

    console.log('Synchronizing database...');
    await connection.synchronize(process.env.NODE_ENV !== 'production'); // Only sync in non-production

    console.log('Database synchronized successfully!');
    await connection.destroy();
    console.log('Connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }
}

syncDatabase();