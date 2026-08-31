import { Suspense } from "react";
import LoginForm from "@/components/portal/login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-96 rounded-3xl border border-white/10 bg-white" />}>
      <LoginForm />
    </Suspense>
  );
}
