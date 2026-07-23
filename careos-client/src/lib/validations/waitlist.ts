import { z } from "zod";

export const waitlistSchema = z.object({
  email: z.string().trim().min(1, "Enter your email").email("Enter a valid email"),
  role: z.enum(["director", "teacher", "parent"]).optional(),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;