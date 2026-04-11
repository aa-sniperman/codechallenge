import { z } from "zod";

import { resourceCategories, resourceStatuses } from "../models/resource.types";

const metadataSchema = z.object({
    color: z.string().min(1).optional(),
    originCountry: z.string().min(1).optional(),
    featured: z.boolean().optional()
});

export const createResourceSchema = z.object({
    name: z.string().trim().min(1),
    category: z.enum(resourceCategories),
    status: z.enum(resourceStatuses),
    price: z.number().min(0),
    rating: z.number().int().min(1).max(5),
    isActive: z.boolean(),
    tags: z.array(z.string().trim().min(1)).default([]),
    metadata: metadataSchema.default({})
});

export const updateResourceSchema = createResourceSchema.partial().refine(
    (value) => Object.keys(value).length > 0,
    "At least one field must be provided for update"
);

export const resourceQuerySchema = z.object({
    name: z.string().trim().min(1).optional(),
    category: z.enum(resourceCategories).optional(),
    status: z.enum(resourceStatuses).optional(),
    isActive: z
        .enum(["true", "false"])
        .transform((value) => value === "true")
        .optional(),
    minPrice: z.coerce.number().min(0).optional(),
    maxPrice: z.coerce.number().min(0).optional(),
    minRating: z.coerce.number().int().min(1).max(5).optional(),
    tag: z.string().trim().min(1).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(20),
    offset: z.coerce.number().int().min(0).default(0)
}).refine(
    (value) =>
        value.minPrice === undefined ||
        value.maxPrice === undefined ||
        value.minPrice <= value.maxPrice,
    "minPrice must be less than or equal to maxPrice"
);
