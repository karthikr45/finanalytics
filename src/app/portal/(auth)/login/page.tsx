import { Suspense } from "react";
import Image from "next/image";
import LoginForm from "@/components/portal/login-form";

export default function LoginPage() {
  return (
    <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-white shadow-[0_24px_70px_-35px_rgba(0,0,0,0.7)] md:grid-cols-2">
      <div className="relative hidden min-h-[600px] md:block">
        <Image
          src="/images/finalytics/secondary/portal-login-dashboard.webp"
          alt="Compliance dashboard with filing, invoice and document overview"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/10 to-transparent" />
      </div>
      <div className="flex items-center p-0 md:p-8 lg:p-12">
        <div className="w-full">
          <Suspense fallback={<div className="h-96 rounded-3xl bg-white" />}>
            <LoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
