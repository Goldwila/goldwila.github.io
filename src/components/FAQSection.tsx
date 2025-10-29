import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How do I get my house built?",
      answer: "Simply subscribe to our YouTube channel! Once you subscribe, you'll be added to our build queue. We build houses in the order subscribers join, and you'll see your house featured in an upcoming episode."
    },
    {
      question: "Is this really free?",
      answer: "Yes! All you need to do is subscribe to our YouTube channel. There's no cost involved. We build houses for every subscriber as our way of growing the community together."
    },
    {
      question: "Can I customize my house?",
      answer: "Basic houses are built for all subscribers. Want a custom design? Check out our membership options for personalized builds!"
    },
    {
      question: "When will my house be built?",
      answer: "Houses are built in the order of subscriptions. Depending on our current queue, it typically takes 1-2 weeks"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-foreground/70 text-lg">
            Got questions? We've got answers.
          </p>
        </div>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-white/10"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary transition-all hover:no-underline py-6 text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/70 text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  );
};

export default FAQSection;
