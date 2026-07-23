import z from "zod";

const updateMeZodSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
});

export const UserValidation = {
  updateMeZodSchema,
};