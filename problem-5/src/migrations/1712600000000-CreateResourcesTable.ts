import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateResourcesTable1712600000000 implements MigrationInterface {
    name = "CreateResourcesTable1712600000000";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "resources" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" text NOT NULL,
                "category" text NOT NULL,
                "status" text NOT NULL,
                "price" numeric(10,2) NOT NULL,
                "rating" integer NOT NULL,
                "is_active" boolean NOT NULL,
                "tags" text array NOT NULL DEFAULT '{}',
                "metadata" jsonb NOT NULL DEFAULT '{}'::jsonb,
                "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
                CONSTRAINT "PK_resources_id" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "idx_resources_name" ON "resources" ("name")`
        );
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "idx_resources_category" ON "resources" ("category")`
        );
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "idx_resources_status" ON "resources" ("status")`
        );
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "idx_resources_is_active" ON "resources" ("is_active")`
        );
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "idx_resources_price" ON "resources" ("price")`
        );
        await queryRunner.query(
            `CREATE INDEX IF NOT EXISTS "idx_resources_rating" ON "resources" ("rating")`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_resources_rating"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_resources_price"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_resources_is_active"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_resources_status"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_resources_category"`);
        await queryRunner.query(`DROP INDEX IF EXISTS "idx_resources_name"`);
        await queryRunner.query(`DROP TABLE IF EXISTS "resources"`);
    }
}
