"use client";

import { Menu, LogOut, Settings, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { logoutAction } from "@/app/portal/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PortalTopbar({
  name,
  email,
  onMenuClick,
  title,
}: {
  name: string;
  email: string;
  onMenuClick: () => void;
  title?: string;
}) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-ink/8 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink/60 hover:bg-ink/5 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        {title && <h1 className="font-display text-lg text-ink">{title}</h1>}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-ink/5 focus:outline-none">
          <Avatar>
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-ink sm:inline">{name}</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <p className="text-sm font-semibold text-ink">{name}</p>
            <p className="text-xs font-normal text-muted">{email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/portal/settings">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/">
              <UserIcon className="h-4 w-4" />
              Visit main site
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <form action={logoutAction}>
            <button type="submit" className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-danger hover:bg-danger-soft">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
