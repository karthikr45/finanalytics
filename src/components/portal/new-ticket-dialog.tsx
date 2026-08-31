"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { ticketSchema, type TicketInput } from "@/lib/validations";
import { createTicket } from "@/app/portal/(app)/tickets/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function NewTicketDialog() {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketInput>({ resolver: zodResolver(ticketSchema) });

  async function onSubmit(data: TicketInput) {
    setLoading(true);
    try {
      await createTicket(data);
      toast({ title: "Ticket raised" });
      reset();
      setOpen(false);
      router.refresh();
    } catch {
      toast({ title: "Couldn't raise ticket", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          New ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Raise a support ticket</DialogTitle>
          <DialogDescription>A compliance advisor will respond, usually within a business day.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
          <div>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" className="mt-1.5" {...register("subject")} />
            {errors.subject && <p className="mt-1 text-xs text-danger">{errors.subject.message}</p>}
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" rows={4} className="mt-1.5" {...register("message")} />
            {errors.message && <p className="mt-1 text-xs text-danger">{errors.message.message}</p>}
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting…" : "Submit ticket"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
