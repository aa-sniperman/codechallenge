import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export function validateBody(schema: ZodTypeAny) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            next(result.error);
            return;
        }

        req.validatedBody = result.data;
        next();
    };
}

export function validateQuery(schema: ZodTypeAny) {
    return (req: Request, _res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req.query);

        if (!result.success) {
            next(result.error);
            return;
        }

        req.validatedQuery = result.data;
        next();
    };
}
