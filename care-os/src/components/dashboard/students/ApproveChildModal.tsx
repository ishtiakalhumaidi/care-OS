/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import { approveChild, IChild } from "@/services/child.services";
import { getClassrooms } from "@/services/classroom.services";
import { getApiErrorMessage } from "@/lib/errorUtils";

interface ApproveChildModalProps {
  isOpen: boolean;
  onClose: () => void;
  child: IChild;
}

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50";

export default function ApproveChildModal({ isOpen, onClose, child }: ApproveChildModalProps) {
  const queryClient = useQueryClient();
  const [classroomId, setClassroomId] = React.useState("");

  const { data: classroomsData, isLoading: isLoadingClassrooms } = useQuery({
    queryKey: ["classrooms", "for-approval", child.branchId],
    queryFn: () => getClassrooms(`branchId=${child.branchId}&limit=100`),
    enabled: isOpen,
  });

  const classrooms = classroomsData?.data || [];

  const { mutate, isPending } = useMutation({
    mutationFn: () => approveChild(child.id, classroomId ? { classroomId } : {}),
    onSuccess: () => {
      toast.success(`${child.firstName} ${child.lastName} enrolled successfully.`);
      queryClient.invalidateQueries({ queryKey: ["children"] });
      onClose();
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err, "Failed to approve application."));
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Approve Application</h3>
          <button onClick={onClose} className="rounded-md text-muted-foreground hover:bg-muted p-1">
            <X className="size-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground">
          Enroll <strong>{child.firstName} {child.lastName}</strong> at{" "}
          {child.branch?.name || "this branch"}.
        </p>

        <div className="mt-4">
          <label className="block text-sm font-medium text-foreground">
            Assign classroom <span className="text-muted-foreground">(optional)</span>
          </label>
          <select
            value={classroomId}
            onChange={(e) => setClassroomId(e.target.value)}
            disabled={isPending || isLoadingClassrooms}
            className={inputClass}
          >
            <option value="">Assign later</option>
            {classrooms.map((c: any) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {!isLoadingClassrooms && classrooms.length === 0 && (
            <p className="mt-1 text-xs text-muted-foreground">
              No classrooms exist at this branch yet — you can assign one later.
            </p>
          )}
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
            disabled={isPending}
            className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {isPending ? "Enrolling..." : "Approve & Enroll"}
          </button>
        </div>
      </div>
    </div>
  );
}