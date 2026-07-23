import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
const createPlan = async (payload) => {
    const existing = await prisma.subscriptionPlan.findUnique({ where: { name: payload.name } });
    if (existing) {
        throw new AppError(status.CONFLICT, "A plan with this name already exists");
    }
    return prisma.subscriptionPlan.create({ data: payload });
};
const getAllPlans = async () => {
    return prisma.subscriptionPlan.findMany({
        orderBy: { price: "asc" },
        include: { _count: { select: { tenants: true } } },
    });
};
const updatePlan = async (id, payload) => {
    const plan = await prisma.subscriptionPlan.findUnique({ where: { id } });
    if (!plan) {
        throw new AppError(status.NOT_FOUND, "Plan not found");
    }
    if (payload.maxBranches !== undefined) {
        const overLimitTenant = await prisma.tenant.findFirst({
            where: { planId: id, branches: { some: {} } },
            include: { _count: { select: { branches: true } } },
        });
        if (overLimitTenant && overLimitTenant._count.branches > payload.maxBranches) {
            throw new AppError(status.CONFLICT, `Cannot lower maxBranches below what "${overLimitTenant.name}" already uses (${overLimitTenant._count.branches})`);
        }
    }
    if (payload.maxStudents !== undefined) {
        const tenants = await prisma.tenant.findMany({ where: { planId: id }, select: { id: true, name: true } });
        for (const t of tenants) {
            const enrolledCount = await prisma.child.count({ where: { tenantId: t.id, status: "ENROLLED" } });
            if (enrolledCount > payload.maxStudents) {
                throw new AppError(status.CONFLICT, `Cannot lower maxStudents below what "${t.name}" already uses (${enrolledCount})`);
            }
        }
    }
    return prisma.subscriptionPlan.update({ where: { id }, data: payload });
};
const deletePlan = async (id) => {
    const tenantCount = await prisma.tenant.count({ where: { planId: id } });
    if (tenantCount > 0) {
        throw new AppError(status.CONFLICT, `Cannot delete a plan used by ${tenantCount} tenant(s)`);
    }
    await prisma.subscriptionPlan.delete({ where: { id } });
    return null;
};
const seedDefaultPlans = async () => {
    const existingCount = await prisma.subscriptionPlan.count();
    if (existingCount > 0) {
        throw new AppError(status.CONFLICT, "Plans already exist — seeding only works on an empty table");
    }
    await prisma.subscriptionPlan.createMany({
        data: [
            { name: "Free", price: 0, maxBranches: 1, maxStudents: 10 },
            { name: "Starter", price: 49, maxBranches: 1, maxStudents: 30 },
            { name: "Growth", price: 149, maxBranches: 3, maxStudents: 120 },
            { name: "Enterprise", price: 399, maxBranches: 10, maxStudents: 500 },
        ],
    });
    return getAllPlans();
};
export const PlanService = { createPlan, getAllPlans, updatePlan, deletePlan, seedDefaultPlans };
