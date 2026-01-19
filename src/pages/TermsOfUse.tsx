import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import PageWrapper from "@/components/PageWrapper";

const TermsOfUse = memo(function TermsOfUse() {
  return (
    <PageWrapper>
      {/* Hero Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
          >
            <GradientText gradient="louie">Terms of Use</GradientText>
          </motion.h1>
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, delay: 0.2, ease: EASING.smooth }}
          >
            Last updated: January 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <ScrollRevealSection>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.1}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Use of Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property of LaymanLouie and is protected by copyright laws. You may not reproduce, distribute, or create derivative works without express permission.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.15}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Community Guidelines</h2>
              <p className="text-muted-foreground leading-relaxed">
                When interacting with our community on any platform, you agree to follow our community rules: be kind, no hate or harassment, keep conversations appropriate, and respect fellow community members.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.2}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website and its content are provided "as is" without warranties of any kind. We are not liable for any damages arising from the use of this website.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.25}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of the website after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </PageWrapper>
  );
});

export default TermsOfUse;
