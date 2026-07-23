"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBranches, IBranch } from "@/services/branch.services";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, Loader2, Plus } from "lucide-react";
import { format } from "date-fns";
import CreateBranchModal from "./CreateBranchModal";
import BranchRowActions from "./BranchRowActions";

export default function BranchesTable({
  initialQueryString,
  basePath,
}: {
  initialQueryString: string;
  basePath: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sortOrder, setSortOrder] = useState("desc");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || "",
  );
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set("searchTerm", debouncedSearchTerm);
    if (page > 1) params.set("page", page.toString());
    params.set("limit", limit.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearchTerm, page, router, pathname]);

  const currentQueryString = searchParams.toString();
  const { data, isLoading } = useQuery({
    queryKey: ["branches", currentQueryString, sortOrder],
    queryFn: () =>
      getBranches(
        `${currentQueryString}&sortBy=createdAt&sortOrder=${sortOrder}`,
      ),
  });

  const branches = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="space-y-4">
      {/* Search and Action Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search branches by name or address..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
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
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" />
          Add Branch
        </button>
      </div>

      {/* Data Table */}
      <div className="rounded-md border border-border bg-card">
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="border-b border-border bg-muted/50 text-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Branch Name</th>
              <th className="px-4 py-3 font-medium">Address</th>
              <th className="px-4 py-3 font-medium">Phone</th>
              <th className="px-4 py-3 font-medium">Timezone</th>
              <th className="px-4 py-3 font-medium">Created At</th>
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
            ) : branches.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-muted-foreground"
                >
                  No branches found. Adjust your search or create a new one.
                </td>
              </tr>
            ) : (
              branches.map((branch: IBranch) => (
                <tr
                  key={branch.id}
                  onClick={() => router.push(`${basePath}/${branch.id}`)}
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {branch.name}
                  </td>
                  <td className="px-4 py-3 truncate max-w-xs">
                    {branch.address}
                  </td>
                  <td className="px-4 py-3">{branch.contactPhone || "N/A"}</td>
                  <td className="px-4 py-3">{branch.timezone || "N/A"}</td>
                  <td className="px-4 py-3">
                    {format(new Date(branch.createdAt), "MMM d, yyyy")}
                  </td>
                  <td
                    className="px-4 py-3 text-right pr-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <BranchRowActions branch={branch} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {meta && meta.total > limit && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground">
              {(page - 1) * limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium text-foreground">
              {Math.min(page * limit, meta.total)}
            </span>{" "}
            of <span className="font-medium text-foreground">{meta.total}</span>{" "}
            results
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page * limit >= meta.total}
              className="rounded-md border border-input bg-background px-3 py-1 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <CreateBranchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
