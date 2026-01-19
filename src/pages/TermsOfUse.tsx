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
            Last Updated: January 1, 2026
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <ScrollRevealSection>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                Welcome to The Layman's World (the "Service"). These Terms of Use ("Terms") apply to our website, app, and any related services, features, content, and tools (collectively, the "Service").
              </p>
              <p className="text-muted-foreground leading-relaxed font-medium">
                By accessing or using the Service, you accept and agree to be bound by these Terms. If you do not agree, please do not use the Service.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.05}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Layman's World is a community-driven platform created and guided by The Layman, with moderation and support provided by the Layman Legion.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When we say "Layman," "we," "us," or "our," we mean The Layman and the Layman Legion—the operator and moderators behind the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Members of the community are known as the <span className="text-foreground font-medium">Laypeople</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                "You" refers to any person who accesses or uses the Service.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.1}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Changes to These Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update these Terms from time to time. When we do, we'll update the "Last Updated" date. By continuing to use the Service after changes take effect, you agree to the updated Terms.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.15}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Eligibility</h2>
              <p className="text-muted-foreground leading-relaxed">
                You must be at least 13 years old to use the Service. If local law requires you to be older to use online services, you must meet that age requirement.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.2}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Accounts and Sign-In</h2>
              <p className="text-muted-foreground leading-relaxed">
                Some features require you to sign in using Discord and/or Twitch via OAuth.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>We do not receive your passwords</li>
                <li>You're responsible for keeping your accounts secure</li>
                <li>You agree not to use someone else's account without permission</li>
                <li>You're responsible for actions taken through your account on the Service</li>
              </ul>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.25}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Content and Contributions</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on the features you use, you may submit or create content such as:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Quotes, commands, descriptions, tags, or notes</li>
                <li>Server or channel configurations</li>
                <li>Economy values or settings (virtual points)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of your content. By submitting content to the Service, you grant The Layman and the Layman Legion a limited license to store, display, and use it only as needed to operate, improve, and support the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You agree not to submit content that is illegal, harmful, hateful, or violates someone else's rights.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.3}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Virtual Economy and Points</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service may include a shared "economy" or virtual points system (including Twitch channel points or app-based points).
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Virtual points have no real-world cash value</li>
                <li>We may adjust, reset, or remove virtual balances if needed for security, abuse prevention, bug fixes, or system changes</li>
                <li>We are not responsible for losses caused by third-party platform changes (such as Twitch or Discord API updates)</li>
              </ul>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.35}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Community Guidelines and Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed">
                When interacting with The Layman's World or the Laypeople on any platform, you agree to follow these rules:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Be kind and respectful</li>
                <li>No hate, harassment, or threats</li>
                <li>Keep conversations appropriate</li>
                <li>Respect fellow Laypeople and their spaces</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You also agree that you will not:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Break the law or encourage others to do so</li>
                <li>Attempt to hack, exploit, reverse engineer, or disrupt the Service</li>
                <li>Use bots, scrapers, or automated tools to overload the Service</li>
                <li>Try to access data you shouldn't have access to</li>
                <li>Impersonate others or violate their rights</li>
                <li>Upload malware or do anything that could harm the Service or the Laypeople</li>
                <li>Use the Service to cheat, scam, or manipulate platform economies</li>
              </ul>
              <p className="text-foreground font-medium mt-4">
                In Layman terms: good vibes only—don't be weird with it.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.4}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service and its original content, features, designs, branding elements, and code are owned by The Layman or our licensors and are protected by intellectual property laws.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You may not copy, modify, distribute, sell, or create derivative works from any part of the Service unless you have express permission.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.45}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Service integrates with third-party platforms such as Discord, Twitch, and others. Your use of those services is governed by their own terms and policies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Downtime caused by third-party outages</li>
                <li>API changes that break features</li>
                <li>Actions taken by third-party platforms</li>
              </ul>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.5}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our Privacy Policy explains how data is handled. By using the Service, you agree to that policy.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.55}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Disclaimers</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do our best, but we can't promise the Service will always be perfect.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The Service is provided "as is" and "as available," without warranties of any kind. We do not guarantee:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Uninterrupted access</li>
                <li>Error-free performance</li>
                <li>That every feature will work on every device forever</li>
              </ul>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.6}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent allowed by law, The Layman and the Layman Legion will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost data, or service interruption.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                If we are found liable for any claim, our total liability will not exceed the greater of:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>The amount you paid (if any) for the Service in the last six (6) months, or</li>
                <li>$100 USD</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                Some jurisdictions do not allow certain limitations, so these may not fully apply to you.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.65}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may suspend or terminate your access to the Service at any time if:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>You violate these Terms</li>
                <li>We need to protect the Service or the Laypeople</li>
                <li>Required by law</li>
                <li>The Service is discontinued</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You may stop using the Service at any time.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.7}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Feedback</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you submit feedback or suggestions, you agree that we may use them freely without obligation or compensation.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.75}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms are governed by the laws of the State of Colorado, USA, unless your local consumer protection laws require otherwise.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Disputes will be handled in the courts located in Colorado, unless prohibited by law.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.8}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about these Terms can be raised through our social channels or the Discord for The Layman's World.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </PageWrapper>
  );
});

export default TermsOfUse;
