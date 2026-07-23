import React from "react";
import Image from "next/image";
import Link from "next/link";
import { IChild } from "@/services/child.services";
import { CheckCircle2, Clock, XCircle, PauseCircle, Baby } from "lucide-react";

interface StatusConfigEntry {
  label: string;
  icon: React.ElementType;
  className: string;
}

const statusConfig: Record<IChild["status"], StatusConfigEntry> = {
  APPLIED: {
    label: "Application pending review",
    icon: Clock,
    className: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  },
  WAITLISTED: {
    label: "Waitlisted",
    icon: Clock,
    className: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  },
  ENROLLED: {
    label: "Enrolled",
    icon: CheckCircle2,
    className: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  },
  SUSPENDED: {
    label: "Access paused — payment overdue",
    icon: PauseCircle,
    className: "text-destructive bg-destructive/10",
  },
  REJECTED: {
    label: "Application not approved",
    icon: XCircle,
    className: "text-destructive bg-destructive/10",
  },
  GRADUATED: {
    label: "Graduated",
    icon: CheckCircle2,
    className: "text-muted-foreground bg-muted",
  },
  ARCHIVED: {
    label: "Archived",
    icon: XCircle,
    className: "text-muted-foreground bg-muted",
  },
};

export default function ChildStatusCard({ child }: { child: IChild }) {
  const config = statusConfig[child.status];
  const StatusIcon = config.icon;

  return (
    <Link
      href={`/guardian/dashboard/children/${child.id}`}
      className="block rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/40"
    >
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          {child.photoUrl ? (
            <Image
              src={child.photoUrl}
              alt={child.firstName}
              width={64}
              height={64}
              className="size-16 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Baby className="size-7" />
            </div>
          )}

          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground">
              {child.firstName} {child.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">
              ID: {child.childCode}
            </p>
          </div>
        </div>

        <div
          className={`mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${config.className}`}
        >
          <StatusIcon className="size-4 shrink-0" />
          {config.label}
        </div>

        {child.status === "REJECTED" && child.rejectionReason && (
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Reason: </span>
            {child.rejectionReason}
          </p>
        )}
        {child.status === "SUSPENDED" && child.suspensionReason && (
          <p className="mt-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Reason: </span>
            {child.suspensionReason}
          </p>
        )}
        {child.branch && (
          <p className="mt-3 text-xs text-muted-foreground">
            Branch: {child.branch.name}
            {child.classroom && ` · Classroom: ${child.classroom.name}`}
          </p>
        )}
      </div>
    </Link>
  );
}
