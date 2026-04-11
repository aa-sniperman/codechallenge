import "reflect-metadata";

import { createApp } from "./app";
import { appDataSource, waitForDatabase } from "./config/database";
import { env } from "./config/env";

async function start(): Promise<void> {
    await waitForDatabase();

    const app = createApp();

    app.listen(env.port, () => {
        console.log(`Server listening on port ${env.port}`);
    });
}

start().catch(async (error) => {
    console.error("Failed to start server", error);
    if (appDataSource.isInitialized) {
        await appDataSource.destroy();
    }
    process.exit(1);
});
