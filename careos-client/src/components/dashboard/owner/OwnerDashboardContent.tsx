"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getTenantById } from "@/services/tenant.services";
import { Building, Users, Baby, Layers } from "lucide-react";

export default function OwnerDashboardContent({ tenantId }: { tenantId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tenants", tenantId],
    queryFn: () => getTenantById(tenantId).then((res) => res.data),
  });

  const tenant = data;

  const stats = [
    { name: "Branches", value: tenant?._count?.branches ?? 0, icon: Building },
    { name: "Team Members", value: tenant?._count?.users ?? 0, icon: Users },
    { name: "Enrolled Students", value: tenant?._count?.children ?? 0, icon: Baby },
    { name: "Current Plan", value: tenant?.plan?.name ?? "None", icon: Layers },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Center Overview</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          High-level metrics for your organization.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
              <dt>
                <div className="absolute rounded-lg bg-primary/10 p-3">
                  <Icon className="size-6 text-primary" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-muted-foreground">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
                <p className="text-2xl font-semibold text-foreground">
                  {isLoading ? "..." : stat.value}
                </p>
              </dd>
            </div>
          );
        })}
      </div>
    </div>
  );
}