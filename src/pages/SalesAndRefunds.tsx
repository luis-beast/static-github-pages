import { memo } from "react";
import {
  LegalPageLayout,
  LegalSection,
  LegalSubsection,
  LegalList,
  LegalText,
} from "@/components/legal";

const SalesAndRefunds = memo(function SalesAndRefunds() {
  return (
    <LegalPageLayout title="Sales & Refunds" lastUpdated="January 1, 2026">
      {/* Intro */}
      <LegalSection delay={0}>
        <LegalText>
          This Sales and Refund Policy explains what happens if you purchase something through The Layman's World and need help with a refund.
        </LegalText>
        <LegalText emphasis>
          By making a purchase, you agree to this policy, along with our Terms of Use and Privacy Policy.
        </LegalText>
      </LegalSection>

      {/* Who We Are */}
      <LegalSection title="Who We Are" delay={0.05}>
        <LegalText>
          The Layman's World is a community-focused platform created and guided by The Layman, with moderation and support provided by the Layman Legion.
        </LegalText>
        <LegalText>
          When we say "Layman," "we," "us," or "our," we mean The Layman and the Layman Legion—the operator and moderators behind The Layman's World.
        </LegalText>
        <LegalText>
          Members of the community are known as the <span className="text-foreground font-medium">Laypeople</span>.
        </LegalText>
      </LegalSection>

      {/* What We Sell */}
      <LegalSection title="What We Sell" delay={0.1}>
        <LegalText>
          Depending on what's available, purchases may include:
        </LegalText>
        <LegalList>
          <li>Digital features or upgrades</li>
          <li>Subscriptions</li>
          <li>One-time digital purchases</li>
          <li>Virtual items or "economy" boosts (if offered)</li>
        </LegalList>
        <LegalText>
          <span className="text-foreground font-medium">Note:</span> Virtual points and in-app currencies have no real-world cash value and are not redeemable for cash.
        </LegalText>
      </LegalSection>

      {/* Digital Purchases and Refunds */}
      <LegalSection title="Digital Purchases and Refunds" delay={0.15}>
        <LegalText>
          Because digital products are delivered instantly, refunds can be limited. That said, we try to be reasonable.
        </LegalText>

        <LegalSubsection title="Refunds We Typically Approve">
          <LegalText>
            We will generally approve refunds for:
          </LegalText>
          <LegalList>
            <li>Accidental duplicate purchases</li>
            <li>Charges caused by a clear bug or billing error</li>
            <li>Purchases you could not use due to a Service-side technical issue</li>
          </LegalList>
        </LegalSubsection>

        <LegalSubsection title="Refunds We Typically Do Not Approve">
          <LegalText>
            We generally do not refund:
          </LegalText>
          <LegalList>
            <li>Digital items already delivered and used</li>
            <li>Purchases made a long time ago without a valid issue</li>
            <li>Issues caused by third-party platforms or changes (such as Discord or Twitch outages or API changes)</li>
            <li>Misuse or abuse of the economy system</li>
          </LegalList>
        </LegalSubsection>
      </LegalSection>

      {/* App Store Purchases */}
      <LegalSection title="App Store Purchases" delay={0.2}>
        <LegalText>
          If you purchase through the Apple App Store, Google Play, or another platform store, refunds are handled by that platform's refund process and rules.
        </LegalText>
        <LegalText>
          We can still help you troubleshoot, but we cannot override another platform's refund decisions.
        </LegalText>
      </LegalSection>

      {/* Subscriptions */}
      <LegalSection title="Subscriptions" delay={0.25}>
        <LegalText>
          If we offer subscriptions:
        </LegalText>
        <LegalList>
          <li>You can cancel at any time through the platform you subscribed on</li>
          <li>Canceling stops future charges</li>
          <li>Access may continue until the end of the current billing period</li>
          <li>Refunds for partial subscription periods are generally not provided unless required by law</li>
        </LegalList>
      </LegalSection>

      {/* Price Changes and Promotions */}
      <LegalSection title="Price Changes and Promotions" delay={0.3}>
        <LegalText>
          We may change pricing or run promotions at any time. Unless required by law, we do not provide refunds for price drops or limited-time deals after your purchase.
        </LegalText>
      </LegalSection>

      {/* Chargebacks and Abuse */}
      <LegalSection title="Chargebacks and Abuse" delay={0.35}>
        <LegalText>
          If you file a chargeback without contacting us first, we may:
        </LegalText>
        <LegalList>
          <li>Suspend access to purchased features</li>
          <li>Disable your account if we detect fraud or abuse</li>
        </LegalList>
        <LegalText emphasis>
          If something went wrong, please reach out first. We're humans over here.
        </LegalText>
      </LegalSection>

      {/* How to Request a Refund */}
      <LegalSection title="How to Request a Refund" delay={0.4}>
        <LegalText>
          To request a refund, reach out through our community channels with:
        </LegalText>
        <LegalList>
          <li>The account you used</li>
          <li>The purchase date and amount</li>
          <li>The reason for the request</li>
          <li>Any relevant screenshots or error details</li>
        </LegalList>
        <LegalText>
          Requests are handled through the Discord for The Layman's World or our official social channels.
        </LegalText>
      </LegalSection>

      {/* Processing Time */}
      <LegalSection title="Processing Time" delay={0.45}>
        <LegalText>
          If a refund is approved:
        </LegalText>
        <LegalList>
          <li>Refunds go back to the original payment method when possible</li>
          <li>Processing times depend on your payment provider</li>
          <li>Some providers take a few business days to post the refund</li>
        </LegalList>
      </LegalSection>

      {/* Contact */}
      <LegalSection title="Contact" delay={0.5}>
        <LegalText>
          Questions about purchases, refunds, or billing can be raised through the Discord for The Layman's World or our official social channels.
        </LegalText>
      </LegalSection>
    </LegalPageLayout>
  );
});

export default SalesAndRefunds;