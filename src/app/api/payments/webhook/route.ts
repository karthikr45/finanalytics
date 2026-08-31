import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { prisma } from "@/lib/prisma";

// Razorpay webhook — confirms a payment server-side once captured. Signs
// the raw body with RAZORPAY_KEY_SECRET and compares against the
// X-Razorpay-Signature header. Inert until real keys are configured; in
// demo mode invoices are marked paid synchronously by
// /api/portal/invoices/[id]/pay instead.
export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhooks are disabled in demo mode" }, { status: 400 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  if (!signature || signature !== expected) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "payment.captured") {
    const orderId = event.payload?.payment?.entity?.order_id as string | undefined;
    const paymentId = event.payload?.payment?.entity?.id as string | undefined;
    if (orderId) {
      const payment = await prisma.payment.findFirst({ where: { razorpayOrderId: orderId } });
      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: "SUCCESS", razorpayPaymentId: paymentId },
        });
        if (payment.invoiceId) {
          await prisma.invoice.update({ where: { id: payment.invoiceId }, data: { status: "PAID" } });
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
