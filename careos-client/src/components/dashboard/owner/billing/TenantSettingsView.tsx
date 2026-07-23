/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTenantById, updateTenant } from "@/services/tenant.services";
import { getPlans, IPlan } from "@/services/plan.services";
import { toast } from "sonner";
import { Loader2, Check } from "lucide-react";
import UsageBar from "./UsageBar";
import { getApiErrorMessage } from "@/lib/errorUtils";

export default function TenantSettingsView({ tenantId }: { tenantId: string }) {
  const queryClient = useQueryClient();

  const { data: tenantData, isLoading: isLoadingTenant } = useQuery({
    queryKey: ["tenants", tenantId],
    queryFn: () => getTenantById(tenantId).then((res) => res.data),
  });

  const { data: plansData, isLoading: isLoadingPlans } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  const {
    mutate: changePlan,
    isPending: isChangingPlan,
    variables,
  } = useMutation({
    mutationFn: (planId: string) => {
      const formData = new FormData();
      formData.append("planId", planId);
      return updateTenant(tenantId, formData);
    },
    onSuccess: () => {
      toast.success("Plan updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["tenants", tenantId] });
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err, "Failed to change plan."));
    },
  });

  if (isLoadingTenant || isLoadingPlans) {
    return (
      <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
    );
  }

  const tenant = tenantData;
  const plans: IPlan[] = plansData?.data || [];
  const branchesUsed = tenant._count?.branches ?? 0;
  const studentsUsed = tenant._count?.children ?? 0;

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-base font-semibold text-foreground">
          Current Plan
        </h3>
        {tenant.plan ? (
          <>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {tenant.plan.name}
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ${tenant.plan.price}/mo
              </span>
            </p>
            <div className="mt-4 space-y-4">
              <UsageBar
                label="Branches"
                used={branchesUsed}
                max={tenant.plan.maxBranches}
              />
              <UsageBar
                label="Enrolled students"
                used={studentsUsed}
                max={tenant.plan.maxStudents}
              />
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            No plan assigned yet. Choose one below to get started.
          </p>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Available Plans
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => {
            const isCurrent = tenant.plan?.id === plan.id;
            const wouldExceedBranches = branchesUsed > plan.maxBranches;
            const wouldExceedStudents = studentsUsed > plan.maxStudents;
            const isBlocked =
              !isCurrent && (wouldExceedBranches || wouldExceedStudents);

            return (
              <div
                key={plan.id}
                className={`rounded-lg border p-4 ${isCurrent ? "border-primary bg-primary/5" : "border-border"}`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{plan.name}</h4>
                  {isCurrent && <Check className="size-4 text-primary" />}
                </div>
                <p className="mt-1 text-xl font-bold text-foreground">
                  ${plan.price}
                  <span className="text-xs font-normal text-muted-foreground">
                    /mo
                  </span>
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {plan.maxBranches} branch(es) · {plan.maxStudents} students
                </p>
                {isBlocked && (
                  <p className="mt-2 text-xs text-destructive">
                    Your current usage exceeds this plan&apos;s limits.
                  </p>
                )}
                <button
                  onClick={() => changePlan(plan.id)}
                  disabled={isCurrent || isBlocked || isChangingPlan}
                  className="mt-3 w-full rounded-md border border-input bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted transition-colors disabled:opacity-50"
                >
                  {isChangingPlan && variables === plan.id ? (
                    <Loader2 className="mx-auto size-3.5 animate-spin" />
                  ) : isCurrent ? (
                    "Current Plan"
                  ) : (
                    "Switch to this plan"
                  )}
                </button>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Payment processing isn&apos;t connected yet — plan changes apply
          immediately at no charge for now.
        </p>
      </div>
    </div>
  );
}
