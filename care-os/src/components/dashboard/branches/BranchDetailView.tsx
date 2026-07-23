/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBranchById } from "@/services/branch.services";
import { ArrowLeft, Building, School } from "lucide-react";

export default function BranchDetailView({
  branchId,
  basePath,
  classroomsBasePath,
}: {
  branchId: string;
  basePath: string;
  classroomsBasePath: string;
}) {
  const router = useRouter();

  const { data, isLoading } = useQuery({
    queryKey: ["branches", branchId],
    queryFn: () => getBranchById(branchId).then((res) => res.data),
  });

  if (isLoading || !data) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const branch = data;
  const classrooms = branch.classrooms || [];

  return (
    <div className="space-y-6">
      <button onClick={() => router.push(basePath)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="size-4" /> Back to branches
      </button>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Building className="size-6" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{branch.name}</h2>
            <p className="text-sm text-muted-foreground">{branch.address}</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="mb-4 text-base font-semibold text-foreground">Classrooms ({classrooms.length})</h3>
        {classrooms.length === 0 ? (
          <p className="text-sm text-muted-foreground">No classrooms at this branch yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {classrooms.map((c: any) => {
              const enrolled = c._count?.children ?? 0;
              const isFull = enrolled >= c.legalCapacity;
              return (
                <li
                  key={c.id}
                  onClick={() => router.push(`${classroomsBasePath}/${c.id}`)}
                  className="flex cursor-pointer items-center justify-between py-3 text-sm hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <School className="size-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.ageGroup}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-medium ${isFull ? "text-destructive" : "text-muted-foreground"}`}>
                    {enrolled}/{c.legalCapacity}{isFull ? " (Full)" : ""}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}