"use client";

import { useTransition } from "react";
import type { FilingStatus } from "@prisma/client";
import { updateFilingStatus } from "@/app/portal/(app)/filings/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const statuses: FilingStatus[] = ["PENDING", "IN_PROGRESS", "FILED", "OVERDUE"];

export default function FilingStatusSelect({
  filingId,
  status,
}: {
  filingId: string;
  status: FilingStatus;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <Select
      value={status}
      disabled={pending}
      onValueChange={(value) =>
        startTransition(() => {
          updateFilingStatus(filingId, value as FilingStatus);
        })
      }
    >
      <SelectTrigger className="h-8 w-36 text-xs">
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
