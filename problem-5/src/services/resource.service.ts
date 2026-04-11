import { Resource } from "../models/resource.entity";
import {
    CreateResourceInput,
    ResourceFilters,
    UpdateResourceInput
} from "../models/resource.types";
import { ResourceRepository } from "../repositories/resource.repository";
import { HttpError } from "../utils/http-error";

export class ResourceService {
    constructor(private readonly repository: ResourceRepository) {}

    async create(input: CreateResourceInput): Promise<Resource> {
        return this.repository.create(input);
    }

    async list(filters: ResourceFilters): Promise<Resource[]> {
        return this.repository.findAll(filters);
    }

    async getById(id: string): Promise<Resource> {
        const resource = await this.repository.findById(id);

        if (!resource) {
            throw new HttpError(404, "Resource not found");
        }

        return resource;
    }

    async update(id: string, input: UpdateResourceInput): Promise<Resource> {
        const resource = await this.repository.update(id, input);

        if (!resource) {
            throw new HttpError(404, "Resource not found");
        }

        return resource;
    }

    async delete(id: string): Promise<void> {
        const deleted = await this.repository.delete(id);

        if (!deleted) {
            throw new HttpError(404, "Resource not found");
        }
    }
}
