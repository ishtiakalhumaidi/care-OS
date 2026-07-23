"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getChildren, IChild } from "@/services/child.services";
import { Loader2, Baby, Check, X as XIcon, Search } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import ApproveChildModal from "./ApproveChildModal";
import RejectChildModal from "./RejectChildModal";

const tabs = [
  { label: "Applied", value: "APPLIED" },
  { label: "Enrolled", value: "ENROLLED" },
  { label: "Suspended", value: "SUSPENDED" },
  { label: "Rejected", value: "REJECTED" },
] as const;

export default function StudentsTable({ basePath }: { basePath: string }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("APPLIED");
  const [approveTarget, setApproveTarget] = useState<IChild | null>(null);
  const [rejectTarget, setRejectTarget] = useState<IChild | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const debouncedSearch = useDebounce(searchTerm, 400);

  const { data, isLoading } = useQuery({
    queryKey: ["children", `status=${activeTab}`, debouncedSearch, sortOrder],
    queryFn: () =>
      getChildren(
        `status=${activeTab}&limit=50&sortBy=createdAt&sortOrder=${sortOrder}${debouncedSearch ? `&searchTerm=${encodeURIComponent(debouncedSearch)}` : ""}`,
      ),
  });

  const children: IChild[] = data?.data || [];

  return (
    <div className="space-y-4">
      {/* Search and Sort Action Bar */}
      <div className="flex items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or child ID..."
            className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-4 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>
      
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.value
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-md border border-border bg-card">
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="border-b border-border bg-muted/50 text-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Child</th>
              <th className="px-4 py-3 font-medium">Branch</th>
              <th className="px-4 py-3 font-medium">Classroom</th>
              {activeTab === "APPLIED" && (
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-10 text-center">
                  <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
                </td>
              </tr>
            ) : children.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-10 text-center text-muted-foreground"
                >
                  No students in this category.
                </td>
              </tr>
            ) : (
              children.map((child) => (
                <tr
                  key={child.id}
                  onClick={() => router.push(`${basePath}/${child.id}`)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {child.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={child.photoUrl}
                          alt={child.firstName}
                          className="size-9 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
                          <Baby className="size-4" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-foreground">
                          {child.firstName} {child.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {child.childCode}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{child.branch?.name || "N/A"}</td>
                  <td className="px-4 py-3">
                    {child.classroom?.name || "Unassigned"}
                  </td>
                  {activeTab === "APPLIED" && (
                    <td
                      className="px-4 py-3 text-right"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => setApproveTarget(child)}
                          className="flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
                        >
                          <Check className="size-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => setRejectTarget(child)}
                          className="flex items-center gap-1 rounded-md bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
                        >
                          <XIcon className="size-3.5" /> Reject
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {approveTarget && (
        <ApproveChildModal
          isOpen={!!approveTarget}
          onClose={() => setApproveTarget(null)}
          child={approveTarget}
        />
      )}
      {rejectTarget && (
        <RejectChildModal
          isOpen={!!rejectTarget}
          onClose={() => setRejectTarget(null)}
          child={rejectTarget}
        />
      )}
    </div>
  );
}