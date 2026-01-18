import { memo } from "react";
import { BRAND_GRADIENTS } from "@/lib/constants";

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: keyof typeof BRAND_GRADIENTS | string;
  className?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

const GradientText = memo(function GradientText({
  children,
  gradient = "layman",
  className = "",
  as: Component = "span",
}: GradientTextProps) {
  const gradientValue =
    gradient in BRAND_GRADIENTS
      ? BRAND_GRADIENTS[gradient as keyof typeof BRAND_GRADIENTS]
      : gradient;

  return (
    <Component
      className={className}
      style={{
        background: gradientValue,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </Component>
  );
});

export default GradientText;

export const BrandName = memo(function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <GradientText gradient="layman">Layman</GradientText>
      <GradientText gradient="louie">Louie</GradientText>
    </span>
  );
});
