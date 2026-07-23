/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyClassroom } from "@/services/classroom.services";
import { Loader2, School, Baby } from "lucide-react";

export default function MyClassroomView() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-classroom"],
    queryFn: getMyClassroom,
  });

  if (isLoading)
    return (
      <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
    );

  const classroom = data?.data;

  if (!classroom) {
    return (
      <div className="rounded-lg border border-dashed border-border py-16 text-center">
        <p className="text-sm text-muted-foreground">
          You haven&apos;t been assigned to a classroom yet. Contact your center
          admin.
        </p>
      </div>
    );
  }

  const enrolledCount = classroom._count?.children ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{classroom.name}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {classroom.ageGroup} · {classroom.branch?.name} · {enrolledCount}/
          {classroom.legalCapacity} children · Ratio 1:{classroom.ratioLimit}
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-base font-semibold text-foreground">
          My students
        </h3>
        {!classroom.children || classroom.children.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No children enrolled in this classroom yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {classroom.children.map((c: any) => (
              <li key={c.id} className="flex items-center gap-3 py-3 text-sm">
                {c.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.photoUrl}
                    alt={c.firstName}
                    className="size-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
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
    </div>
  );
}
