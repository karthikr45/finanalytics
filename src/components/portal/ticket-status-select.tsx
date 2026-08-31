"use client";

import { useTransition } from "react";
import type { TicketStatus } from "@prisma/client";
import { updateTicketStatus } from "@/app/portal/(app)/tickets/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses: TicketStatus[] = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];

export default function TicketStatusSelect({ ticketId, status }: { ticketId: string; status: TicketStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <Select
      value={status}
      disabled={pending}
      onValueChange={(value) =>
        startTransition(() => {
          updateTicketStatus(ticketId, value as TicketStatus);
        })
      }
    >
      <SelectTrigger className="h-8 w-32 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>
            {s.replace("_", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
