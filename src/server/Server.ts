import { DatabaseManager } from "./DatabaseManager";
import { Log } from "./Log";
import express, { Request, Response } from 'express';

export class Server {
    public constructor(
        private readonly databaseManager: DatabaseManager
    ) { }

    public async start(): Promise<void> {
        try {
            Log.trace('Starting server');

            await Promise.all([
                this.setupDatabaseManager(),
                this.setupExpressEndpoints()
            ]);

            Log.trace('Successful start');
        } catch (e: any) {
            Log.error(`Server start failed, unrecoverable. Error: ${e}`);
            throw e;
        } 
    }

    private async setupDatabaseManager(): Promise<void> {
        await this.databaseManager.setup();

        this.setupPeriodicEmptyStaleAppointments();
    }

    private async setupExpressEndpoints(): Promise<void> {
        const app = express();
        const port = process.env.PORT;

        // Plain 'get', just returns 200 OK as a health check.
        app.get('/', async (req: Request, res: Response) => {
            let diag = 'This is an absolute fucking dummy fucking request! Lets see if it works by querying all users';

            try {
                const allUsersCount = await this.databaseManager.queryCountAllUsers();
                if (allUsersCount) {
                    diag += 'FUCK it works!!!! Count: ' + allUsersCount;
                } else {
                    diag += 'It didnt really fail but it returned null';
                }
            } catch (e: any) {
                diag += 'It threw something... Error: ' + e;
            }

            res.status(200).send(diag);
        });

        // After all endpoints are set, start the server.
        app.listen(port, () => {
            Log.trace('Sever running at port ' + port);
        })
    }

    private setupPeriodicEmptyStaleAppointments(): void {
        setInterval(async () => {
            Log.trace('Emptying stale appointments...');
            this.databaseManager
        }, 3600000 /* 1 hour */)
    }
}