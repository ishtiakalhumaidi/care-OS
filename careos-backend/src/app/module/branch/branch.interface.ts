export interface ICreateBranchPayload {
  name: string;
  address: string;
  timezone?: string;
  tenantId: string;
}

export interface IUpdateBranchPayload {
  name?: string;
  address?: string;
  timezone?: string;
}