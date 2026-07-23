/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Camera, User } from "lucide-react";
import { updateMe, IMe } from "@/services/user.services";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

const validateWithZod = (schema: z.ZodTypeAny) => ({ value }: { value: any }) => {
  const result = schema.safeParse(value);
  if (!result.success) return result.error.errors[0].message;
  return undefined;
};

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50";

export default function ProfileForm({ user }: { user: IMe }) {
  const queryClient = useQueryClient();
  const avatarFileRef = useRef<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: updateMe,
    onSuccess: () => {
      toast.success("Profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update profile.");
    },
  });

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      e.target.value = "";
      return;
    }
    avatarFileRef.current = file;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const form = useForm({
    defaultValues: {
      name: user.name,
    },
    onSubmit: ({ value }) => {
      const result = profileSchema.safeParse(value);
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        return;
      }

      const formData = new FormData();
      formData.append("name", value.name);
      if (avatarFileRef.current) formData.append("avatar", avatarFileRef.current);

      mutate(formData);
    },
  });

  const displayImage = avatarPreview || user.image;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-6 rounded-lg border border-border bg-card p-6"
    >
      <div className="flex items-center gap-4">
        <div className="relative">
          {displayImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayImage}
              alt={user.name}
              className="size-20 rounded-full object-cover border border-border"
            />
          ) : (
            <div className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <User className="size-8" />
            </div>
          )}
          <label className="absolute -right-1 -bottom-1 flex size-7 cursor-pointer items-center justify-center rounded-full border border-border bg-primary text-primary-foreground hover:bg-primary/90">
            <Camera className="size-3.5" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              disabled={isPending}
              className="hidden"
            />
          </label>
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{user.email}</p>
          <p className="text-xs text-muted-foreground">{user.role.replace("_", " ")}</p>
        </div>
      </div>

      <form.Field name="name" validators={{ onChange: validateWithZod(profileSchema.shape.name) }}>
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-foreground">Full name</label>
            <input
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isPending}
              className={inputClass}
            />
            {field.state.meta.errors[0] && (
              <p className="mt-1 text-xs text-destructive">{field.state.meta.errors[0]}</p>
            )}
          </div>
        )}
      </form.Field>

      {user.branch && (
        <div>
          <label className="block text-sm font-medium text-foreground">Branch</label>
          <p className="mt-1.5 text-sm text-muted-foreground">{user.branch.name}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}