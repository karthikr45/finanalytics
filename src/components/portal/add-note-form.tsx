"use client";

import { useRef } from "react";
import { addClientNote } from "@/app/portal/(app)/clients/actions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AddNoteForm({ clientId }: { clientId: string }) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        const body = formData.get("body") as string;
        await addClientNote(clientId, body);
        formRef.current?.reset();
      }}
      className="flex flex-col gap-3"
    >
      <Textarea name="body" placeholder="Add an internal note about this client…" rows={3} required />
      <Button type="submit" size="sm" className="self-end">
        Add note
      </Button>
    </form>
  );
}
