/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getChildById, IChild } from "@/services/child.services";
import {
  Baby,
  ArrowLeft,
  UserPlus,
  Check,
  X as XIcon,
  PauseCircle,
  PlayCircle,
} from "lucide-react";
import LinkGuardianModal from "./LinkGuardianModal";
import ApproveChildModal from "./ApproveChildModal";
import RejectChildModal from "./RejectChildModal";
import SuspendChildModal from "./SuspendChildModal";
import { unlinkGuardian } from "@/services/child.services";
import { reactivateChild } from "@/services/child.services";
import { toast } from "sonner";

export default function ChildDetailView({
  childId,
  basePath,
}: {
  childId: string;
  basePath: string;
}) {
  const router = useRouter();
  const [isLinkOpen, setIsLinkOpen] = useState(false);
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [isSuspendOpen, setIsSuspendOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: removeGuardian } = useMutation({
    mutationFn: (linkId: string) => unlinkGuardian(child.id, linkId),
    onSuccess: () => {
      toast.success("Guardian removed.");
      queryClient.invalidateQueries({ queryKey: ["children", childId] });
    },
    onError: (err: any) => toast.error(err.message),
  });
  const { mutate: reactivate, isPending: isReactivating } = useMutation({
    mutationFn: () => reactivateChild(child.id),
    onSuccess: () => {
      toast.success("Child reactivated.");
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
    onError: (err: any) => toast.error(err.message || "Failed to reactivate."),
  });
  const { data, isLoading } = useQuery({
    queryKey: ["children", childId],
    queryFn: () => getChildById(childId).then((res) => res.data as IChild),
  });

  if (isLoading || !data) {
    return <p className="text-sm text-muted-foreground">Loading...</p>;
  }

  const child = data;

  return (
    <div className="space-y-6">
      <button
        onClick={() => router.push(basePath)}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to students
      </button>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex items-center gap-4">
          {child.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={child.photoUrl}
              alt={child.firstName}
              className="size-20 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Baby className="size-8" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {child.firstName} {child.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">
              ID: {child.childCode}
            </p>
            <p className="text-sm text-muted-foreground">
              {child.branch?.name || "N/A"}
              {child.classroom && ` · ${child.classroom.name}`}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-foreground">
            {child.status}
          </span>
          {child.status === "APPLIED" && (
            <>
              <button
                onClick={() => setIsApproveOpen(true)}
                className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                <Check className="size-3.5" /> Approve
              </button>
              <button
                onClick={() => setIsRejectOpen(true)}
                className="flex items-center gap-1 rounded-md bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
              >
                <XIcon className="size-3.5" /> Reject
              </button>
            </>
          )}
          {child.status === "ENROLLED" && (
            <button
              onClick={() => setIsSuspendOpen(true)}
              className="flex items-center gap-1 rounded-md bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors"
            >
              <PauseCircle className="size-3.5" /> Suspend
            </button>
          )}
          {child.status === "SUSPENDED" && (
            <>
              <span className="text-xs text-muted-foreground">
                {child.suspensionReason}
              </span>
              <button
                onClick={() => reactivate()}
                disabled={isReactivating}
                className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
              >
                <PlayCircle className="size-3.5" /> Reactivate
              </button>
            </>
          )}
        </div>

        {(child.medicalNotes || child.allergies) && (
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            {child.allergies && (
              <div>
                <p className="font-medium text-foreground">Allergies</p>
                <p className="text-muted-foreground">{child.allergies}</p>
              </div>
            )}
            {child.medicalNotes && (
              <div>
                <p className="font-medium text-foreground">Medical notes</p>
                <p className="text-muted-foreground">{child.medicalNotes}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-foreground">Guardians</h3>
          <button
            onClick={() => setIsLinkOpen(true)}
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <UserPlus className="size-3.5" /> Link Guardian
          </button>
        </div>

        {!child.guardians || child.guardians.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No guardians linked yet.
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {child.guardians.map((g) => (
              <li
                key={g.id}
                className="flex items-center justify-between py-3 text-sm"
              >
                <div>
                  <p className="font-medium text-foreground">{g.user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {g.user.email} · {g.relationship}
                  </p>
                </div>
                {g.isPrimary && (
                  <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Primary
                  </span>
                )}
                <button
                  onClick={() => removeGuardian(g.id)}
                  className="text-xs text-destructive hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <LinkGuardianModal
        isOpen={isLinkOpen}
        onClose={() => setIsLinkOpen(false)}
        child={child}
      />
      <ApproveChildModal
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        child={child}
      />
      <RejectChildModal
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        child={child}
      />
      <SuspendChildModal
        isOpen={isSuspendOpen}
        onClose={() => setIsSuspendOpen(false)}
        child={child}
      />
    </div>
  );
}
