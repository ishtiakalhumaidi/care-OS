/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Building2, Camera } from "lucide-react";
import { getTenantById, updateTenant } from "@/services/tenant.services";
import { getApiErrorMessage } from "@/lib/errorUtils";

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50";

function TenantProfileFormContent({ tenantId, initialData }: { tenantId: string; initialData: any }) {
  const queryClient = useQueryClient();
  const logoFileRef = useRef<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  // Initialize state directly, no useEffect required!
  const [form, setForm] = useState({
    name: initialData.name || "",
    slug: initialData.slug || "",
    contactEmail: initialData.contactEmail || "",
    contactPhone: initialData.contactPhone || "",
    website: initialData.website || "",
    addressLine1: initialData.addressLine1 || "",
    addressLine2: initialData.addressLine2 || "",
    city: initialData.city || "",
    state: initialData.state || "",
    postalCode: initialData.postalCode || "",
    country: initialData.country || "",
    timezone: initialData.timezone || "UTC",
    currency: initialData.currency || "USD",
    taxId: initialData.taxId || "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateTenant(tenantId, formData),
    onSuccess: () => {
      toast.success("Tenant profile updated.");
      queryClient.invalidateQueries({ queryKey: ["tenants", tenantId] });
    },
    onError: (err: any) => toast.error(getApiErrorMessage(err, "Failed to update tenant.")),
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Logo must be under 5MB.");
      e.target.value = "";
      return;
    }
    logoFileRef.current = file;
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    if (logoFileRef.current) formData.append("logo", logoFileRef.current);
    mutate(formData);
  };

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [key]: e.target.value });

  const displayLogo = logoPreview || initialData.logoUrl;

  return (
    <div className="space-y-6 rounded-lg border border-border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          {displayLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={displayLogo} alt={initialData.name} className="size-20 rounded-lg object-cover border border-border" />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-lg bg-muted text-muted-foreground">
              <Building2 className="size-8" />
            </div>
          )}
          <label className="absolute -right-1 -bottom-1 flex size-7 cursor-pointer items-center justify-center rounded-full border border-border bg-primary text-primary-foreground hover:bg-primary/90">
            <Camera className="size-3.5" />
            <input type="file" accept="image/*" onChange={handleLogoChange} disabled={isPending} className="hidden" />
          </label>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">Center Logo</p>
          <p className="text-xs text-muted-foreground">JPG or PNG, up to 5MB.</p>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">Center Name</label>
        <input value={form.name} onChange={set("name")} disabled={isPending} className={inputClass} />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">Slug</label>
        <input
          value={form.slug}
          onChange={(e) =>
            setForm({ ...form, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") })
          }
          disabled={isPending}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-muted-foreground">Lowercase letters, numbers, and hyphens only.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground">Contact Email</label>
          <input value={form.contactEmail} onChange={set("contactEmail")} disabled={isPending} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Contact Phone</label>
          <input value={form.contactPhone} onChange={set("contactPhone")} disabled={isPending} className={inputClass} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">Website</label>
        <input value={form.website} onChange={set("website")} disabled={isPending} className={inputClass} placeholder="https://" />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground">Head Office Address</label>
        <input value={form.addressLine1} onChange={set("addressLine1")} disabled={isPending} className={inputClass} placeholder="Address line 1" />
        <input value={form.addressLine2} onChange={set("addressLine2")} disabled={isPending} className={`${inputClass} mt-2`} placeholder="Address line 2 (optional)" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input value={form.city} onChange={set("city")} disabled={isPending} className={inputClass} placeholder="City" />
        <input value={form.state} onChange={set("state")} disabled={isPending} className={inputClass} placeholder="State / Region" />
        <input value={form.postalCode} onChange={set("postalCode")} disabled={isPending} className={inputClass} placeholder="Postal code" />
        <input value={form.country} onChange={set("country")} disabled={isPending} className={inputClass} placeholder="Country" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground">Timezone</label>
          <input value={form.timezone} onChange={set("timezone")} disabled={isPending} className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Currency</label>
          <input
            value={form.currency}
            onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })}
            disabled={isPending}
            maxLength={3}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground">Tax ID</label>
          <input value={form.taxId} onChange={set("taxId")} disabled={isPending} className={inputClass} />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isPending}
        className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {isPending ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}

export default function TenantProfileForm({ tenantId }: { tenantId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tenants", tenantId],
    queryFn: () => getTenantById(tenantId).then((res) => res.data),
  });

  if (isLoading || !data) {
    return <Loader2 className="mx-auto size-6 animate-spin text-muted-foreground" />;
  }

  return <TenantProfileFormContent tenantId={tenantId} initialData={data} />;
}