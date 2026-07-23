/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import {
  updateClassroom,
  IUpdateClassroomPayload,
  IClassroom,
} from "@/services/classroom.services";
import { getApiErrorMessage } from "@/lib/errorUtils";

const classroomSchema = z.object({
  name: z.string().min(2, "Classroom name must be at least 2 characters"),
  ageGroup: z.string().min(2, "Age group description is required"),
  legalCapacity: z.coerce.number().int().positive("Capacity must be greater than 0"),
  ratioLimit: z.coerce.number().int().positive("Ratio limit must be greater than 0"),
  branchId: z.string().uuid("Please select a branch"),
});

const validateWithZod =
  (schema: z.ZodTypeAny) =>
  ({ value }: { value: any }) => {
    const result = schema.safeParse(value);
    if (!result.success) return result.error.errors[0].message;
    return undefined;
  };

interface EditClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  classroom: IClassroom;
  branches: { id: string; name: string }[];
}

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50";

export default function EditClassroomModal({
  isOpen,
  onClose,
  classroom,
  branches,
}: EditClassroomModalProps) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: IUpdateClassroomPayload) => updateClassroom(classroom.id, data),
    onSuccess: () => {
      toast.success("Classroom updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["classrooms"] });
      onClose();
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err, "Failed to update classroom."));
    },
  });

  const form = useForm({
    defaultValues: {
      name: classroom.name,
      ageGroup: classroom.ageGroup,
      legalCapacity: classroom.legalCapacity,
      ratioLimit: classroom.ratioLimit,
      branchId: classroom.branchId,
    },
    onSubmit: ({ value }) => {
      mutate(value as IUpdateClassroomPayload);
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Edit Classroom</h3>
          <button
            onClick={onClose}
            className="rounded-md text-muted-foreground hover:bg-muted hover:text-foreground p-1 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <form.Field
            name="branchId"
            validators={{ onChange: validateWithZod(classroomSchema.shape.branchId) }}
          >
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-foreground">Branch</label>
                <select
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  className={inputClass}
                >
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                    </option>
                  ))}
                </select>
                {field.state.meta.errors[0] && (
                  <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="name" validators={{ onChange: validateWithZod(classroomSchema.shape.name) }}>
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-foreground">Classroom Name</label>
                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  className={inputClass}
                />
                {field.state.meta.errors[0] && (
                  <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="ageGroup" validators={{ onChange: validateWithZod(classroomSchema.shape.ageGroup) }}>
            {(field) => (
              <div>
                <label className="block text-sm font-medium text-foreground">Age Group</label>
                <input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  disabled={isPending}
                  className={inputClass}
                />
                {field.state.meta.errors[0] && (
                  <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
                )}
              </div>
            )}
          </form.Field>

          <div className="grid grid-cols-2 gap-4">
            <form.Field
              name="legalCapacity"
              validators={{ onChange: validateWithZod(classroomSchema.shape.legalCapacity) }}
            >
              {(field) => (
                <div>
                  <label className="block text-sm font-medium text-foreground">Max Capacity</label>
                  <input
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    disabled={isPending}
                    className={inputClass}
                  />
                  {field.state.meta.errors[0] && (
                    <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            </form.Field>

            <form.Field
              name="ratioLimit"
              validators={{ onChange: validateWithZod(classroomSchema.shape.ratioLimit) }}
            >
              {(field) => (
                <div>
                  <label className="block text-sm font-medium text-foreground">Staff Ratio Limit</label>
                  <input
                    type="number"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    disabled={isPending}
                    className={inputClass}
                  />
                  {field.state.meta.errors[0] && (
                    <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
                  )}
                </div>
              )}
            </form.Field>
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
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              {isPending ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}