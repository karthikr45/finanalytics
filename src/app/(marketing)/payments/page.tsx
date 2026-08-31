import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Smartphone, CreditCard } from "lucide-react";
import PayNowForm from "@/components/pay-now-form";
import Reveal from "@/components/reveal";

export const metadata: Metadata = {
  title: "Pay Now",
  description: "Make a secure payment to Akshara Finalytics against your invoice or service reference.",
};

const trustPoints = [
  { icon: ShieldCheck, label: "Secured by Razorpay" },
  { icon: CreditCard, label: "Cards & net banking" },
  { icon: Smartphone, label: "UPI supported" },
];

export default function PaymentsPage() {
  return (
    <section className="mesh-dark grain relative isolate min-h-[80vh] overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-lg px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Pay Now
            </p>
            <h1 className="font-display text-balance mt-4 text-3xl text-white sm:text-4xl">
              Make a quick, secure payment
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              For itemised invoice history and past payments, sign in to{" "}
              <Link href="/portal/login" className="text-gold-light underline underline-offset-4">
                Akshara Connect
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-[2rem] border border-white/10 bg-white p-7 sm:p-9">
            <PayNowForm />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 flex items-center justify-center gap-6">
            {trustPoints.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-white/50">
                <Icon className="h-3.5 w-3.5 text-gold-light" />
                {label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
