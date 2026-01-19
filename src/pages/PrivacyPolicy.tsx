import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

const PrivacyPolicy = memo(function PrivacyPolicy() {
  return (
    <div className="overflow-x-hidden relative min-h-screen">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[1200px] bg-primary/10 rounded-full blur-[200px]" />
      </div>

      {/* Hero Header */}
      <section className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.reveal, ease: EASING.smooth }}
          >
            <GradientText gradient="louie">Privacy Policy</GradientText>
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
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website or interact with our content.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.1}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may collect information you provide directly, such as when you contact us or sign up for notifications. We also automatically collect certain information about your device and browsing behavior.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.15}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">How We Use Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use collected information to improve our services, communicate with you, and provide a better experience across our platforms.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.2}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party services like Twitch, YouTube, Discord, and other social platforms. These services have their own privacy policies, and we encourage you to review them.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.25}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please reach out through our social channels or Discord community.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
});

export default PrivacyPolicy;
