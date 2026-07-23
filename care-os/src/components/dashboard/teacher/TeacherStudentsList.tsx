"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getChildren, IChild } from "@/services/child.services";
import { Loader2, Baby } from "lucide-react";

export default function TeacherStudentsList() {
  const { data, isLoading } = useQuery({
    queryKey: ["children", "teacher-view"],
    queryFn: () => getChildren("status=ENROLLED&limit=50"),
  });

  const children: IChild[] = data?.data || [];

  return (
    <div className="rounded-md border border-border bg-card">
      <table className="w-full text-left text-sm text-muted-foreground">
        <thead className="border-b border-border bg-muted/50 text-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Child</th>
            <th className="px-4 py-3 font-medium">Classroom</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {isLoading ? (
            <tr>
              <td colSpan={3} className="py-10 text-center">
                <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />
              </td>
            </tr>
          ) : children.length === 0 ? (
            <tr>
              <td colSpan={3} className="py-10 text-center text-muted-foreground">
                No enrolled students yet.
              </td>
            </tr>
          ) : (
            children.map((child) => (
              <tr key={child.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {child.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={child.photoUrl} alt={child.firstName} className="size-8 rounded-full object-cover" />
                    ) : (
                      <div className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <Baby className="size-4" />
                      </div>
                    )}
                    <span className="font-medium text-foreground">
                      {child.firstName} {child.lastName}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">{child.classroom?.name || "Unassigned"}</td>
                <td className="px-4 py-3">{child.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}