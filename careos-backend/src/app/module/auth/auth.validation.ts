import { z } from "zod";

const registerTenantOwnerSchema = z.object({
  name: z.string({ error: "Name is required" }).min(2),
  email: z
    .string({ error: "Email is required" })
    .email("Invalid email format"),
  tenantId: z
    .string({ error: "Tenant ID is required" })
    .uuid("Invalid Tenant ID format"),
});

const changePasswordSchema = z.object({
  oldPassword: z.string().optional(),
  newPassword: z
    .string({ error: "New password is required" })
    .min(8, "Password must be at least 8 characters"),
});


const forgetPasswordSchema = z.object({
    email: z.string().email("Invalid email format"),
});

const resetPasswordSchema = z.object({
    email: z.string().email("Invalid email format"),
    otp: z.string().length(6, "OTP must be exactly 6 characters"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
});

const inviteUserSchema = z.object({
    email: z.string().email("Invalid email format"),
    role: z.enum(["CENTER_ADMIN", "TEACHER", "GUARDIAN"]),
    tenantId: z.string().uuid("Invalid Tenant ID"),
    branchId: z.string().uuid().optional(),
    classroomId: z.string().uuid().optional(),
});
const acceptInviteSchema = z.object({
  token: z.string({ error: "Invitation token is required" }),
  name: z.string({ error: "Name is required" }).min(2),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
});
export const AuthValidation = {
  registerTenantOwnerSchema,
  changePasswordSchema,
  forgetPasswordSchema,
  resetPasswordSchema,
  inviteUserSchema,
    acceptInviteSchema,
};

