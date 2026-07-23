/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTenantAnalytics, suspendTenant, activateTenant } from "@/services/tenant.services";
import { ArrowLeft, PauseCircle, PlayCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function TenantDetailView({ tenantId }: { tenantId: string }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");
  const [showSuspendForm, setShowSuspendForm] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["tenants", tenantId],
    queryFn: () => getTenantAnalytics(tenantId).then((res) => res.data),
  });

  const { mutate: suspend, isPending: isSuspending } = useMutation({
    mutationFn: () => suspendTenant(tenantId, { reason }),
    onSuccess: () => {
      toast.success("Tenant suspended.");
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
      setShowSuspendForm(false);
    },
    onError: (err: any) => toast.error(err.message),
  });

  const { mutate: activate, isPending: isActivating } = useMutation({
    mutationFn: () => activateTenant(tenantId),
    onSuccess: () => {
      toast.success("Tenant activated.");
      queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  if (isLoading || !data) return <p className="text-sm text-muted-foreground">Loading...</p>;

  const { tenant, membersByRole, invitationsByStatus } = data;

  return (
    <div className="space-y-6">
      <button onClick={() => router.push("/admin/dashboard/tenants-management")} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-4" /> Back to tenants
      </button>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">{tenant.name}</h2>
            <p className="text-sm text-muted-foreground">Plan: {tenant.plan?.name || "None"}</p>
          </div>
          {tenant.isActive ? (
            <button onClick={() => setShowSuspendForm(!showSuspendForm)} className="flex items-center gap-1 rounded-md bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors">
              <PauseCircle className="size-3.5" /> Suspend
            </button>
          ) : (
            <button onClick={() => activate()} disabled={isActivating} className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors disabled:opacity-50">
              {isActivating && <Loader2 className="size-3.5 animate-spin" />} Activate
            </button>
          )}
        </div>

        {showSuspendForm && (
          <div className="mt-4 flex gap-2">
            <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason for suspension" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" />
            <button onClick={() => suspend()} disabled={isSuspending || reason.trim().length < 3} className="rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50">
              {isSuspending ? "Suspending..." : "Confirm"}
            </button>
          </div>
        )}

        {!tenant.isActive && tenant.suspensionReason && (
          <p className="mt-3 text-sm text-destructive">Reason: {tenant.suspensionReason}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Members by role</h3>
          {membersByRole.map((m: any) => (
            <div key={m.role} className="flex justify-between py-1 text-sm text-muted-foreground">
              <span>{m.role.replace("_", " ")}</span> <span className="text-foreground">{m.count}</span>
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-3 text-sm font-semibold text-foreground">Invitations by status</h3>
          {invitationsByStatus.map((i: any) => (
            <div key={i.status} className="flex justify-between py-1 text-sm text-muted-foreground">
              <span>{i.status}</span> <span className="text-foreground">{i.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}