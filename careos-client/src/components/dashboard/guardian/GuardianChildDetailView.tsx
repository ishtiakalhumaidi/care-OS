"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Baby, Loader2 } from "lucide-react";
import { getMyChildById, IChild } from "@/services/child.services";
import ManagePickupsCard from "./ManagePickupsCard";

export default function GuardianChildDetailView({ childId }: { childId: string }) {
  const { data, isLoading, isError, error } = useQuery<IChild>({
    queryKey: ["my-child", childId],
    queryFn: () => getMyChildById(childId).then((res) => res.data),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-sm text-destructive">
        {(error as Error)?.message || "Failed to load child details"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        href="/guardian/dashboard"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to dashboard
      </Link>

      <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-6">
        {data.photoUrl ? (
          <Image
            src={data.photoUrl}
            alt={data.firstName}
            width={72}
            height={72}
            className="size-18 rounded-full object-cover border border-border"
          />
        ) : (
          <div className="flex size-18 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Baby className="size-8" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {data.firstName} {data.lastName}
          </h1>
          <p className="text-sm text-muted-foreground">ID: {data.childCode}</p>
          {data.branch && (
            <p className="mt-1 text-xs text-muted-foreground">
              {data.branch.name}
              {data.classroom && ` · ${data.classroom.name}`}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Medical notes</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {data.medicalNotes || "None on file"}
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">Allergies</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {data.allergies || "None on file"}
          </p>
        </div>
      </div>

      <ManagePickupsCard
        childId={childId}
        guardians={data.guardians || []}
        viewerLink={data.viewerLink}
      />
    </div>
  );
}