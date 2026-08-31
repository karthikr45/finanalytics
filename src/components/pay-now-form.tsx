"use client";

import { useState } from "react";
import Script from "next/script";
import { CheckCircle2, IndianRupee } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { formatCurrency } from "@/lib/utils";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export default function PayNowForm() {
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { demo: boolean; amount: number; reference: string }>(null);

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    const rupees = Number(amount);
    if (!rupees || rupees <= 0 || !reference.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(rupees * 100), reference: reference.trim() }),
      });
      const order = await res.json();

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!order.demo && keyId && window.Razorpay) {
        const rz = new window.Razorpay({
          key: keyId,
          amount: order.amount,
          currency: order.currency,
          name: "Akshara Finalytics",
          description: `Payment — ${order.reference}`,
          order_id: order.orderId,
          handler: () => setResult({ demo: false, amount: order.amount, reference: order.reference }),
          theme: { color: "#0f5132" },
        });
        rz.open();
      } else {
        // Demo mode — simulate a successful payment.
        setResult({ demo: true, amount: order.amount, reference: order.reference });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <form onSubmit={handlePay} className="space-y-4">
        <div>
          <Label htmlFor="reference">Invoice number or reference</Label>
          <Input
            id="reference"
            placeholder="e.g. AF-INV-2026-0142"
            className="mt-1.5"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="amount">Amount (INR)</Label>
          <div className="relative mt-1.5">
            <IndianRupee className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input
              id="amount"
              type="number"
              min={1}
              step="0.01"
              placeholder="0.00"
              className="pl-10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Preparing payment…" : "Pay Now"}
        </Button>
        <p className="text-center text-xs text-muted">
          Secured by Razorpay. Cards, UPI &amp; net banking accepted.
        </p>
      </form>

      <Dialog open={Boolean(result)} onOpenChange={(open) => !open && setResult(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald" />
              Payment received
            </DialogTitle>
            <DialogDescription>
              {result?.demo && "Demo mode — no live Razorpay keys are configured, so this simulates a successful payment. "}
              A receipt for {result && formatCurrency(result.amount)} against{" "}
              <strong>{result?.reference}</strong> has been recorded.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
