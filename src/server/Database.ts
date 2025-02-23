import { Client, QueryResult } from 'pg';
import { Log } from './Log';

export class Database {
    private readonly client = new Client({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    public async connect(): Promise<void> {
        try {
            await this.client.connect();
            Log.trace('Successful DB connection');
        } catch (e) {
            Log.error(`DB connection failed! Unrecoverable, so going to die. Error: ${e}`);
            throw e;
        }
    }

    public async query(q: string): Promise<QueryResult> {
        try {
            Log.trace('Executing a query');
            const result = await this.client.query(q);
            Log.trace('Successful query.');

            return result;
        } catch (e) {
            Log.error(`A query failed. Rethrowing. Error: ${e}`);
            throw e;
        }
    }
}