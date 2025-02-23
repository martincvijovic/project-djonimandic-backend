# Things to do:

Locally, you need to install PostgreSQL software. It will then be located at `C:\Program Files\PostgreSQL\17\bin`.

To run the DB you'll need to `pg_ctl -D "C:\Program Files\PostgreSQL\17\data" start`

Maybe a process will already be running, to kill it:

- `netstat -ano | findstr :5432`
- `taskkill /PID <PID> /F`

To run the local server go `npm run dev`

Don't stop the process or the DB server will die..

There should be one dev db but it's not configured properly. TODO: Completely configure the DB and copy the config locally. 