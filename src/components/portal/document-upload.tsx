"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { value: "PAN_AADHAAR", label: "PAN / Aadhaar" },
  { value: "GST", label: "GST" },
  { value: "INCOME_TAX", label: "Income Tax" },
  { value: "COMPANY_ROC", label: "Company / ROC" },
  { value: "BANK_STATEMENT", label: "Bank Statement" },
  { value: "INVOICE", label: "Invoice" },
  { value: "OTHER", label: "Other" },
];

export default function DocumentUpload() {
  const router = useRouter();
  const { toast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] = useState("OTHER");
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return;

    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("category", category);

    try {
      const res = await fetch("/api/documents", { method: "POST", body: form });
      if (!res.ok) throw new Error();
      toast({ title: "Document uploaded" });
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    } catch {
      toast({ title: "Upload failed", description: "Please try again.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Select value={category} onValueChange={setCategory}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {categories.map((c) => (
            <SelectItem key={c.value} value={c.value}>
              {c.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input
        ref={fileRef}
        type="file"
        onChange={handleUpload}
        className="flex-1 text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-ink/[0.06] file:px-4 file:py-2 file:text-xs file:font-semibold file:text-ink hover:file:bg-ink/10"
      />
      {uploading && (
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Upload className="h-3.5 w-3.5 animate-pulse" />
          Uploading…
        </span>
      )}
    </div>
  );
}
