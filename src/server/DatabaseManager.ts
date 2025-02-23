import { Database } from "./Database";
import { Log } from "./Log";

export class DatabaseManager {
    public constructor(private readonly db: Database) { }

    public async setup(): Promise<void> {
        await this.db.connect();
    }

    public async queryCountAllUsers(): Promise<Number | null> {
        Log.trace('Executing query count all users');
        const allUsers = await this.db.query('SELECT * FROM users');
        Log.trace('Successful query count all users');

        return allUsers.rowCount;
    }

    public async emptyStaleAppointments(): Promise<void> {
        // TODO
    }
}