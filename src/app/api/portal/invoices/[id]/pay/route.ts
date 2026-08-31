import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { razorpay, isRazorpayLive } from "@/lib/razorpay";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const invoice = await prisma.invoice.findUnique({ where: { id } });
  if (!invoice) {
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }
  if (invoice.userId !== session.user.id && session.user.role === "CLIENT") {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }
  if (invoice.status === "PAID") {
    return NextResponse.json({ error: "Invoice already paid" }, { status: 400 });
  }

  if (!isRazorpayLive || !razorpay) {
    // Demo mode: no live Razorpay keys — mark the invoice paid immediately
    // and record a matching Payment, so the flow is complete end-to-end.
    const payment = await prisma.payment.create({
      data: {
        userId: invoice.userId,
        invoiceId: invoice.id,
        amount: invoice.amount,
        status: "SUCCESS",
        razorpayOrderId: `demo_order_${Date.now()}`,
        razorpayPaymentId: `demo_pay_${Date.now()}`,
      },
    });
    await prisma.invoice.update({ where: { id: invoice.id }, data: { status: "PAID" } });
    return NextResponse.json({ demo: true, paymentId: payment.id });
  }

  const order = await razorpay.orders.create({
    amount: invoice.amount,
    currency: "INR",
    receipt: invoice.number,
  });

  const payment = await prisma.payment.create({
    data: {
      userId: invoice.userId,
      invoiceId: invoice.id,
      amount: invoice.amount,
      status: "CREATED",
      razorpayOrderId: order.id,
    },
  });

  return NextResponse.json({ demo: false, orderId: order.id, amount: invoice.amount, paymentId: payment.id });
}
