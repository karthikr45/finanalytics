"use client";

import { useTransition } from "react";
import type { LeadStatus } from "@prisma/client";
import { updateLeadStatus } from "@/app/portal/(app)/leads/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses: LeadStatus[] = ["NEW", "CONTACTED", "CONVERTED", "LOST"];

export default function LeadStatusSelect({ leadId, status }: { leadId: string; status: LeadStatus }) {
  const [pending, startTransition] = useTransition();

  return (
    <Select
      value={status}
      disabled={pending}
      onValueChange={(value) =>
        startTransition(() => {
          updateLeadStatus(leadId, value as LeadStatus);
        })
      }
    >
      <SelectTrigger className="h-8 w-32 text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s} value={s}>
            {s}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
