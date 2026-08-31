import { MessageCircle } from "lucide-react";
import { brand } from "@/lib/site-content";

export default function WhatsappButton() {
  const digits = brand.phone.replace(/\D/g, "");
  return (
    <a
      href={`https://wa.me/91${digits.slice(-10)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-emerald text-white shadow-[0_12px_32px_-10px_rgba(15,81,50,0.6)] transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={2} />
    </a>
  );
}
