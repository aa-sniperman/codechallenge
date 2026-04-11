import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    Index,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

import { ResourceCategory, ResourceMetadata, ResourceStatus } from "./resource.types";

@Entity({ name: "resources" })
@Index("idx_resources_name", ["name"])
@Index("idx_resources_category", ["category"])
@Index("idx_resources_status", ["status"])
@Index("idx_resources_is_active", ["isActive"])
@Index("idx_resources_price", ["price"])
@Index("idx_resources_rating", ["rating"])
export class Resource {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "text" })
    name!: string;

    @Column({ type: "text" })
    category!: ResourceCategory;

    @Column({ type: "text" })
    status!: ResourceStatus;

    @Column({
        type: "numeric",
        precision: 10,
        scale: 2,
        transformer: {
            to: (value?: number) => value,
            from: (value: string) => Number(value)
        }
    })
    price!: number;

    @Column({ type: "integer" })
    rating!: number;

    @Column({ name: "is_active", type: "boolean" })
    isActive!: boolean;

    @Column({ type: "text", array: true, default: () => "'{}'" })
    tags!: string[];

    @Column({ type: "jsonb", default: () => "'{}'" })
    metadata!: ResourceMetadata;

    @CreateDateColumn({ name: "created_at", type: "timestamptz" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
    updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    normalizeDefaults(): void {
        this.tags = this.tags ?? [];
        this.metadata = this.metadata ?? {};
    }
}
