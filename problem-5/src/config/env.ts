import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string, fallback?: string): string {
    const value = process.env[name] ?? fallback;

    if (value === undefined) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const env = {
    port: Number(getEnv("PORT", "3000")),
    dbHost: getEnv("DB_HOST", "localhost"),
    dbPort: Number(getEnv("DB_PORT", "5432")),
    dbName: getEnv("DB_NAME", "resource_db"),
    dbUser: getEnv("DB_USER", "postgres"),
    dbPassword: getEnv("DB_PASSWORD", "postgres")
};
