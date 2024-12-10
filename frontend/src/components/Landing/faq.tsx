import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqData from "@/data/faq.json";

export default function FAQ() {
  return (
    <div className="p-6 md:p-12 lg:p-24">
      <h1 className="xsm:text-2xl md:text-3xl xl:text-4xl font-bold font-title">
        Frequently asked question{" "}
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-11/2 lg:w-3/4  mx-auto mt-12"
      >
        {faqData.map((e: { question: string; answer: string }, i: number) => {
          return (
            <AccordionItem value={`${i}`} key={i}>
              <AccordionTrigger>{e.question}</AccordionTrigger>
              <AccordionContent>{e.answer}</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
