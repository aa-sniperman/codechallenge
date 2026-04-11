export const resourceCategories = ["book", "device", "service"] as const;
export const resourceStatuses = ["draft", "published", "archived"] as const;

export type ResourceCategory = (typeof resourceCategories)[number];
export type ResourceStatus = (typeof resourceStatuses)[number];

export interface ResourceMetadata {
    color?: string;
    originCountry?: string;
    featured?: boolean;
}

export interface CreateResourceInput {
    name: string;
    category: ResourceCategory;
    status: ResourceStatus;
    price: number;
    rating: number;
    isActive: boolean;
    tags: string[];
    metadata: ResourceMetadata;
}

export interface UpdateResourceInput {
    name?: string;
    category?: ResourceCategory;
    status?: ResourceStatus;
    price?: number;
    rating?: number;
    isActive?: boolean;
    tags?: string[];
    metadata?: ResourceMetadata;
}

export interface ResourceFilters {
    name?: string;
    category?: ResourceCategory;
    status?: ResourceStatus;
    isActive?: boolean;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    tag?: string;
    limit: number;
    offset: number;
}
