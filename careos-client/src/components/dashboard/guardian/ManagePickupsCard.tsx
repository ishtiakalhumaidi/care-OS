"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserPlus, Trash2, ShieldCheck } from "lucide-react";
import {
  IChildGuardianEntry,
  updatePickupPermission,
  selfUnlinkGuardian,
} from "@/services/child.services";
import { getApiErrorMessage } from "@/lib/errorUtils";
import AddGuardianModal from "./AddGuardianModal";

export default function ManagePickupsCard({
  childId,
  guardians,
  viewerLink,
}: {
  childId: string;
  guardians: IChildGuardianEntry[];
  viewerLink?: IChildGuardianEntry;
}) {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const queryClient = useQueryClient();
  const isPrimary = Boolean(viewerLink?.isPrimary);

  const toggleMutation = useMutation({
    mutationFn: ({
      linkId,
      canPickup,
    }: {
      linkId: string;
      canPickup: boolean;
    }) => updatePickupPermission(childId, linkId, { canPickup }),
    onSuccess: () => {
      toast.success("Pickup permission updated");
      queryClient.invalidateQueries({ queryKey: ["my-child", childId] });
    },
    onError: (error: unknown) => toast.error(getApiErrorMessage(error)),
  });

  const removeMutation = useMutation({
    mutationFn: (linkId: string) => selfUnlinkGuardian(childId, linkId),
    onSuccess: () => {
      toast.success("Guardian removed");
      queryClient.invalidateQueries({ queryKey: ["my-child", childId] });
    },
    onError: (error: unknown) => toast.error(getApiErrorMessage(error)),
  });

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Guardians & authorized pickups
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {isPrimary
              ? "As the primary guardian, you can add guardians and control who may pick up this child."
              : "Only the primary guardian can manage this list."}
          </p>
        </div>
        {isPrimary && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90"
          >
            <UserPlus className="size-3.5" />
            Add guardian
          </button>
        )}
      </div>

      <div className="mt-4 divide-y divide-border">
        {guardians.map((g) => (
          <div key={g.id} className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-foreground flex items-center gap-1.5">
                {g.user.name}
                {g.isPrimary && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    <ShieldCheck className="size-3" />
                    Primary
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {g.user.email} · {g.relationship}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <input
                  type="checkbox"
                  checked={g.canPickup}
                  disabled={!isPrimary || toggleMutation.isPending}
                  onChange={(e) =>
                    toggleMutation.mutate({
                      linkId: g.id,
                      canPickup: e.target.checked,
                    })
                  }
                  className="size-4 rounded border-border"
                />
                Can pick up
              </label>

              {isPrimary && !g.isPrimary && (
                <button
                  onClick={() => removeMutation.mutate(g.id)}
                  disabled={removeMutation.isPending}
                  className="text-muted-foreground hover:text-destructive"
                  title="Remove guardian"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {isAddOpen && (
        <AddGuardianModal
          childId={childId}
          onClose={() => setIsAddOpen(false)}
        />
      )}
    </div>
  );
}
