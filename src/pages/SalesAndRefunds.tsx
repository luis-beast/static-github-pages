import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";
import PageWrapper from "@/components/PageWrapper";

const SalesAndRefunds = memo(function SalesAndRefunds() {
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
            <GradientText gradient="louie">Sales & Refunds</GradientText>
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
                This Sales and Refund Policy explains what happens if you purchase something through The Layman's World and need help with a refund.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                When we say "Layman," "we," "us," or "our," we mean The Layman and the Layman Legion—the operator and moderators behind The Layman's World.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Members of the community are known as the <span className="text-foreground font-medium">Laypeople</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed font-medium">
                By making a purchase, you agree to this policy, along with our Terms of Use and Privacy Policy.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.05}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What We Sell</h2>
              <p className="text-muted-foreground leading-relaxed">
                Depending on what's available, purchases may include:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Digital features or upgrades</li>
                <li>Subscriptions</li>
                <li>One-time digital purchases</li>
                <li>Virtual items or "economy" boosts (if offered)</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <span className="text-foreground font-medium">Note:</span> Virtual points and in-app currencies have no real-world cash value and are not redeemable for cash.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.1}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Digital Purchases and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                Because digital products are delivered instantly, refunds can be limited. That said, we try to be reasonable.
              </p>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Refunds We Typically Approve</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We will generally approve refunds for:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Accidental duplicate purchases</li>
                  <li>Charges caused by a clear bug or billing error</li>
                  <li>Purchases you could not use due to a Service-side technical issue</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Refunds We Typically Do Not Approve</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We generally do not refund:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                  <li>Digital items already delivered and used</li>
                  <li>Purchases made a long time ago without a valid issue</li>
                  <li>Issues caused by third-party platforms or changes (such as Discord or Twitch outages or API changes)</li>
                  <li>Misuse or abuse of the economy system</li>
                </ul>
              </div>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.15}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">App Store Purchases</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you purchase through the Apple App Store, Google Play, or another platform store, refunds are handled by that platform's refund process and rules.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We can still help you troubleshoot, but we cannot override another platform's refund decisions.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.2}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Subscriptions</h2>
              <p className="text-muted-foreground leading-relaxed">
                If we offer subscriptions:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>You can cancel at any time through the platform you subscribed on</li>
                <li>Canceling stops future charges</li>
                <li>Access may continue until the end of the current billing period</li>
                <li>Refunds for partial subscription periods are generally not provided unless required by law</li>
              </ul>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.25}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Price Changes and Promotions</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may change pricing or run promotions at any time. Unless required by law, we do not provide refunds for price drops or limited-time deals after your purchase.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.3}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Chargebacks and Abuse</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you file a chargeback without contacting us first, we may:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Suspend access to purchased features</li>
                <li>Disable your account if we detect fraud or abuse</li>
              </ul>
              <p className="text-foreground font-medium mt-4">
                If something went wrong, please reach out first. We're humans over here.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.35}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">How to Request a Refund</h2>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund, reach out through our community channels with:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>The account you used</li>
                <li>The purchase date and amount</li>
                <li>The reason for the request</li>
                <li>Any relevant screenshots or error details</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Requests are handled through the Discord for The Layman's World or our official social channels.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.4}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Processing Time</h2>
              <p className="text-muted-foreground leading-relaxed">
                If a refund is approved:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                <li>Refunds go back to the original payment method when possible</li>
                <li>Processing times depend on your payment provider</li>
                <li>Some providers take a few business days to post the refund</li>
              </ul>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.45}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about purchases, refunds, or billing can be raised through the Discord for The Layman's World or our official social channels.
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </PageWrapper>
  );
});

export default SalesAndRefunds;
