/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, ImagePlus, X } from "lucide-react";
import { applyForChild } from "@/services/child.services";

const applySchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  relationship: z.string().min(2, "Relationship is required"),
  medicalNotes: z.string().optional(),
  allergies: z.string().optional(),
});

const validateWithZod =
  (schema: z.ZodTypeAny) =>
  ({ value }: { value: any }) => {
    const result = schema.safeParse(value);
    if (!result.success) return result.error.errors[0].message;
    return undefined;
  };

const inputClass =
  "mt-1.5 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50";

export default function RegisterChildForm() {
  const router = useRouter();
  const photoFileRef = useRef<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: applyForChild,
    onSuccess: () => {
      toast.success("Application submitted. A staff member will review it shortly.");
      router.push("/guardian/dashboard");
      router.refresh();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to submit application.");
    },
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    photoFileRef.current = file;
    setPhotoPreview(URL.createObjectURL(file));
    
  };

  const removePhoto = () => {
    photoFileRef.current = null;
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
  };

  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      relationship: "",
      medicalNotes: "",
      allergies: "",
    },
    onSubmit: ({ value }) => {
      const result = applySchema.safeParse(value);
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        return;
      }

      const formData = new FormData();
      formData.append("firstName", value.firstName);
      formData.append("lastName", value.lastName);
      formData.append("dateOfBirth", value.dateOfBirth);
      formData.append("relationship", value.relationship);
      if (value.medicalNotes)
        formData.append("medicalNotes", value.medicalNotes);
      if (value.allergies) formData.append("allergies", value.allergies);
      if (photoFileRef.current) formData.append("photo", photoFileRef.current);

      mutate(formData);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5 rounded-lg border border-border bg-card p-6"
    >
      {/* Photo upload */}
      <div>
        <label className="block text-sm font-medium text-foreground">
          Child&apos;s photo
        </label>
        <div className="mt-2 flex items-center gap-4">
          {photoPreview ? (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Preview"
                className="size-20 rounded-full object-cover border border-border"
              />
              <button
                type="button"
                onClick={removePhoto}
                disabled={isPending}
                className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-destructive-foreground hover:bg-destructive/90"
              >
                <X className="size-3" />
              </button>
            </div>
          ) : (
            <label className="flex size-20 cursor-pointer items-center justify-center rounded-full border border-dashed border-border bg-muted text-muted-foreground hover:bg-muted/80">
              <ImagePlus className="size-6" />
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                disabled={isPending}
                className="hidden"
              />
            </label>
          )}
          <p className="text-xs text-muted-foreground">
            Optional. JPG or PNG, up to 5MB.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <form.Field
          name="firstName"
          validators={{
            onChange: validateWithZod(applySchema.shape.firstName),
          }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-foreground">
                First name
              </label>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                className={inputClass}
              />
              {field.state.meta.errors[0] && (
                <p className="mt-1 text-xs text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field
          name="lastName"
          validators={{ onChange: validateWithZod(applySchema.shape.lastName) }}
        >
          {(field) => (
            <div>
              <label className="block text-sm font-medium text-foreground">
                Last name
              </label>
              <input
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={isPending}
                className={inputClass}
              />
              {field.state.meta.errors[0] && (
                <p className="mt-1 text-xs text-destructive">
                  {field.state.meta.errors[0]}
                </p>
              )}
            </div>
          )}
        </form.Field>
      </div>

      <form.Field
        name="dateOfBirth"
        validators={{
          onChange: validateWithZod(applySchema.shape.dateOfBirth),
        }}
      >
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-foreground">
              Date of birth
            </label>
            <input
              type="date"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isPending}
              className={inputClass}
            />
            {field.state.meta.errors[0] && (
              <p className="mt-1 text-xs text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="relationship"
        validators={{
          onChange: validateWithZod(applySchema.shape.relationship),
        }}
      >
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-foreground">
              Your relationship to this child
            </label>
            <input
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isPending}
              placeholder="e.g. Mother, Father, Grandparent"
              className={inputClass}
            />
            {field.state.meta.errors[0] && (
              <p className="mt-1 text-xs text-destructive">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="allergies">
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-foreground">
              Allergies{" "}
              <span className="text-muted-foreground">(optional)</span>
            </label>
            <textarea
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isPending}
              rows={2}
              className={inputClass}
            />
          </div>
        )}
      </form.Field>

      <form.Field name="medicalNotes">
        {(field) => (
          <div>
            <label className="block text-sm font-medium text-foreground">
              Medical notes{" "}
              <span className="text-muted-foreground">(optional)</span>
            </label>
            <textarea
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              disabled={isPending}
              rows={2}
              className={inputClass}
            />
          </div>
        )}
      </form.Field>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {isPending && <Loader2 className="size-4 animate-spin" />}
        {isPending ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}