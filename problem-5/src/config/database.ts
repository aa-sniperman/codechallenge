import "reflect-metadata";
import { DataSource } from "typeorm";

import { env } from "./env";
import { Resource } from "../models/resource.entity";
import { CreateResourcesTable1712600000000 } from "../migrations/1712600000000-CreateResourcesTable";

export const appDataSource = new DataSource({
    type: "postgres",
    host: env.dbHost,
    port: env.dbPort,
    database: env.dbName,
    username: env.dbUser,
    password: env.dbPassword,
    entities: [Resource],
    migrations: [CreateResourcesTable1712600000000],
    synchronize: false,
    logging: false
});

export async function waitForDatabase(maxRetries = 10, delayMs = 3000): Promise<void> {
    for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
        try {
            if (!appDataSource.isInitialized) {
                await appDataSource.initialize();
            }
            return;
        } catch (error) {
            if (appDataSource.isInitialized) {
                await appDataSource.destroy();
            }

            if (attempt === maxRetries) {
                throw error;
            }

            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }
}
