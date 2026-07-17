export interface ICreateTenantPayload {
    name: string;
    planId?: string;
}

export interface IUpdateTenantPayload {
    name?: string;
    isActive?: boolean;
    planId?: string;
}