import z from "zod";
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const createBranchZodSchema = z.object({
    name: z.string({ error: "Branch name is required" }).min(2, "Name must be at least 2 characters"),
    address: z.string({ error: "Address is required" }).min(5, "Address must be at least 5 characters"),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    contactEmail: z.string().email("Invalid contact email").optional(),
    contactPhone: z.string().min(6, "Invalid phone number").optional(),
    licenseNumber: z.string().optional(),
    openTime: z.string().regex(timeRegex, "Use HH:MM format, e.g. 07:00").optional(),
    closeTime: z.string().regex(timeRegex, "Use HH:MM format, e.g. 18:00").optional(),
    timezone: z.string().optional(),
    tenantId: z.string().uuid("Invalid Tenant ID format").optional(),
});
const updateBranchZodSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").optional(),
    address: z.string().min(5, "Address must be at least 5 characters").optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    country: z.string().optional(),
    contactEmail: z.string().email("Invalid contact email").optional(),
    contactPhone: z.string().min(6, "Invalid phone number").optional(),
    licenseNumber: z.string().optional(),
    openTime: z.string().regex(timeRegex, "Use HH:MM format, e.g. 07:00").optional(),
    closeTime: z.string().regex(timeRegex, "Use HH:MM format, e.g. 18:00").optional(),
    timezone: z.string().optional(),
});
export const BranchValidation = {
    createBranchZodSchema,
    updateBranchZodSchema,
};
