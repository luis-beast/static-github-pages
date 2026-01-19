import { memo, ReactNode } from "react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

interface LegalSectionProps {
  title?: string;
  delay?: number;
  children: ReactNode;
}

const LegalSection = memo(function LegalSection({
  title,
  delay = 0,
  children,
}: LegalSectionProps) {
  return (
    <ScrollRevealSection delay={delay}>
      <div className="space-y-4">
        {title && <h2 className="text-2xl font-bold">{title}</h2>}
        {children}
      </div>
    </ScrollRevealSection>
  );
});

export default LegalSection;
