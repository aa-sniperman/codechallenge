import { NextFunction, Request, Response } from "express";

export function requestLoggerMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const startedAt = Date.now();

    res.on("finish", () => {
        const durationMs = Date.now() - startedAt;
        console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`);
    });

    next();
}
