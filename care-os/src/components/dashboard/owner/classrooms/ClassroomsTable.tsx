/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getClassrooms, IClassroom } from "@/services/classroom.services";
import { getBranches } from "@/services/branch.services";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, Loader2, Plus } from "lucide-react";
import CreateClassroomModal from "./CreateClassroomModal";
import ClassroomRowActions from "./ClassroomRowActions";

export default function ClassroomsTable({
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
    queryKey: ["classrooms", currentQueryString, sortOrder],
    queryFn: () =>
      getClassrooms(
        `${currentQueryString}&sortBy=createdAt&sortOrder=${sortOrder}`,
      ),
  });

  const { data: branchesData } = useQuery({
    queryKey: ["branches", "for-classroom-select"],
    queryFn: () => getBranches("limit=100"),
  });

  const classrooms = data?.data || [];
  const meta = data?.meta;
  const branches = (branchesData?.data || []).map((b: any) => ({
    id: b.id,
    name: b.name,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search classrooms by name or age group..."
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
          Add Classroom
        </button>
      </div>

      <div className="rounded-md border border-border bg-card">
        <table className="w-full text-left text-sm text-muted-foreground">
          <thead className="border-b border-border bg-muted/50 text-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Classroom Name</th>
              <th className="px-4 py-3 font-medium">Branch</th>
              <th className="px-4 py-3 font-medium">Age Group</th>
              <th className="px-4 py-3 font-medium">Capacity</th>
              <th className="px-4 py-3 font-medium">Ratio Limit</th>
              <th className="px-4 py-3 font-medium">Children</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-10 text-center">
                  <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
                </td>
              </tr>
            ) : classrooms.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-10 text-center text-muted-foreground"
                >
                  No classrooms found. Adjust your search or create a new one.
                </td>
              </tr>
            ) : (
              classrooms.map((classroom: IClassroom) => (
                <tr
                  key={classroom.id} onClick={() => router.push(`${basePath}/${classroom.id}`)} className="cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-foreground">
                    {classroom.name}
                  </td>
                  <td className="px-4 py-3">
                    {classroom.branch?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3">{classroom.ageGroup}</td>
                  <td className="px-4 py-3">{classroom.legalCapacity}</td>
                  <td className="px-4 py-3">{classroom.ratioLimit}</td>
                  <td className="px-4 py-3">
                    {classroom._count?.children ?? 0}
                  </td>
                  <td className="px-4 py-3 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                    <ClassroomRowActions
                      classroom={classroom}
                      branches={branches}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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

      <CreateClassroomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        branches={branches}
      />
    </div>
  );
}
