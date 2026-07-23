import { prisma } from "../lib/prisma";

export const generateUniqueTenantSlug = async (name: string) => {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  let slug = base || "center";
  let counter = 1;

  while (await prisma.tenant.findUnique({ where: { slug } })) {
    slug = `${base}-${counter}`;
    counter++;
  }

  return slug;
};