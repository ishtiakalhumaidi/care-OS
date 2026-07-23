/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { deleteClassroom, IClassroom } from "@/services/classroom.services";
import EditClassroomModal from "./EditClassroomModal";
import { getApiErrorMessage } from "@/lib/errorUtils";

export default function ClassroomRowActions({
  classroom,
  branches,
}: {
  classroom: IClassroom;
  branches: { id: string; name: string }[];
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: removeClassroom, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteClassroom(classroom.id),
    onSuccess: () => {
      toast.success("Classroom deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["classrooms"] });
      setIsDeleteDialogOpen(false);
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err, "Failed to delete classroom."));
      setIsDeleteDialogOpen(false);
    },
  });

  return (
    <>
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={() => setIsEditOpen(true)}
          className="text-primary hover:text-primary/80 transition-colors"
          title="Edit Classroom"
        >
          <Pencil className="size-4" />
        </button>
        <button
          onClick={() => setIsDeleteDialogOpen(true)}
          className="text-destructive hover:text-destructive/80 transition-colors"
          title="Delete Classroom"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <EditClassroomModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        classroom={classroom}
        branches={branches}
      />

      {isDeleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-lg border border-border bg-card p-6 shadow-lg text-left">
            <h3 className="text-lg font-semibold text-foreground text-left">
              Delete Classroom
            </h3>
            <p className="mt-2 text-sm text-muted-foreground text-left">
              Are you sure you want to delete <strong>{classroom.name}</strong>?
              This action cannot be undone. Classrooms with assigned children or
              staff cannot be deleted — reassign them first.
            </p>
            <div className="mt-6 flex justify-start gap-3">
              <button
                onClick={() => removeClassroom()}
                disabled={isDeleting}
                className="flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
              >
                {isDeleting && <Loader2 className="size-4 animate-spin" />}
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isDeleting}
                className="rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
