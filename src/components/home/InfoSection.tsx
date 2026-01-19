import { memo } from "react";
import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollRevealSection from "./ScrollRevealSection";

interface InfoItem {
  question: string;
  answer: string;
}

const INFO_ITEMS: InfoItem[] = [
  {
    question: "Who is Layman Louie?",
    answer: "Just a guy who loves gaming, vibing with chat, and building a chill community. I stream a variety of games — from competitive to cozy — and the goal is always to have a good time together.",
  },
  {
    question: "What's the stream schedule like?",
    answer: "I stream regularly on Fridays, Saturdays, and Sundays, with a surprise weekday stream thrown in! Check out the Content page for the full schedule and times.",
  },
  {
    question: "How can I support the stream?",
    answer: "Just being here is enough! But if you want to go the extra mile, following on Twitch, subscribing, or hanging out in the Discord all help grow the community. Merch is coming soon too!",
  },
  {
    question: "Is there a Discord?",
    answer: "Absolutely! The Layman Legion Discord is where the community hangs out between streams. It's a chill spot to chat, share memes, and connect with other Laypeople.",
  },
  {
    question: "What games do you play?",
    answer: "A mix of everything! League of Legends, Valorant, and TFT are in the regular rotation, but I also love playing co-op games, horror games, and whatever catches my interest. Check the Content page for the full list!",
  },
];

const InfoSection = memo(function InfoSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Good to Know
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-16 font-light">
            A few things you might be wondering about.
          </p>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.15}>
          <Accordion type="single" collapsible className="space-y-3">
            {INFO_ITEMS.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border/20 rounded-2xl px-6 bg-gradient-to-r from-muted/10 to-transparent backdrop-blur-sm data-[state=open]:border-primary/20 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-medium py-5 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                  {item.question}
                  <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 text-base leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollRevealSection>
      </div>
    </section>
  );
});

export default InfoSection;
