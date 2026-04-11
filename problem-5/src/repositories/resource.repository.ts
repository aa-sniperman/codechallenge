import { Repository } from "typeorm";

import { Resource } from "../models/resource.entity";
import {
    CreateResourceInput,
    ResourceFilters,
    UpdateResourceInput
} from "../models/resource.types";

export class ResourceRepository {
    constructor(private readonly repository: Repository<Resource>) {}

    async create(input: CreateResourceInput): Promise<Resource> {
        const resource = this.repository.create({
            ...input,
            tags: input.tags ?? [],
            metadata: input.metadata ?? {}
        });

        return this.repository.save(resource);
    }

    async findAll(filters: ResourceFilters): Promise<Resource[]> {
        const queryBuilder = this.repository.createQueryBuilder("resource");

        if (filters.name) {
            queryBuilder.andWhere("resource.name ILIKE :name", { name: `%${filters.name}%` });
        }

        if (filters.category) {
            queryBuilder.andWhere("resource.category = :category", {
                category: filters.category
            });
        }

        if (filters.status) {
            queryBuilder.andWhere("resource.status = :status", { status: filters.status });
        }

        if (filters.isActive !== undefined) {
            queryBuilder.andWhere("resource.isActive = :isActive", {
                isActive: filters.isActive
            });
        }

        if (filters.minPrice !== undefined) {
            queryBuilder.andWhere("resource.price >= :minPrice", { minPrice: filters.minPrice });
        }

        if (filters.maxPrice !== undefined) {
            queryBuilder.andWhere("resource.price <= :maxPrice", { maxPrice: filters.maxPrice });
        }

        if (filters.minRating !== undefined) {
            queryBuilder.andWhere("resource.rating >= :minRating", {
                minRating: filters.minRating
            });
        }

        if (filters.tag) {
            queryBuilder.andWhere(":tag = ANY(resource.tags)", { tag: filters.tag });
        }

        return queryBuilder
            .orderBy("resource.createdAt", "DESC")
            .take(filters.limit)
            .skip(filters.offset)
            .getMany();
    }

    async findById(id: string): Promise<Resource | null> {
        return this.repository.findOne({ where: { id } });
    }

    async update(id: string, input: UpdateResourceInput): Promise<Resource | null> {
        const resource = await this.findById(id);

        if (!resource) {
            return null;
        }

        Object.assign(resource, input);
        return this.repository.save(resource);
    }

    async delete(id: string): Promise<boolean> {
        const result = await this.repository.delete(id);
        return (result.affected ?? 0) > 0;
    }
}
