import { Request, Response } from "express";

import { CreateResourceInput, ResourceFilters, UpdateResourceInput } from "../models/resource.types";
import { ResourceService } from "../services/resource.service";

export class ResourceController {
    constructor(private readonly resourceService: ResourceService) {}

    create = async (req: Request, res: Response): Promise<void> => {
        const payload = req.validatedBody as CreateResourceInput;
        const resource = await this.resourceService.create(payload);

        res.status(201).json(resource);
    };

    list = async (req: Request, res: Response): Promise<void> => {
        const filters = req.validatedQuery as ResourceFilters;
        const resources = await this.resourceService.list(filters);

        res.status(200).json(resources);
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        const resource = await this.resourceService.getById(req.params.id);

        res.status(200).json(resource);
    };

    update = async (req: Request, res: Response): Promise<void> => {
        const payload = req.validatedBody as UpdateResourceInput;
        const resource = await this.resourceService.update(req.params.id, payload);

        res.status(200).json(resource);
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        await this.resourceService.delete(req.params.id);

        res.status(204).send();
    };
}
