import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';
import dotenv from 'dotenv';

async function syncDatabase() {
  // Load environment variables
  dotenv.config();

  console.log('Starting database synchronization...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('Database:', process.env.DB_DATABASE);

  // Create a new connection
  const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_DATABASE || 'sacola',
    schema: process.env.DB_SCHEMA || 'public',
    entities: [User],
    synchronize: true, // This will create tables if they don't exist
    logging: true,
  });

  try {
    // Initialize the connection
    const connection = await AppDataSource.initialize();
    console.log('Database connection established successfully!');

    // Synchronize all entities
    console.log('Synchronizing database...');
    await connection.synchronize(false); // false = don't drop existing tables
    
    console.log('Database synchronized successfully!');
    
    // Close the connection
    await connection.destroy();
    console.log('Connection closed.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error synchronizing database:', error);
    process.exit(1);
  }
}

// Run the sync
syncDatabase();
