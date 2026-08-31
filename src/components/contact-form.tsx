"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

async function submitContact(data: ContactInput) {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send");
  return res.json();
}

export default function ContactForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const mutation = useMutation({
    mutationFn: submitContact,
    onSuccess: () => {
      toast({ title: "Message sent", description: "We'll get back to you shortly." });
      reset();
    },
    onError: () => {
      toast({ title: "Couldn't send", description: "Please try again or call us.", variant: "destructive" });
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name">Full name</Label>
          <Input id="c-name" className="mt-1.5" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-danger">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="c-phone">Phone</Label>
          <Input id="c-phone" className="mt-1.5" {...register("phone")} />
          {errors.phone && <p className="mt-1 text-xs text-danger">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="c-email">Email</Label>
        <Input id="c-email" type="email" className="mt-1.5" {...register("email")} />
        {errors.email && <p className="mt-1 text-xs text-danger">{errors.email.message}</p>}
      </div>
      <div>
        <Label>Preferred branch</Label>
        <Controller
          control={control}
          name="branch"
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="No preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HIMAYATNAGAR">Himayatnagar</SelectItem>
                <SelectItem value="MADHAPUR">Madhapur</SelectItem>
                <SelectItem value="EITHER">Either is fine</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <div>
        <Label htmlFor="c-message">How can we help?</Label>
        <Textarea id="c-message" className="mt-1.5" rows={4} {...register("message")} />
        {errors.message && <p className="mt-1 text-xs text-danger">{errors.message.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
