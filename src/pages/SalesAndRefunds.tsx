import { memo } from "react";
import { motion } from "framer-motion";
import { DURATION, EASING } from "@/lib/constants";
import GradientText from "@/components/ui/GradientText";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

const SalesAndRefunds = memo(function SalesAndRefunds() {
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
            <GradientText gradient="louie">Sales & Refunds</GradientText>
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
              <h2 className="text-2xl font-bold">Merchandise Sales</h2>
              <p className="text-muted-foreground leading-relaxed">
                When our merchandise store launches, all sales will be processed through our official store platform. Prices, availability, and shipping options will be clearly displayed at checkout.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.1}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Refund Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We want you to be happy with your purchase. If you're not satisfied, you may request a refund within 30 days of receiving your order. Items must be unused and in original packaging.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.15}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Exchanges</h2>
              <p className="text-muted-foreground leading-relaxed">
                Need a different size or color? We'll do our best to accommodate exchanges based on availability. Contact us within 30 days of receiving your order to initiate an exchange.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.2}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Shipping</h2>
              <p className="text-muted-foreground leading-relaxed">
                Shipping times and costs vary by location. Detailed shipping information will be provided at checkout. We are not responsible for delays caused by shipping carriers or customs.
              </p>
            </div>
          </ScrollRevealSection>

          <ScrollRevealSection delay={0.25}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact for Support</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any questions about orders, refunds, or exchanges, please reach out through our Discord community or social media channels. We're here to help!
              </p>
            </div>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
});

export default SalesAndRefunds;
