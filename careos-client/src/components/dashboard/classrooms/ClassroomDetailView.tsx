/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getClassroomById,
  unassignTeacher,
  IClassroom,
} from "@/services/classroom.services";
import { ArrowLeft, School, UserPlus, Baby } from "lucide-react";
import { toast } from "sonner";
import AssignTeacherModal from "./AssignTeacherModal";

export default function ClassroomDetailView({
  classroomId,
  basePath,
  studentsBasePath,
}: {
  classroomId: string;
  basePath: string;
  studentsBasePath: string;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["classrooms", classroomId],
    queryFn: () =>
      getClassroomById(classroomId).then((res) => res.data as IClassroom),
  });

  const { mutate: removeTeacher } = useMutation({
    mutationFn: (userId: string) => unassignTeacher(classroomId, userId),
    onSuccess: () => {
      toast.success("Teacher removed.");
      queryClient.invalidateQueries({ queryKey: ["classrooms", classroomId] });
    },
    onError: (err: any) => toast.error(err.message),
  });

  if (isLoading || !data) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const classroom = data;
  const enrolledCount = classroom._count?.children ?? 0;
  const isFull = enrolledCount >= classroom.legalCapacity;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push(basePath)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to classrooms
      </button>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <School className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {classroom.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {classroom.ageGroup} · {classroom.branch?.name}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Capacity</p>
            <p
              className={`text-sm font-medium ${isFull ? "text-destructive" : "text-foreground"}`}
            >
              {enrolledCount} / {classroom.legalCapacity}
              {isFull && " (Full)"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ratio limit</p>
            <p className="text-sm font-medium text-foreground">
              1 : {classroom.ratioLimit}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Teachers assigned</p>
            <p className="text-sm font-medium text-foreground">
              {classroom._count?.users ?? 0}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Teachers</h3>
          <button
            onClick={() => setIsAssignOpen(true)}
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <UserPlus className="size-3.5" /> Assign Teacher
          </button>
        </div>
        {!classroom.users || classroom.users.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No teacher assigned yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {classroom.users.map((u) => (
              <li
                key={u.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-foreground">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <button
                  onClick={() => removeTeacher(u.id)}
                  className="text-xs text-destructive hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          Enrolled children
        </h3>
        {!classroom.children || classroom.children.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No children enrolled in this classroom yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {classroom.children.map((c) => (
              <li
                key={c.id}
                onClick={() => router.push(`${studentsBasePath}/${c.id}`)}
                className="flex cursor-pointer items-center gap-3 py-3 text-sm hover:bg-muted/50 transition-colors"
              >
                {c.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.photoUrl}
                    alt={c.firstName}
                    className="size-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Baby className="size-4" />
                  </div>
                )}
                <span className="font-medium text-foreground">
                  {c.firstName} {c.lastName}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AssignTeacherModal
        isOpen={isAssignOpen}
        onClose={() => setIsAssignOpen(false)}
        classroomId={classroom.id}
        branchId={classroom.branchId}
      />
    </div>
  );
}
