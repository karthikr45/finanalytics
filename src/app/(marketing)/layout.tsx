import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsappButton from "@/components/whatsapp-button";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsappButton />
    </div>
  );
}
