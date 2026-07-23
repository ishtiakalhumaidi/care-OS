/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBranches } from "@/services/branch.services";
import { UserPlus } from "lucide-react";
import InviteUserModal from "./InviteUserModal";
import InvitationsList from "./InvitationsList";

export default function TeamManagement() {
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  const { data: branchesData } = useQuery({
    queryKey: ["branches", "for-invite-select"],
    queryFn: () => getBranches("limit=100"),
  });

  const branches = (branchesData?.data || []).map((b: any) => ({
    id: b.id,
    name: b.name,
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <UserPlus className="size-4" />
          Invite Person
        </button>
      </div>

      <InvitationsList />

      <InviteUserModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        branches={branches}
      />
    </div>
  );
}