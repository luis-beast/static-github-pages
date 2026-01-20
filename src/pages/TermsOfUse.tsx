import { memo } from "react";
import {
  LegalPageLayout,
  LegalSection,
  LegalList,
  LegalText,
} from "@/components/legal";

const TermsOfUse = memo(function TermsOfUse() {
  return (
    <LegalPageLayout title="Terms of Use" lastUpdated="January 1, 2026">
      {/* Intro */}
      <LegalSection delay={0}>
        <LegalText>
          Welcome to The Layman's World (the "Service"). These Terms of Use ("Terms") apply to our website, app, and any related services, features, content, and tools (collectively, the "Service").
        </LegalText>
        <LegalText emphasis>
          By accessing or using the Service, you accept and agree to be bound by these Terms. If you do not agree, please do not use the Service.
        </LegalText>
      </LegalSection>

      {/* Who We Are */}
      <LegalSection title="Who We Are" delay={0.05}>
        <LegalText>
          The Layman's World is a community-driven platform created and guided by The Layman, with moderation and support provided by the Layman Legion.
        </LegalText>
        <LegalText>
          When we say "Layman," "we," "us," or "our," we mean The Layman and the Layman Legion—the operator and moderators behind The Layman's World.
        </LegalText>
        <LegalText>
          Members of the community are known as the <span className="text-foreground font-medium">Laypeople</span>.
        </LegalText>
      </LegalSection>

      {/* Changes to These Terms */}
      <LegalSection title="Changes to These Terms" delay={0.1}>
        <LegalText>
          If we update these Terms of Use:
        </LegalText>
        <LegalList>
          <li>We'll update the "Last Updated" date</li>
          <li>Significant changes will be communicated clearly</li>
        </LegalList>
      </LegalSection>

      {/* Eligibility */}
      <LegalSection title="Eligibility" delay={0.15}>
        <LegalText>
          You must be at least 13 years old to use the Service. If local law requires you to be older to use online services, you must meet that age requirement.
        </LegalText>
      </LegalSection>

      {/* Accounts and Sign-In */}
      <LegalSection title="Accounts and Sign-In" delay={0.2}>
        <LegalText>
          Some features require you to sign in using Discord and/or Twitch via OAuth.
        </LegalText>
        <LegalList>
          <li>We do not receive your passwords</li>
          <li>You're responsible for keeping your accounts secure</li>
          <li>You agree not to use someone else's account without permission</li>
          <li>You're responsible for actions taken through your account on the Service</li>
        </LegalList>
      </LegalSection>

      {/* Your Content and Contributions */}
      <LegalSection title="Your Content and Contributions" delay={0.25}>
        <LegalText>
          Depending on the features you use, you may submit or create content such as:
        </LegalText>
        <LegalList>
          <li>Quotes, commands, descriptions, tags, or notes</li>
          <li>Server or channel configurations</li>
          <li>Economy values or settings (virtual points)</li>
        </LegalList>
        <LegalText>
          You retain ownership of your content. By submitting content to the Service, you grant The Layman and the Layman Legion a limited license to store, display, and use it only as needed to operate, improve, and support the Service.
        </LegalText>
        <LegalText>
          You agree not to submit content that is illegal, harmful, hateful, or violates someone else's rights.
        </LegalText>
      </LegalSection>

      {/* Virtual Economy and Points */}
      <LegalSection title="Virtual Economy and Points" delay={0.3}>
        <LegalText>
          The Service may include a shared "economy" or virtual points system (including Twitch channel points or app-based points).
        </LegalText>
        <LegalList>
          <li>Virtual points have no real-world cash value</li>
          <li>We may adjust, reset, or remove virtual balances if needed for security, abuse prevention, bug fixes, or system changes</li>
          <li>We are not responsible for losses caused by third-party platform changes (such as Twitch or Discord API updates)</li>
        </LegalList>
      </LegalSection>

      {/* Community Guidelines and Acceptable Use */}
      <LegalSection title="Community Guidelines and Acceptable Use" delay={0.35}>
        <LegalText>
          When interacting with The Layman's World or the Laypeople on any platform, you agree to follow these rules:
        </LegalText>
        <LegalList>
          <li>Be kind and respectful</li>
          <li>No hate, harassment, or threats</li>
          <li>Keep conversations appropriate</li>
          <li>Respect fellow Laypeople and their spaces</li>
        </LegalList>
        <LegalText>
          You also agree that you will not:
        </LegalText>
        <LegalList>
          <li>Break the law or encourage others to do so</li>
          <li>Attempt to hack, exploit, reverse engineer, or disrupt the Service</li>
          <li>Use bots, scrapers, or automated tools to overload the Service</li>
          <li>Try to access data you shouldn't have access to</li>
          <li>Impersonate others or violate their rights</li>
          <li>Upload malware or do anything that could harm the Service or the Laypeople</li>
          <li>Use the Service to cheat, scam, or manipulate platform economies</li>
        </LegalList>
        <LegalText emphasis>
          In Layman terms: good vibes only—don't be weird with it.
        </LegalText>
      </LegalSection>

      {/* Intellectual Property */}
      <LegalSection title="Intellectual Property" delay={0.4}>
        <LegalText>
          The Service and its original content, features, designs, branding elements, and code are owned by The Layman or our licensors and are protected by intellectual property laws.
        </LegalText>
        <LegalText>
          You may not copy, modify, distribute, sell, or create derivative works from any part of the Service unless you have express permission.
        </LegalText>
      </LegalSection>

      {/* Third-Party Services */}
      <LegalSection title="Third-Party Services" delay={0.45}>
        <LegalText>
          The Service integrates with third-party platforms such as Discord, Twitch, and others. Your use of those services is governed by their own terms and policies.
        </LegalText>
        <LegalText>
          We are not responsible for:
        </LegalText>
        <LegalList>
          <li>Downtime caused by third-party outages</li>
          <li>API changes that break features</li>
          <li>Actions taken by third-party platforms</li>
        </LegalList>
      </LegalSection>

      {/* Privacy */}
      <LegalSection title="Privacy" delay={0.5}>
        <LegalText>
          Our Privacy Policy explains how data is handled. By using the Service, you agree to that policy.
        </LegalText>
      </LegalSection>

      {/* Disclaimers */}
      <LegalSection title="Disclaimers" delay={0.55}>
        <LegalText>
          We do our best, but we can't promise the Service will always be perfect.
        </LegalText>
        <LegalText>
          The Service is provided "as is" and "as available," without warranties of any kind. We do not guarantee:
        </LegalText>
        <LegalList>
          <li>Uninterrupted access</li>
          <li>Error-free performance</li>
          <li>That every feature will work on every device forever</li>
        </LegalList>
      </LegalSection>

      {/* Limitation of Liability */}
      <LegalSection title="Limitation of Liability" delay={0.6}>
        <LegalText>
          To the maximum extent allowed by law, The Layman and the Layman Legion will not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost data, or service interruption.
        </LegalText>
        <LegalText>
          If we are found liable for any claim, our total liability will not exceed the greater of:
        </LegalText>
        <LegalList>
          <li>The amount you paid (if any) for the Service in the last six (6) months, or</li>
          <li>$100 USD</li>
        </LegalList>
        <LegalText>
          Some jurisdictions do not allow certain limitations, so these may not fully apply to you.
        </LegalText>
      </LegalSection>

      {/* Termination */}
      <LegalSection title="Termination" delay={0.65}>
        <LegalText>
          We may suspend or terminate your access to the Service at any time if:
        </LegalText>
        <LegalList>
          <li>You violate these Terms</li>
          <li>We need to protect the Service or the Laypeople</li>
          <li>Required by law</li>
          <li>The Service is discontinued</li>
        </LegalList>
        <LegalText>
          You may stop using the Service at any time.
        </LegalText>
      </LegalSection>

      {/* Feedback */}
      <LegalSection title="Feedback" delay={0.7}>
        <LegalText>
          If you submit feedback or suggestions, you agree that we may use them freely without obligation or compensation.
        </LegalText>
      </LegalSection>

      {/* Governing Law */}
      <LegalSection title="Governing Law" delay={0.75}>
        <LegalText>
          These Terms are governed by the laws of the State of Colorado, USA, unless your local consumer protection laws require otherwise.
        </LegalText>
        <LegalText>
          Disputes will be handled in the courts located in Colorado, unless prohibited by law.
        </LegalText>
      </LegalSection>

      {/* Contact */}
      <LegalSection title="Contact" delay={0.8}>
        <LegalText>
          If you have questions or concerns about these Terms, reach out through our social channels or the Discord for The Layman's World.
        </LegalText>
        <LegalText>
          We take your concerns seriously and will respond as quickly as we can.
        </LegalText>
      </LegalSection>
    </LegalPageLayout>
  );
});

export default TermsOfUse;