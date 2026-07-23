export const childSearchableFields = ["firstName", "lastName", "childCode"];
export const childFilterableFields = ["branchId", "classroomId", "status", "tenantId"];
export const childIncludeConfig = {
    branch: { select: { id: true, name: true } },
    classroom: { select: { id: true, name: true } },
    guardians: {
        include: {
            user: { select: { id: true, name: true, email: true } },
        },
    },
};
