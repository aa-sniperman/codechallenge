import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { HttpError } from "../utils/http-error";

export function notFoundMiddleware(_req: Request, _res: Response, next: NextFunction): void {
    next(new HttpError(404, "Route not found"));
}

export function errorMiddleware(
    error: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {
    if (error instanceof ZodError) {
        res.status(400).json({
            message: "Validation failed",
            errors: error.issues.map((issue) => ({
                path: issue.path.join("."),
                message: issue.message
            }))
        });
        return;
    }

    if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message });
        return;
    }

    console.error(error);
    res.status(500).json({ message: "Internal server error" });
}
