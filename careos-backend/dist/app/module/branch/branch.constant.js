export const branchSearchableFields = ["name", "address"];
export const branchFilterableFields = ["tenantId", "isActive"];
export const branchIncludeConfig = {
    classrooms: {
        select: {
            id: true,
            name: true,
            ageGroup: true,
            legalCapacity: true,
            ratioLimit: true,
            _count: {
                select: { children: { where: { status: "ENROLLED" } }, users: true },
            },
        },
    },
};
