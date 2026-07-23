import { z } from "zod";
const registerTenantOwnerSchema = z.object({
    name: z.string({ error: "Name is required" }).min(2),
    email: z.string({ error: "Email is required" }).email("Invalid email format"),
    password: z
        .string({ error: "Password is required" })
        .min(8, "Password must be at least 8 characters"),
    tenantName: z
        .string({ error: "Center/organization name is required" })
        .min(3, "Name must be at least 3 characters"),
    planId: z.string().uuid("Invalid plan ID format").optional(),
});
const loginSchema = z.object({
    email: z.string({ error: "Email is required" }).email("Invalid email format"),
    password: z.string({ error: "Password is required" }),
});
const changePasswordSchema = z.object({
    oldPassword: z.string().optional(),
    newPassword: z
        .string({ error: "New password is required" })
        .min(8, "Password must be at least 8 characters"),
});
const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email format"),
    otp: z.string().length(6, "OTP must be exactly 6 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
});
const inviteUserSchema = z
    .object({
    email: z.string().email(),
    role: z.enum(["CENTER_ADMIN", "TEACHER", "GUARDIAN"]),
    tenantId: z.string().uuid().optional(),
    branchId: z.string().uuid("A branch is required"),
    classroomId: z.string().uuid().optional(),
    childId: z.string().uuid().optional(),
    relationship: z.string().min(2, "Relationship is required").optional(),
})
    .superRefine((data, ctx) => {
    if (data.childId && !data.relationship) {
        ctx.addIssue({
            code: "custom",
            path: ["relationship"],
            message: "relationship is required when linking an existing child",
        });
    }
    if (data.relationship && !data.childId) {
        ctx.addIssue({
            code: "custom",
            path: ["childId"],
            message: "childId is required when specifying a relationship",
        });
    }
});
const acceptInviteSchema = z.object({
    token: z.string({ error: "Invitation token is required" }),
    name: z.string({ error: "Name is required" }).min(2),
    password: z
        .string({ error: "Password is required" })
        .min(8, "Password must be at least 8 characters"),
});
const forgotPasswordZodSchema = z.object({
    email: z.string().email("Please provide a valid email address"),
});
export const AuthValidation = {
    registerTenantOwnerSchema,
    loginSchema,
    changePasswordSchema,
    resetPasswordSchema,
    inviteUserSchema,
    acceptInviteSchema,
    forgotPasswordZodSchema,
};
