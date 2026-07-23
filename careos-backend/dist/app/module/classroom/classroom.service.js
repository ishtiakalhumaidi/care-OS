import status from "http-status";
import AppError from "../../errorHelpers/AppError.js";
import { prisma } from "../../lib/prisma.js";
import { QueryBuilder } from "../../builder/QueryBuilder.js";
import { classroomSearchableFields, classroomFilterableFields, classroomListIncludeConfig, classroomDetailIncludeConfig, } from "./classroom.constant.js";
const createClassroom = async (payload, tenantId) => {
    const branch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
    if (!branch || !branch.isActive || branch.tenantId !== tenantId) {
        throw new AppError(status.FORBIDDEN, "Invalid branch assignment. You do not have access to this branch.");
    }
    return prisma.classroom.create({ data: payload });
};
const getAllClassrooms = async (query, tenantId) => {
    const tenantBranches = await prisma.branch.findMany({
        where: { tenantId },
        select: { id: true },
    });
    const branchIds = tenantBranches.map((b) => b.id);
    if (query.branchId && !branchIds.includes(query.branchId)) {
        throw new AppError(status.FORBIDDEN, "You do not have access to this branch");
    }
    const scopedQuery = query.branchId ? { ...query } : { ...query, branchId: { in: branchIds } };
    const queryBuilder = new QueryBuilder(prisma.classroom, scopedQuery, {
        searchableFields: classroomSearchableFields,
        filterableFields: classroomFilterableFields,
    });
    const result = await queryBuilder
        .search()
        .filter()
        .paginate()
        .sort()
        .fields()
        .dynamicInclude(classroomListIncludeConfig)
        .execute();
    return result;
};
const getClassroomById = async (id, tenantId) => {
    const classroom = await prisma.classroom.findUnique({
        where: { id },
        include: classroomDetailIncludeConfig,
    });
    if (!classroom) {
        throw new AppError(status.NOT_FOUND, "Classroom not found");
    }
    console.log(classroom);
    if (classroom.branch.tenantId !== tenantId) {
        throw new AppError(status.FORBIDDEN, "You do not have access to this classroom");
    }
    return classroom;
};
const updateClassroom = async (id, payload, tenantId) => {
    const classroom = await prisma.classroom.findUnique({
        where: { id },
        include: { branch: true },
    });
    if (!classroom || classroom.branch.tenantId !== tenantId) {
        throw new AppError(status.NOT_FOUND, "Classroom not found or unauthorized");
    }
    if (payload.branchId && payload.branchId !== classroom.branchId) {
        const newBranch = await prisma.branch.findUnique({ where: { id: payload.branchId } });
        if (!newBranch || !newBranch.isActive || newBranch.tenantId !== tenantId) {
            throw new AppError(status.FORBIDDEN, "Cannot move classroom to an unauthorized branch");
        }
    }
    return prisma.classroom.update({ where: { id }, data: payload });
};
const deleteClassroom = async (id, tenantId) => {
    const classroom = await prisma.classroom.findUnique({
        where: { id },
        include: {
            branch: true,
            _count: { select: { children: true, users: true, shifts: true } },
        },
    });
    if (!classroom || classroom.branch.tenantId !== tenantId) {
        throw new AppError(status.NOT_FOUND, "Classroom not found or unauthorized");
    }
    if (classroom._count.children > 0 || classroom._count.users > 0) {
        throw new AppError(status.BAD_REQUEST, "Cannot delete a classroom that currently has assigned children or staff. Reassign them first.");
    }
    await prisma.classroom.delete({ where: { id } });
    return { message: "Classroom permanently deleted" };
};
const assignTeacher = async (classroomId, payload, tenantId, staffBranchId) => {
    const classroom = await prisma.classroom.findUnique({
        where: { id: classroomId },
        include: { branch: true },
    });
    if (!classroom || classroom.branch.tenantId !== tenantId) {
        throw new AppError(status.NOT_FOUND, "Classroom not found");
    }
    if (staffBranchId && classroom.branchId !== staffBranchId) {
        throw new AppError(status.FORBIDDEN, "You do not have access to this branch");
    }
    const teacher = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!teacher || teacher.tenantId !== tenantId || teacher.role !== "TEACHER") {
        throw new AppError(status.BAD_REQUEST, "Invalid teacher account");
    }
    if (teacher.branchId !== classroom.branchId) {
        throw new AppError(status.BAD_REQUEST, "This teacher belongs to a different branch than this classroom");
    }
    return prisma.user.update({
        where: { id: payload.userId },
        data: { classroomId },
        select: { id: true, name: true, email: true },
    });
};
const unassignTeacher = async (classroomId, userId, tenantId, staffBranchId) => {
    const teacher = await prisma.user.findUnique({ where: { id: userId } });
    if (!teacher || teacher.tenantId !== tenantId || teacher.classroomId !== classroomId) {
        throw new AppError(status.NOT_FOUND, "Teacher is not assigned to this classroom");
    }
    if (staffBranchId && teacher.branchId !== staffBranchId) {
        throw new AppError(status.FORBIDDEN, "You do not have access to this branch");
    }
    await prisma.user.update({ where: { id: userId }, data: { classroomId: null } });
    return null;
};
export const ClassroomService = {
    createClassroom,
    getAllClassrooms,
    getClassroomById,
    updateClassroom,
    deleteClassroom,
    assignTeacher,
    unassignTeacher,
};
