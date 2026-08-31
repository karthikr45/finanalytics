import Link from "next/link";
import { LogoMark } from "@/components/logo";

export default function PortalAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mesh-dark grain relative flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <LogoMark className="h-9 w-9" />
          <span className="font-display text-lg tracking-tight text-white">
            Akshara <span className="text-gold-light">Connect</span>
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
}
