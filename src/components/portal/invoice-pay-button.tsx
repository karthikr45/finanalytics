"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function InvoicePayButton({ invoiceId, invoiceNumber }: { invoiceId: string; invoiceNumber: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handlePay() {
    setLoading(true);
    try {
      const res = await fetch(`/api/portal/invoices/${invoiceId}/pay`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        toast({ title: "Payment failed", description: data.error || "Please try again.", variant: "destructive" });
        return;
      }

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!data.demo && keyId && window.Razorpay) {
        const rz = new window.Razorpay({
          key: keyId,
          amount: data.amount,
          currency: "INR",
          name: "Akshara Finalytics",
          description: `Invoice ${invoiceNumber}`,
          order_id: data.orderId,
          handler: () => {
            toast({ title: "Payment successful" });
            router.refresh();
          },
          theme: { color: "#0f5132" },
        });
        rz.open();
      } else {
        toast({ title: "Payment received", description: "Demo mode — invoice marked as paid." });
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button size="sm" onClick={handlePay} disabled={loading}>
      <CreditCard className="h-3.5 w-3.5" />
      {loading ? "Processing…" : "Pay Now"}
    </Button>
  );
}
