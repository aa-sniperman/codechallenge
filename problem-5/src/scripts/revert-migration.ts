import { appDataSource } from "../config/database";

async function revertMigration(): Promise<void> {
    await appDataSource.initialize();
    await appDataSource.undoLastMigration();
    await appDataSource.destroy();
}

revertMigration().catch(async (error) => {
    console.error("Failed to revert migration", error);

    if (appDataSource.isInitialized) {
        await appDataSource.destroy();
    }

    process.exit(1);
});
