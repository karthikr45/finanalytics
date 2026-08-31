import Link from "next/link";

export default function PortalAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mesh-dark grain relative flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-gold-light to-gold text-sm font-bold text-ink">
            AF
          </span>
          <span className="font-display text-lg tracking-tight text-white">
            Akshara <span className="text-gold-light">Connect</span>
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
}
