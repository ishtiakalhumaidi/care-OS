"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUsers, IUserSummary } from "@/services/user.services";
import { useDebounce } from "@/hooks/useDebounce";
import { Search, Loader2, X } from "lucide-react";

interface GuardianSearchSelectProps {
  value: IUserSummary | null;
  onChange: (user: IUserSummary | null) => void;
  disabled?: boolean;
}

export default function GuardianSearchSelect({ value, onChange, disabled }: GuardianSearchSelectProps) {
  const [term, setTerm] = useState("");
  const debouncedTerm = useDebounce(term, 400);

  const { data, isLoading } = useQuery({
    queryKey: ["users", "guardian-search", debouncedTerm],
    queryFn: () => getUsers(`role=GUARDIAN&searchTerm=${encodeURIComponent(debouncedTerm)}&limit=10`),
    enabled: debouncedTerm.length >= 2,
  });

  const results: IUserSummary[] = data?.data || [];

  if (value) {
    return (
      <div className="mt-1.5 flex items-center justify-between rounded-md border border-input bg-muted px-3 py-2 text-sm">
        <div>
          <p className="font-medium text-foreground">{value.name}</p>
          <p className="text-xs text-muted-foreground">{value.email}</p>
        </div>
        <button type="button" onClick={() => onChange(null)} disabled={disabled} className="text-muted-foreground hover:text-foreground">
          <X className="size-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative mt-1.5">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          disabled={disabled}
          placeholder="Search guardian by name or email..."
          className="w-full rounded-md border border-input bg-background py-2 pl-9 pr-3 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
        />
      </div>

      {debouncedTerm.length >= 2 && (
        <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto rounded-md border border-border bg-popover shadow-lg">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : results.length === 0 ? (
            <p className="px-3 py-3 text-sm text-muted-foreground">No guardians found.</p>
          ) : (
            results.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => {
                  onChange(user);
                  setTerm("");
                }}
                className="flex w-full flex-col items-start px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
              >
                <span className="font-medium text-foreground">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}