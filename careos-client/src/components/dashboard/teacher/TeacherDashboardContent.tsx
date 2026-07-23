"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getMyClassroom } from "@/services/classroom.services";
import { Baby, Users, Gauge, ArrowRight } from "lucide-react";

export default function TeacherDashboardContent() {
  const { data, isLoading } = useQuery({
    queryKey: ["my-classroom"],
    queryFn: getMyClassroom,
  });

  const classroom = data?.data;
  const enrolledCount = classroom?._count?.children ?? 0;
  const teacherCount = classroom?._count?.users ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          Teacher Dashboard
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {classroom
            ? `Overview of ${classroom.name}.`
            : "You haven't been assigned to a classroom yet."}
        </p>
      </div>

      {!isLoading && !classroom ? (
        <div className="rounded-lg border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">
            Contact your center admin to get assigned to a classroom.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
              <dt>
                <div className="absolute rounded-lg bg-primary/10 p-3">
                  <Baby className="size-6 text-primary" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-muted-foreground">
                  Children Enrolled
                </p>
              </dt>
              <dd className="ml-16 pb-1">
                <p className="text-2xl font-semibold text-foreground">
                  {isLoading ? "..." : enrolledCount}
                </p>
              </dd>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
              <dt>
                <div className="absolute rounded-lg bg-primary/10 p-3">
                  <Gauge className="size-6 text-primary" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-muted-foreground">
                  Capacity
                </p>
              </dt>
              <dd className="ml-16 pb-1">
                <p className="text-2xl font-semibold text-foreground">
                  {isLoading
                    ? "..."
                    : `${enrolledCount}/${classroom?.legalCapacity ?? 0}`}
                </p>
              </dd>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-6 shadow-sm">
              <dt>
                <div className="absolute rounded-lg bg-primary/10 p-3">
                  <Users className="size-6 text-primary" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-muted-foreground">
                  Ratio Limit
                </p>
              </dt>
              <dd className="ml-16 pb-1">
                <p className="text-2xl font-semibold text-foreground">
                  {isLoading ? "..." : `1:${classroom?.ratioLimit ?? 0}`}
                </p>
              </dd>
            </div>
          </div>

          <Link
            href="/teacher/dashboard/my-classroom"
            className="flex items-center justify-between rounded-lg border border-border bg-card p-4 hover:bg-muted/50 transition-colors"
          >
            <span className="text-sm font-medium text-foreground">
              View classroom roster
            </span>
            <ArrowRight className="size-4 text-muted-foreground" />
          </Link>
        </>
      )}
    </div>
  );
}
