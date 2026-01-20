import { memo } from "react";
import {
  LegalPageLayout,
  LegalSection,
  LegalSubsection,
  LegalList,
  LegalText,
} from "@/components/legal";

const PrivacyPolicy = memo(function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="January 1, 2026">
      {/* Intro */}
      <LegalSection delay={0}>
        <LegalText>
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use The Layman's World, whether through our website, app, or related services.
        </LegalText>
        <LegalText emphasis>
          We aim to keep things clear, respectful, and transparent. No funny business.
        </LegalText>
      </LegalSection>

      {/* Who We Are */}
      <LegalSection title="Who We Are" delay={0.05}>
        <LegalText>
          The Layman's World is a community-driven platform created and guided by The Layman, with moderation and support provided by the Layman Legion.
        </LegalText>
        <LegalText>
          When we say "Layman," "we," "us," or "our," we mean The Layman and the Layman Legion: the operator and moderators behind The Layman's World.
        </LegalText>
        <LegalText>
          Members of the community are known as the <span className="text-foreground font-medium">Laypeople</span>.
        </LegalText>
      </LegalSection>

      {/* Changes to This Policy */}
      <LegalSection title="Changes to This Policy" delay={0.1}>
        <LegalText>
          If we update this Privacy Policy:
        </LegalText>
        <LegalList>
          <li>We'll update the "Last Updated" date</li>
          <li>Significant changes will be communicated clearly</li>
        </LegalList>
      </LegalSection>

      {/* Information We Collect */}
      <LegalSection title="Information We Collect" delay={0.15}>
        <LegalText>
          We collect only what we need to make the Service work.
        </LegalText>
        
        <LegalSubsection title="Account Information (via OAuth)">
          <LegalText>
            When you sign in using Discord or Twitch, we may receive:
          </LegalText>
          <LegalList>
            <li>Your platform user ID</li>
            <li>Username and display name</li>
            <li>Profile image (if provided by the platform)</li>
          </LegalList>
          <LegalText emphasis>
            We do not receive your password.
          </LegalText>
        </LegalSubsection>

        <LegalSubsection title="Usage & App Data">
          <LegalText>
            We may collect limited data about how you use the Service, such as:
          </LegalText>
          <LegalList>
            <li>Commands created or used</li>
            <li>Quotes saved or viewed</li>
            <li>Economy or point balances</li>
            <li>Feature usage (to improve the Service)</li>
          </LegalList>
          <LegalText>
            This helps us make The Layman's World better for the Laypeople.
          </LegalText>
        </LegalSubsection>

        <LegalSubsection title="Economy & Virtual Data">
          <LegalText>
            If you use shared economies or virtual points:
          </LegalText>
          <LegalList>
            <li>Balances, transactions, and history are stored</li>
            <li>These are virtual items only and have no real-world cash value</li>
          </LegalList>
        </LegalSubsection>

        <LegalSubsection title="Communications">
          <LegalText>
            If you contact us through community channels (such as Discord):
          </LegalText>
          <LegalList>
            <li>We may store the message and your contact info</li>
            <li>Only to respond or provide help</li>
          </LegalList>
        </LegalSubsection>

        <LegalSubsection title="Automatically Collected Information">
          <LegalText>
            We may automatically collect limited technical information, such as:
          </LegalText>
          <LegalList>
            <li>Device and browser type</li>
            <li>Basic usage and interaction data</li>
            <li>Error logs and performance data</li>
          </LegalList>
          <LegalText>
            This information helps us improve stability, security, and the overall experience.
          </LegalText>
        </LegalSubsection>
      </LegalSection>

      {/* What We Do Not Collect */}
      <LegalSection title="What We Do Not Collect" delay={0.2}>
        <LegalText>
          Let's be very clear. We do not collect:
        </LegalText>
        <LegalList>
          <li>Passwords</li>
          <li>Payment card details (unless added later via trusted processors)</li>
          <li>Government ID</li>
          <li>Real-world location tracking</li>
          <li>Private Discord or Twitch messages</li>
        </LegalList>
      </LegalSection>

      {/* How We Use Your Information */}
      <LegalSection title="How We Use Your Information" delay={0.25}>
        <LegalText>
          We use your data to:
        </LegalText>
        <LegalList>
          <li>Authenticate your account</li>
          <li>Power features and tools</li>
          <li>Sync data across Discord and Twitch</li>
          <li>Maintain shared economies</li>
          <li>Improve performance and features</li>
          <li>Keep the Service secure and functional</li>
        </LegalList>
        <LegalText>
          We process your information based on your consent, to provide the Service, and to maintain security and reliability.
        </LegalText>
        <LegalText highlight>
          We do not sell your data.
        </LegalText>
      </LegalSection>

      {/* Sharing Your Information */}
      <LegalSection title="Sharing Your Information" delay={0.3}>
        <LegalText>
          We only share data when necessary:
        </LegalText>
        <LegalList>
          <li>With Discord and Twitch for OAuth functionality</li>
          <li>With trusted service providers that help host or secure the Service</li>
          <li>If required by law</li>
        </LegalList>
        <LegalText>
          We do not share data for advertising purposes.
        </LegalText>
      </LegalSection>

      {/* Third-Party Services */}
      <LegalSection title="Third-Party Services" delay={0.35}>
        <LegalText>
          The Layman's World may link to or integrate with third-party services such as Twitch, YouTube, Discord, and other platforms. These services have their own privacy policies, and we encourage you to review them.
        </LegalText>
        <LegalText>
          We are not responsible for how third-party platforms collect or use your data.
        </LegalText>
      </LegalSection>

      {/* Data Security */}
      <LegalSection title="Data Security" delay={0.4}>
        <LegalText>
          We take reasonable steps to protect your data using:
        </LegalText>
        <LegalList>
          <li>Secure storage practices</li>
          <li>Access controls</li>
          <li>Industry-standard safeguards</li>
        </LegalList>
        <LegalText>
          That said, no system is 100% perfect. We do our best to keep your data safe.
        </LegalText>
        <LegalText>
          In the event of a data breach that affects your personal information, we will notify affected users as required by law.
        </LegalText>
      </LegalSection>

      {/* Your Privacy Rights */}
      <LegalSection title="Your Privacy Rights" delay={0.45}>
        <LegalText>
          Depending on where you live, you may have the right to:
        </LegalText>
        <LegalList>
          <li>Access your data</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your account and data</li>
          <li>Restrict certain processing</li>
        </LegalList>
        <LegalText>
          You may request deletion of your account and associated data at any time.
        </LegalText>
      </LegalSection>

      {/* Data Retention */}
      <LegalSection title="Data Retention" delay={0.5}>
        <LegalText>
          We retain your data only as long as necessary to provide the Service, comply with legal obligations, resolve disputes, enforce our agreements, or until you request deletion.
        </LegalText>
      </LegalSection>

      {/* Children's Privacy */}
      <LegalSection title="Children's Privacy" delay={0.55}>
        <LegalText>
          The Layman's World is not intended for users under 13. We do not knowingly collect data from children. If we discover we have, we will delete it promptly.
        </LegalText>
      </LegalSection>

      {/* Cookies & Tracking */}
      <LegalSection title="Cookies & Tracking" delay={0.6}>
        <LegalText>
          If we use cookies or similar technologies:
        </LegalText>
        <LegalList>
          <li>They are used only for basic functionality and analytics</li>
          <li>No third-party ad tracking</li>
        </LegalList>
        <LegalText>
          You may disable cookies in your browser settings.
        </LegalText>
      </LegalSection>

      {/* International Users */}
      <LegalSection title="International Users" delay={0.65}>
        <LegalText>
          Your data may be stored or processed in countries other than your own. We take steps to ensure appropriate protections are in place.
        </LegalText>
      </LegalSection>

      {/* Contact */}
      <LegalSection title="Contact" delay={0.7}>
        <LegalText>
          If you have questions or concerns about privacy, reach out through our social channels or the Discord for The Layman's World.
        </LegalText>
        <LegalText>
          We take your concerns seriously and will respond as quickly as we can.
        </LegalText>
      </LegalSection>
    </LegalPageLayout>
  );
});

export default PrivacyPolicy;