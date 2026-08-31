"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { updateProfile, changePassword } from "@/app/portal/(app)/settings/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ProfileFormValues {
  name: string;
  phone: string;
  company: string;
}

export function ProfileForm({ initial }: { initial: ProfileFormValues }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm<ProfileFormValues>({ defaultValues: initial });

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    try {
      await updateProfile(data);
      toast({ title: "Profile updated" });
      router.refresh();
    } catch {
      toast({ title: "Couldn't update profile", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Full name</Label>
        <Input id="name" className="mt-1.5" {...register("name")} />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" className="mt-1.5" {...register("phone")} />
      </div>
      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" className="mt-1.5" {...register("company")} />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
}

export function PasswordForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<PasswordFormValues>();

  async function onSubmit(data: PasswordFormValues) {
    setLoading(true);
    try {
      await changePassword(data);
      toast({ title: "Password updated" });
      reset();
    } catch (err) {
      toast({
        title: "Couldn't update password",
        description: err instanceof Error ? err.message : undefined,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="currentPassword">Current password</Label>
        <Input id="currentPassword" type="password" className="mt-1.5" {...register("currentPassword", { required: true })} />
      </div>
      <div>
        <Label htmlFor="newPassword">New password</Label>
        <Input id="newPassword" type="password" className="mt-1.5" {...register("newPassword", { required: true, minLength: 6 })} />
      </div>
      <Button type="submit" variant="outline" disabled={loading}>
        {loading ? "Updating…" : "Update password"}
      </Button>
    </form>
  );
}
