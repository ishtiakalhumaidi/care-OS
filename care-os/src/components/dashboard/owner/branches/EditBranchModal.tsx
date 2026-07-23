/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { updateBranch, IUpdateBranchPayload, IBranch } from "@/services/branch.services";

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50";

export default function EditBranchModal({
  isOpen,
  onClose,
  branch,
}: {
  isOpen: boolean;
  onClose: () => void;
  branch: IBranch | null;
}) {
  const queryClient = useQueryClient();
  
 
  const [form, setForm] = useState(() => ({
    name: branch?.name || "",
    address: branch?.address || "",
    city: branch?.city || "",
    state: branch?.state || "",
    postalCode: branch?.postalCode || "",
    country: branch?.country || "",
    contactEmail: branch?.contactEmail || "",
    contactPhone: branch?.contactPhone || "",
    licenseNumber: branch?.licenseNumber || "",
    openTime: branch?.openTime || "",
    closeTime: branch?.closeTime || "",
  }));

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateBranch(branch!.id, form as IUpdateBranchPayload),
    onSuccess: () => {
      toast.success("Branch updated.");
      queryClient.invalidateQueries({ queryKey: ["branches"] });
      onClose();
    },
    onError: (err: any) => toast.error(err.message || "Failed to update branch."),
  });

  if (!isOpen || !branch) return null;

  const isValid = form.name.length >= 2 && form.address.length >= 5;
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Edit Branch</h3>
          <button onClick={onClose} className="rounded-md text-muted-foreground hover:bg-muted p-1">
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">Branch Name</label>
            <input value={form.name} onChange={set("name")} disabled={isPending} className={inputClass} placeholder="e.g., Downtown Campus" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Address</label>
            <input value={form.address} onChange={set("address")} disabled={isPending} className={inputClass} placeholder="123 Education St..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input value={form.city} onChange={set("city")} disabled={isPending} className={inputClass} placeholder="City" />
            <input value={form.state} onChange={set("state")} disabled={isPending} className={inputClass} placeholder="State / Region" />
            <input value={form.postalCode} onChange={set("postalCode")} disabled={isPending} className={inputClass} placeholder="Postal code" />
            <input value={form.country} onChange={set("country")} disabled={isPending} className={inputClass} placeholder="Country" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Contact Email</label>
              <input type="email" value={form.contactEmail} onChange={set("contactEmail")} disabled={isPending} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Contact Phone</label>
              <input value={form.contactPhone} onChange={set("contactPhone")} disabled={isPending} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">License Number</label>
            <input value={form.licenseNumber} onChange={set("licenseNumber")} disabled={isPending} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground">Opens</label>
              <input type="time" value={form.openTime} onChange={set("openTime")} disabled={isPending} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">Closes</label>
              <input type="time" value={form.closeTime} onChange={set("closeTime")} disabled={isPending} className={inputClass} />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={() => mutate()} disabled={isPending || !isValid} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}