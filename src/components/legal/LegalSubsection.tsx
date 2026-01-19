import { memo, ReactNode } from "react";

interface LegalSubsectionProps {
  title: string;
  children: ReactNode;
}

const LegalSubsection = memo(function LegalSubsection({
  title,
  children,
}: LegalSubsectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
});

export default LegalSubsection;
