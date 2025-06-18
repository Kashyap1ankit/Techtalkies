import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqData from "@/data/faq.json";
import { BsFillQuestionSquareFill } from "react-icons/bs";

export default function FAQ() {
  return (
    <div className="mt-28 md:mt-44">
      <div className="flex justify-center items-center gap-6">
        <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold font-bricolage ">
          Frequently asked question
        </h1>
        <BsFillQuestionSquareFill className="fill-primary-btn size-8" />
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-11/12 lg:w-3/4  mx-auto mt-12"
      >
        {faqData.map((e: { question: string; answer: string }, i: number) => {
          return (
            <AccordionItem value={`${i}`} key={i}>
              <AccordionTrigger className="font-manrope text-sm md:text-lg">
                {e.question}
              </AccordionTrigger>
              <AccordionContent className="font-manrope font-light text-gray-500 text-xs md:text-lg">
                {e.answer}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
