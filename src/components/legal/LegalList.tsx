import { memo, ReactNode } from "react";

interface LegalListProps {
  children: ReactNode;
}

const LegalList = memo(function LegalList({ children }: LegalListProps) {
  return (
    <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
      {children}
    </ul>
  );
});

export default LegalList;
