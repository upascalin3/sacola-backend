import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import dotenv from 'dotenv';

async function syncDatabase() {
  // Load environment variables
  dotenv.config();

  console.log('Starting database synchronization...');
  console.log('NODE_ENV:', process.env.NODE_ENV);

  // Use DATABASE_URL if available, otherwise fall back to separate vars
  const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL, // Render connection string
    host: process.env.DB_HOST,     // fallback for local
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA || 'public',
    entities: [User],
    synchronize: true, // ⚠️ safe for dev, not for prod
    logging: true,
  });

  try {
    const connection = await AppDataSource.initialize();
    console.log('Database connection established successfully!');

    console.log('Synchronizing database...');
    await connection.synchronize(false); // false = don't drop tables
    
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
