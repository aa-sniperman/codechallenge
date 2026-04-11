import express from "express";

import { appDataSource } from "./config/database";
import { ResourceController } from "./controllers/resource.controller";
import { errorMiddleware, notFoundMiddleware } from "./middleware/error.middleware";
import { requestLoggerMiddleware } from "./middleware/request-logger.middleware";
import { Resource } from "./models/resource.entity";
import { ResourceRepository } from "./repositories/resource.repository";
import { createResourceRouter } from "./routes/resource.routes";
import { ResourceService } from "./services/resource.service";

export function createApp() {
    const app = express();

    const resourceRepository = new ResourceRepository(appDataSource.getRepository(Resource));
    const resourceService = new ResourceService(resourceRepository);
    const resourceController = new ResourceController(resourceService);

    app.use(express.json());
    app.use(requestLoggerMiddleware);

    app.get("/health", (_req, res) => {
        res.status(200).json({ status: "ok" });
    });

    app.use("/resources", createResourceRouter(resourceController));
    app.use(notFoundMiddleware);
    app.use(errorMiddleware);

    return app;
}
