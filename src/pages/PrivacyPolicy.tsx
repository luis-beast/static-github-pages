import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import PageWrapper from "@/components/PageWrapper";

const PrivacyPolicy = memo(function PrivacyPolicy() {
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
            <GradientText gradient="louie">Privacy Policy</GradientText>
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
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use The Layman's World—whether through our website, app, or related services.
              </p>
              <p className="text-muted-foreground leading-relaxed font-medium">
                We aim to keep things clear, respectful, and transparent. No funny business.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.05}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Who We Are</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Layman's World is a community-focused platform created to share quotes, commands, stats, and tools connected to Twitch, Discord, and related services.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When we say "Layman," "we," "us," or "our," we mean The Layman and the Layman Legion—the operator and moderators behind The Layman's World.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Members of the community are referred to as the <span className="text-foreground font-medium">Laypeople</span>.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.1}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect only what we need to make the Service work.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">1. Account Information (via OAuth)</h3>
                <p className="text-muted-foreground leading-relaxed">
                  When you sign in using Discord or Twitch, we may receive:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Your platform user ID</li>
                  <li>Username and display name</li>
                  <li>Profile image (if provided by the platform)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  We do not receive your password.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">2. Usage & App Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may collect limited data about how you use the Service, such as:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Commands created or used</li>
                  <li>Quotes saved or viewed</li>
                  <li>Economy or point balances</li>
                  <li>Feature usage (to improve the Service)</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  This helps us make The Layman's World better for the Laypeople.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">3. Economy & Virtual Data</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you use shared economies or virtual points:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Balances, transactions, and history are stored</li>
                  <li>These are virtual items only and have no real-world cash value</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">4. Communications</h3>
                <p className="text-muted-foreground leading-relaxed">
                  If you contact us through community channels (such as Discord):
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>We may store the message and your contact info</li>
                  <li>Only to respond or provide help</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">5. Automatically Collected Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We may automatically collect limited technical information, such as:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Device and browser type</li>
                  <li>Basic usage and interaction data</li>
                  <li>Error logs and performance data</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  This information helps us improve stability, security, and the overall experience.
                </p>
              </div>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.15}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What We Do Not Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                Let's be very clear. We do not collect:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Passwords</li>
                <li>Payment card details (unless added later via trusted processors)</li>
                <li>Government ID</li>
                <li>Real-world location tracking</li>
                <li>Private Discord or Twitch messages</li>
              </ul>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.2}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use your data to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Authenticate your account</li>
                <li>Power features and tools</li>
                <li>Sync data across Discord and Twitch</li>
                <li>Maintain shared economies</li>
                <li>Improve performance and features</li>
                <li>Keep the Service secure and functional</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We process your information based on your consent, to provide the Service, and to maintain security and reliability.
              </p>
              <p className="text-foreground font-semibold">
                We do not sell your data.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.25}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Sharing Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We only share data when necessary:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>With Discord and Twitch for OAuth functionality</li>
                <li>With trusted service providers that help host or secure the Service</li>
                <li>If required by law</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                We do not share data for advertising purposes.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.3}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Layman's World may link to or integrate with third-party services such as Twitch, YouTube, Discord, and other platforms. These services have their own privacy policies, and we encourage you to review them.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We are not responsible for how third-party platforms collect or use your data.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.35}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We take reasonable steps to protect your data using:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Secure storage practices</li>
                <li>Access controls</li>
                <li>Industry-standard safeguards</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                That said, no system is 100% perfect. We do our best to keep your data safe.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In the event of a data breach that affects your personal information, we will notify affected users as required by law.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.4}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Privacy Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on where you live, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Access your data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your account and data</li>
                <li>Restrict certain processing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You may request deletion of your account and associated data at any time.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.45}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your data only as long as necessary to provide the Service, comply with legal obligations, resolve disputes, enforce our agreements, or until you request deletion.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.5}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Layman's World is not intended for users under 13. We do not knowingly collect data from children. If we discover we have, we will delete it promptly.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.55}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Cookies & Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                If we use cookies or similar technologies:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>They are used only for basic functionality and analytics</li>
                <li>No third-party ad tracking</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                You may disable cookies in your browser settings.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.6}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">International Users</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data may be stored or processed in countries other than your own. We take steps to ensure appropriate protections are in place.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.65}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                If we update this Privacy Policy:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>We'll update the "Last Updated" date</li>
                <li>Significant changes will be communicated clearly</li>
              </ul>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.7}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions or concerns about privacy, reach out through our social channels or the Discord for The Layman's World.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We take privacy seriously and will respond as quickly as we can.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </PageWrapper>
  );
});

export default PrivacyPolicy;
