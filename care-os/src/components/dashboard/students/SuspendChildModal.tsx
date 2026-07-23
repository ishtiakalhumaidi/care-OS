/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { suspendChild, IChild } from "@/services/child.services";
import { getApiErrorMessage } from "@/lib/errorUtils";

export default function SuspendChildModal({
  isOpen,
  onClose,
  child,
}: {
  isOpen: boolean;
  onClose: () => void;
  child: IChild;
}) {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () => suspendChild(child.id, { reason }),
    onSuccess: () => {
      toast.success("Child suspended.");
      queryClient.invalidateQueries({ queryKey: ["children"] });
      onClose();
    },
    onError: (err: any) =>
      toast.error(getApiErrorMessage(err, "Failed to suspend child.")),
  });

  if (!isOpen) return null;
  const isValid = reason.trim().length >= 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">
            Suspend Student
          </h3>
          <button
            onClick={onClose}
            className="rounded-md text-muted-foreground hover:bg-muted p-1"
          >
            <X className="size-5" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          {child.firstName} {child.lastName} will lose access until reactivated.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={isPending}
          rows={3}
          placeholder="e.g. Payment overdue"
          className="mt-4 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
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
            className="flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Suspending..." : "Suspend"}
          </button>
        </div>
      </div>
    </div>
  );
}
