/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { linkGuardian, IChild } from "@/services/child.services";
import UserSearchSelect from "@/components/dashboard/shared/UserSearchSelect";
import { IUserSummary } from "@/services/user.services";
import GuardianSearchSelect from "./GuardianSearchSelect";
import { getApiErrorMessage } from "@/lib/errorUtils";

interface LinkGuardianModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: IChild;
}

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50";

export default function LinkGuardianModal({
  isOpen,
  onClose,
  child,
}: LinkGuardianModalProps) {
  const queryClient = useQueryClient();
  const [selectedGuardian, setSelectedGuardian] = useState<IUserSummary | null>(
    null,
  );
  const [relationship, setRelationship] = useState("");
  const [isPrimary, setIsPrimary] = useState(false);
  const [canPickup, setCanPickup] = useState(true);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      linkGuardian(child.id, {
        userId: selectedGuardian!.id,
        relationship,
        isPrimary,
        canPickup,
      }),
    onSuccess: () => {
      toast.success("Guardian linked successfully.");
      queryClient.invalidateQueries({ queryKey: ["children"] });
      setSelectedGuardian(null);
      setRelationship("");
      onClose();
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err, "Failed to link guardian."));
    },
  });

  if (!isOpen) return null;

  const isValid = !!selectedGuardian && relationship.trim().length >= 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Link Existing Guardian
          </h3>
          <button
            onClick={onClose}
            className="rounded-md text-muted-foreground hover:bg-muted p-1"
          >
            <X className="size-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground">
          Link an existing guardian account to{" "}
          <strong>
            {child.firstName} {child.lastName}
          </strong>
          .
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground">
              Guardian
            </label>
            {/* <GuardianSearchSelect
              value={selectedGuardian}
              onChange={setSelectedGuardian}
              disabled={isPending}
            /> */}
            <UserSearchSelect
              role="GUARDIAN"
              value={selectedGuardian}
              onChange={setSelectedGuardian}
              disabled={isPending}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">
              Relationship
            </label>
            <input
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              disabled={isPending}
              className={inputClass}
              placeholder="e.g. Father, Grandmother"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={isPrimary}
                onChange={(e) => setIsPrimary(e.target.checked)}
                disabled={isPending}
              />
              Primary guardian
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={canPickup}
                onChange={(e) => setCanPickup(e.target.checked)}
                disabled={isPending}
              />
              Can pick up
            </label>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => mutate()}
            disabled={isPending || !isValid}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Linking..." : "Link Guardian"}
          </button>
        </div>
      </div>
    </div>
  );
}
