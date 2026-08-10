import dotenv from 'dotenv'
dotenv.config();

function required(key: string): string {
    const val = process.env[key];
    if (!val) {
        throw new Error(`Missing env var: ${key}`)
    }
    return val;
}