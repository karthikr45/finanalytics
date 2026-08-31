import type { SVGProps } from "react";

// lucide-react no longer ships brand/social marks — these are minimal
// inline glyphs for linking out to the firm's own social profiles.

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.5-1.46h1.6V4.35C16.3 4.24 15.34 4.14 14.2 4.14c-2.27 0-3.83 1.39-3.83 3.93v2.43H8v3h2.37V21h3.13z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 3H21l-6.4 7.3L22 21h-6.3l-4.6-6.1L5.6 21H3.5l6.8-7.8L3 3h6.4l4.2 5.6L18.9 3zm-1.1 16h1.2L8.3 4.9H7l10.8 14.1z" />
    </svg>
  );
}
