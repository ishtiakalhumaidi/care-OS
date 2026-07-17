import z from "zod";
const createTenantZodSchema = z.object({
    name: z.string({ error: "Tenant name is required" }).min(3, "Name must be at least 3 characters"),
    planId: z.string().uuid("Invalid plan ID format").optional(),
});
const updateTenantZodSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").optional(),
    isActive: z.boolean().optional(),
    planId: z.string().uuid("Invalid plan ID format").optional(),
});
export const TenantValidation = {
    createTenantZodSchema,
    updateTenantZodSchema,
};
