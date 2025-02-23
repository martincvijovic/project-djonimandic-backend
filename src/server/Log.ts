export class Log {
    public static trace(message: string): void {
        console.log(`[TRACE] ${message}`);
    }

    public static error(message: string): void {
        console.log(`[ERROR!] ${message}`);
    }
}