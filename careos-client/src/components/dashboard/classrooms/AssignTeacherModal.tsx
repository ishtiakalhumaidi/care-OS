/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { assignTeacher } from "@/services/classroom.services";
import { IUserSummary } from "@/services/user.services";
import UserSearchSelect from "@/components/dashboard/shared/UserSearchSelect";
import { getApiErrorMessage } from "@/lib/errorUtils";

export default function AssignTeacherModal({
  isOpen,
  onClose,
  classroomId,
  branchId,
}: {
  isOpen: boolean;
  onClose: () => void;
  classroomId: string;
  branchId: string;
}) {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<IUserSummary | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: () => assignTeacher(classroomId, selected!.id),
    onSuccess: () => {
      toast.success("Teacher assigned.");
      queryClient.invalidateQueries({ queryKey: ["classrooms", classroomId] });
      setSelected(null);
      onClose();
    },
    onError: (err: any) => toast.error(getApiErrorMessage(err, "Failed to assign teacher.")),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Assign Teacher</h3>
          <button onClick={onClose} className="rounded-md text-muted-foreground hover:bg-muted p-1">
            <X className="size-5" />
          </button>
        </div>
        <label className="block text-sm font-medium text-foreground">Teacher</label>
        <UserSearchSelect role="TEACHER" branchId={branchId} value={selected} onChange={setSelected} disabled={isPending} />
        <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
          <button type="button" onClick={onClose} disabled={isPending} className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50">
            Cancel
          </button>
          <button onClick={() => mutate()} disabled={isPending || !selected} className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50">
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}