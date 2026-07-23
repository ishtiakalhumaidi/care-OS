/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import { Loader2, X } from "lucide-react";
import {
  getInvitations,
  revokeInvitation,
  IInvitation,
} from "@/services/auth.services";
import { getApiErrorMessage } from "@/lib/errorUtils";

const statusStyles: Record<IInvitation["status"], string> = {
  PENDING: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
  ACCEPTED: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  EXPIRED: "text-muted-foreground bg-muted",
};

export default function InvitationsList() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["invitations"],
    queryFn: () => getInvitations("limit=50"),
  });

  const invitations: IInvitation[] = data?.data || [];

  const {
    mutate: revoke,
    isPending,
    variables,
  } = useMutation({
    mutationFn: revokeInvitation,
    onSuccess: () => {
      toast.success("Invitation revoked.");
      queryClient.invalidateQueries({ queryKey: ["invitations"] });
    },
    onError: (err: any) => {
      toast.error(getApiErrorMessage(err, "Failed to revoke invitation."));
    },
  });

  return (
    <div className="rounded-md border border-border bg-card">
      <table className="w-full text-left text-sm text-muted-foreground">
        <thead className="border-b border-border bg-muted/50 text-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Role</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Sent</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {isLoading ? (
            <tr>
              <td colSpan={5} className="py-10 text-center">
                <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
              </td>
            </tr>
          ) : invitations.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-muted-foreground"
              >
                No invitations sent yet.
              </td>
            </tr>
          ) : (
            invitations.map((invite) => (
              <tr
                key={invite.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {invite.email}
                </td>
                <td className="px-4 py-3">{invite.role.replace("_", " ")}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-1 text-xs font-medium ${statusStyles[invite.status]}`}
                  >
                    {invite.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {format(new Date(invite.createdAt), "MMM d, yyyy")}
                </td>
                <td className="px-4 py-3 text-right">
                  {invite.status === "PENDING" && (
                    <button
                      onClick={() => revoke(invite.id)}
                      disabled={isPending && variables === invite.id}
                      className="inline-flex items-center gap-1 rounded-md bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50"
                    >
                      {isPending && variables === invite.id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <X className="size-3.5" />
                      )}
                      Revoke
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
