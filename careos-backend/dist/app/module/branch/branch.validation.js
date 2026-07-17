import z from "zod";
const createBranchZodSchema = z.object({
    name: z
        .string({ error: "Branch name is required" })
        .min(2, "Name must be at least 2 characters"),
    address: z
        .string({ error: "Address is required" })
        .min(5, "Address must be at least 5 characters"),
    timezone: z.string().optional(),
    tenantId: z.string().uuid("Invalid Tenant ID format").optional(),
});
const updateBranchZodSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    address: z.string().min(5, "Address must be at least 5 characters").optional(),
    timezone: z.string().optional(),
});
export const BranchValidation = {
    createBranchZodSchema,
    updateBranchZodSchema,
};
