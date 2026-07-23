import z from "zod";
const createPlanZodSchema = z.object({
    name: z.string({ error: "Plan name is required" }).min(2),
    price: z.number({ error: "Price is required" }).nonnegative(),
    maxBranches: z.number({ error: "Max branches is required" }).int().positive(),
    maxStudents: z.number({ error: "Max students is required" }).int().positive(),
});
const updatePlanZodSchema = z.object({
    name: z.string().min(2).optional(),
    price: z.number().nonnegative().optional(),
    maxBranches: z.number().int().positive().optional(),
    maxStudents: z.number().int().positive().optional(),
});
export const PlanValidation = { createPlanZodSchema, updatePlanZodSchema };
