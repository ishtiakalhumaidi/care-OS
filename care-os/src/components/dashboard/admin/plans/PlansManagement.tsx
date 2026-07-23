/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Plus, Sparkles, Trash2 } from "lucide-react";
import { getPlans, deletePlan, seedDefaultPlans, IPlan } from "@/services/plan.services";
import CreatePlanModal from "./CreatePlanModal";
import EditPlanModal from "./EditPlanModal";

export default function PlansManagement() {
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<IPlan | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  const plans: IPlan[] = data?.data || [];

  const { mutate: seed, isPending: isSeeding } = useMutation({
    mutationFn: seedDefaultPlans,
    onSuccess: () => {
      toast.success("Default plans created.");
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  const { mutate: remove } = useMutation({
    mutationFn: deletePlan,
    onSuccess: () => {
      toast.success("Plan deleted.");
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  if (isLoading) {
    return <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />;
  }

  if (plans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border py-16 text-center">
        <Sparkles className="size-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium text-foreground">No subscription plans yet</p>
          <p className="text-sm text-muted-foreground">Create default plans to get started, or add one manually.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => seed()}
            disabled={isSeeding}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isSeeding && <Loader2 className="size-4 animate-spin" />}
            {isSeeding ? "Seeding..." : "Seed Default Plans"}
          </button>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
          >
            Add Manually
          </button>
        </div>
        <CreatePlanModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsCreateOpen(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" /> Add Plan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <button onClick={() => remove(plan.id)} className="text-muted-foreground hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
            </div>
            <p className="mt-1 text-2xl font-bold text-foreground">${plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              <p>Up to {plan.maxBranches} branch(es)</p>
              <p>Up to {plan.maxStudents} students</p>
              <p>{plan._count?.tenants ?? 0} tenant(s) subscribed</p>
            </div>
            <button
              onClick={() => setEditTarget(plan)}
              className="mt-4 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <CreatePlanModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      {editTarget && (
        <EditPlanModal isOpen={!!editTarget} onClose={() => setEditTarget(null)} plan={editTarget} />
      )}
    </div>
  );
}