/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllTenants } from "@/services/tenant.services";
import { Loader2, Building2 } from "lucide-react";

export default function TenantsTable() {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => getAllTenants("limit=100"),
  });

  const tenants = data?.data || [];

  return (
    <div className="rounded-md border border-border bg-card">
      <table className="w-full text-left text-sm text-muted-foreground">
        <thead className="border-b border-border bg-muted/50 text-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Tenant</th>
            <th className="px-4 py-3 font-medium">Plan</th>
            <th className="px-4 py-3 font-medium">Branches</th>
            <th className="px-4 py-3 font-medium">Users</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {isLoading ? (
            <tr><td colSpan={5} className="py-10 text-center"><Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" /></td></tr>
          ) : tenants.length === 0 ? (
            <tr><td colSpan={5} className="py-10 text-center text-muted-foreground">No tenants yet.</td></tr>
          ) : (
            tenants.map((t: any) => (
              <tr key={t.id} onClick={() => router.push(`/admin/dashboard/tenants-management/${t.id}`)} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 font-medium text-foreground">
                    <Building2 className="size-4 text-muted-foreground" /> {t.name}
                  </div>
                </td>
                <td className="px-4 py-3">{t.plan?.name || "No plan"}</td>
                <td className="px-4 py-3">{t._count?.branches ?? 0}</td>
                <td className="px-4 py-3">{t._count?.users ?? 0}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-md px-2 py-1 text-xs font-medium ${t.isActive ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" : "text-destructive bg-destructive/10"}`}>
                    {t.isActive ? "Active" : "Suspended"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}