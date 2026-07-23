import z from "zod";
const createClassroomZodSchema = z.object({
    name: z
        .string({ error: "Classroom name is required" })
        .min(2, "Name must be at least 2 characters"),
    ageGroup: z
        .string({ error: "Age group is required" })
        .min(2, "Age group must be at least 2 characters"),
    legalCapacity: z
        .number({ error: "Legal capacity is required" })
        .int()
        .positive("Legal capacity must be a positive integer"),
    ratioLimit: z
        .number({ error: "Ratio limit is required" })
        .int()
        .positive("Ratio limit must be a positive integer"),
    branchId: z
        .string({ error: "Branch ID is required" })
        .uuid("Invalid Branch ID format"),
});
const updateClassroomZodSchema = createClassroomZodSchema.partial();
const assignTeacherZodSchema = z.object({
    userId: z
        .string({ error: "Teacher user ID is required" })
        .min(1, "Invalid user ID"),
});
export const ClassroomValidation = {
    createClassroomZodSchema,
    updateClassroomZodSchema,
    assignTeacherZodSchema,
};
