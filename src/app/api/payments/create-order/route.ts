import { NextResponse } from "next/server";
import { z } from "zod";
import { razorpay, isRazorpayLive } from "@/lib/razorpay";

const schema = z.object({
  amount: z.number().int().positive(), // in paise
  reference: z.string().min(1),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { amount, reference } = parsed.data;

  if (!isRazorpayLive || !razorpay) {
    // Demo mode: no live Razorpay keys configured in this environment.
    return NextResponse.json({
      demo: true,
      orderId: `demo_order_${Date.now()}`,
      amount,
      currency: "INR",
      reference,
    });
  }

  const order = await razorpay.orders.create({
    amount,
    currency: "INR",
    receipt: reference,
  });

  return NextResponse.json({ demo: false, orderId: order.id, amount, currency: "INR", reference });
}
