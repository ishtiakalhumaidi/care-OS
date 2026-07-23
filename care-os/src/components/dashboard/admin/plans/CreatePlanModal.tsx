/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { createPlan } from "@/services/plan.services";

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50";

export default function CreatePlanModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ name: "", price: "", maxBranches: "", maxStudents: "" });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createPlan({
        name: form.name,
        price: Number(form.price),
        maxBranches: Number(form.maxBranches),
        maxStudents: Number(form.maxStudents),
      }),
    onSuccess: () => {
      toast.success("Plan created.");
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      onClose();
    },
    onError: (err: any) => toast.error(err.message),
  });

  if (!isOpen) return null;
  const isValid = form.name.length >= 2 && form.price !== "" && form.maxBranches !== "" && form.maxStudents !== "";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">New Plan</h3>
          <button onClick={onClose} className="rounded-md text-muted-foreground hover:bg-muted p-1">
            <X className="size-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Name</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={isPending} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground">Monthly price ($)</label>
            <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} disabled={isPending} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Max branches</label>
              <input type="number" value={form.maxBranches} onChange={(e) => setForm({ ...form, maxBranches: e.target.value })} disabled={isPending} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Max students</label>
              <input type="number" value={form.maxStudents} onChange={(e) => setForm({ ...form, maxStudents: e.target.value })} disabled={isPending} className={inputClass} />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
          <button onClick={onClose} disabled={isPending} className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50">Cancel</button>
          <button onClick={() => mutate()} disabled={isPending || !isValid} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50">
            {isPending && <Loader2 className="size-4 animate-spin" />}
            Create
          </button>
        </div>
      </div>
    </div>
  );
}