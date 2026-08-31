import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FAQ } from "@/lib/services-content";

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  return (
    <Accordion type="single" collapsible className="rounded-3xl border border-ink/8 bg-white px-6 sm:px-8">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.question} value={`item-${i}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
