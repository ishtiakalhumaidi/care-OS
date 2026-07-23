export interface ICreatePlanPayload {
  name: string;
  price: number;
  maxBranches: number;
  maxStudents: number;
}

export interface IUpdatePlanPayload {
  name?: string;
  price?: number;
  maxBranches?: number;
  maxStudents?: number;
}