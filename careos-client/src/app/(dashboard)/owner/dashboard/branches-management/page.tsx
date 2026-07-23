import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getBranches } from "@/services/branch.services";
import BranchesTable from "@/components/dashboard/owner/branches/BranchesTable";
import React from "react";

export default async function BranchesManagementPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const queryParamsObjects = await searchParams;

  // Construct the exact query string your backend QueryBuilder expects
  const queryString = Object.keys(queryParamsObjects)
    .map((key) => {
      const value = queryParamsObjects[key];
      if (value === undefined) return "";
      if (Array.isArray(value)) {
        return value
          .map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
          )
          .join("&");
      }
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .filter(Boolean)
    .join("&");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["branches", queryString],
    queryFn: () => getBranches(queryString),
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Branches
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your physical center locations. Search by name or address.
          </p>
        </div>

        {/* Pass the initial query string down to the client component */}
        <BranchesTable
          initialQueryString={queryString}
          basePath="/owner/dashboard/branches-management"
        />
      </div>
    </HydrationBoundary>
  );
}
