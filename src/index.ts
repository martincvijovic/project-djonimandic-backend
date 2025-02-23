import dotenv from 'dotenv';
import { Database } from './server/Database';
import { DatabaseManager } from './server/DatabaseManager';
import { Server } from './server/Server';

// Load the correct .env file based on the environment
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
} else {
    console.log('Deploying to localhost...');
    dotenv.config({ path: '.env.development' });
}

// Set up the server
const database = new Database();
const databaseManager = new DatabaseManager(database);

const server = new Server(databaseManager);
server.start(); 