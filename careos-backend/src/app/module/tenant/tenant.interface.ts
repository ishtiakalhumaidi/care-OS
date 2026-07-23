export interface IUpdateTenantPayload {
  name?: string;
  slug?: string;
  planId?: string;
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  timezone?: string;
  currency?: string;
  taxId?: string;
}

export interface ISuspendTenantPayload {
  reason?: string;
}
