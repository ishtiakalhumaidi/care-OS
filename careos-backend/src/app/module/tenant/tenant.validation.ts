import z from "zod";

const createTenantZodSchema = z.object({
  name: z
    .string({ error: "Tenant name is required" })
    .min(3, "Name must be at least 3 characters"),
  planId: z.string().uuid("Invalid plan ID format").optional(),
});

const updateTenantZodSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters").optional(),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers, and hyphens",
    )
    .optional(),
  planId: z.string().uuid("Invalid plan ID format").optional(),
  contactEmail: z.string().email("Invalid contact email").optional(),
  contactPhone: z.string().min(6, "Invalid phone number").optional(),
  website: z.string().url("Invalid website URL").optional(),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  timezone: z.string().optional(),
  currency: z
    .string()
    .length(3, "Use a 3-letter currency code, e.g. USD")
    .optional(),
  taxId: z.string().optional(),
});

const suspendTenantZodSchema = z.object({
  reason: z.string().min(3, "Reason must be at least 3 characters").optional(),
});

export const TenantValidation = {
  createTenantZodSchema,
  updateTenantZodSchema,
  suspendTenantZodSchema,
};
