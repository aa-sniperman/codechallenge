import { Router } from "express";

import { ResourceController } from "../controllers/resource.controller";
import { asyncHandler } from "../utils/async-handler";
import { validateBody, validateQuery } from "../middleware/validate.middleware";
import {
    createResourceSchema,
    resourceQuerySchema,
    updateResourceSchema
} from "../validators/resource.validator";

export function createResourceRouter(controller: ResourceController): Router {
    const router = Router();

    router.post("/", validateBody(createResourceSchema), asyncHandler(controller.create));
    router.get("/", validateQuery(resourceQuerySchema), asyncHandler(controller.list));
    router.get("/:id", asyncHandler(controller.getById));
    router.put("/:id", validateBody(updateResourceSchema), asyncHandler(controller.update));
    router.delete("/:id", asyncHandler(controller.delete));

    return router;
}
