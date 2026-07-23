"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTenantById } from "@/services/tenant.services";
import { format } from "date-fns";

export default function TenantOverviewCard({ tenantId }: { tenantId: string }) {
  const { data } = useQuery({
    queryKey: ["tenants", tenantId],
    queryFn: () => getTenantById(tenantId).then((res) => res.data),
  });

  if (!data) return null;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-base font-semibold text-foreground">Overview</h3>
      <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-muted-foreground">Status</dt>
          <dd className={`font-medium ${data.isActive ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
            {data.isActive ? "Active" : "Suspended"}
          </dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Branches</dt>
          <dd className="font-medium text-foreground">{data._count?.branches ?? 0}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Team Members</dt>
          <dd className="font-medium text-foreground">{data._count?.users ?? 0}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Created</dt>
          <dd className="font-medium text-foreground">{format(new Date(data.createdAt), "MMM d, yyyy")}</dd>
        </div>
      </dl>

      {!data.isActive && data.suspensionReason && (
        <p className="mt-4 text-sm text-destructive">
          <span className="font-medium">Suspension reason: </span>
          {data.suspensionReason}
        </p>
      )}

      {(data.contactEmail || data.contactPhone || data.addressLine1) && (
        <div className="mt-4 grid grid-cols-1 gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
          {data.contactEmail && (
            <div>
              <dt className="text-muted-foreground">Contact Email</dt>
              <dd className="font-medium text-foreground">{data.contactEmail}</dd>
            </div>
          )}
          {data.contactPhone && (
            <div>
              <dt className="text-muted-foreground">Contact Phone</dt>
              <dd className="font-medium text-foreground">{data.contactPhone}</dd>
            </div>
          )}
          {data.addressLine1 && (
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Head Office</dt>
              <dd className="font-medium text-foreground">
                {data.addressLine1}
                {data.addressLine2 && `, ${data.addressLine2}`}
                {data.city && `, ${data.city}`}
                {data.state && `, ${data.state}`}
                {data.postalCode && ` ${data.postalCode}`}
                {data.country && `, ${data.country}`}
              </dd>
            </div>
          )}
        </div>
      )}
    </div>
  );
}