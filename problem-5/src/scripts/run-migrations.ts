import { appDataSource } from "../config/database";

async function runMigrations(): Promise<void> {
    await appDataSource.initialize();
    await appDataSource.runMigrations();
    await appDataSource.destroy();
}

runMigrations().catch(async (error) => {
    console.error("Failed to run migrations", error);

    if (appDataSource.isInitialized) {
        await appDataSource.destroy();
    }

    process.exit(1);
});
