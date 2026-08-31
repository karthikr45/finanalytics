"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2 } from "lucide-react";
import { leadSchema, type LeadInput } from "@/lib/validations";
import { leadServiceOptions, experienceOptions } from "@/lib/site-content";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

async function submitLead(data: LeadInput) {
  const res = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Something went wrong. Please try again.");
  return res.json();
}

export default function LeadCaptureForm({ className }: { className?: string }) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LeadInput>({ resolver: zodResolver(leadSchema) });

  const mutation = useMutation({
    mutationFn: submitLead,
    onSuccess: () => {
      toast({ title: "Request received", description: "We'll call you back shortly." });
      reset();
    },
    onError: () => {
      toast({ title: "Couldn't submit", description: "Please try again or call us directly.", variant: "destructive" });
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className={className}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Your name" className="mt-1.5" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone number</Label>
          <Input id="phone" placeholder="10-digit mobile number" className="mt-1.5" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="mt-4">
        <Label htmlFor="email">Email (optional)</Label>
        <Input id="email" type="email" placeholder="you@company.com" className="mt-1.5" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label>Services looking for?</Label>
          <Controller
            control={control}
            name="serviceInterest"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {leadServiceOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.serviceInterest && (
            <p className="mt-1 text-xs text-danger">{errors.serviceInterest.message}</p>
          )}
        </div>
        <div>
          <Label>Experience in consultancy</Label>
          <Controller
            control={control}
            name="experienceLevel"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {experienceOptions.map((opt) => (
                    <SelectItem key={opt} value={opt}>
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <Button type="submit" className="mt-6 w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Submitting…" : isSubmitSuccessful ? "Request sent" : "Get a Call Back"}
      </Button>

      {isSubmitSuccessful && !mutation.isPending && (
        <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-emerald">
          <CheckCircle2 className="h-4 w-4" />
          We&rsquo;ll be in touch shortly.
        </p>
      )}
    </form>
  );
}
