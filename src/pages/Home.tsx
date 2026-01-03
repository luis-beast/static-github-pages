import {
  Info,
  ScrollText,
  Globe,
  MessageCircle,
  ShoppingBag,
  Calendar,
  Monitor,
  ExternalLink,
  Heart,
} from "lucide-react";
import avatar from "@/assets/avatar.jpeg";
import { motion } from "framer-motion";

const SocialLink = ({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  color: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200 hover:scale-105 group`}
  >
    <Icon className={`w-5 h-5 ${color}`} />
    <span className="font-medium">{label}</span>
    <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
  </a>
);

const SectionCard = ({
  icon: Icon,
  title,
  children,
  iconColor = "text-primary",
  index = 0,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  iconColor?: string;
  index?: number;
}) => (
  <motion.div
    className="glass-card rounded-xl p-6 hover-lift"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
  >
    <div className="flex items-center gap-3 mb-4">
      <Icon className={`w-6 h-6 ${iconColor}`} />
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {children}
  </motion.div>
);

const Home = () => {
  const scheduleItems = [
    { day: "One Random Weekday", time: "Starting at 10 pm (CST)" },
    { day: "Friday", time: "Starting at 10 pm (CST)" },
    { day: "Saturday", time: "Starting at 5 pm (CST)" },
    { day: "Sunday", time: "Starting at 10 pm (CST)" },
  ];

  const setupSpecs = [
    { label: "CPU", value: "Intel Pentium G6400" },
    { label: "GPU", value: "NVIDIA GeForce GT 710" },
    { label: "Memory", value: "Crucial 4GB DDR4 2133MHz" },
    { label: "Storage", value: "Kingston A400 120GB SATA SSD" },
    { label: "Headset", value: "Logitech H111 Stereo Headset" },
    { label: "Microphone", value: "Logitech H111 Stereo Headset" },
  ];

  const rules = [
    "Be kind",
    "No hate, spam, or harassment",
    "Keep chats appropriate",
    "No backseat gaming unless I ask",
    "Respect the Layman Legion",
  ];

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.header
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="relative inline-block mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary/50 glow-primary mx-auto">
              <img src={avatar} alt="LaymanLouie" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              LIVE
            </div>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-3 pb-1"
            style={{
              background: "linear-gradient(to bottom, #bb66ff, #8800FF)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            LaymanLouie
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Welcome to The Layman's World
          </motion.p>
        </motion.header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* About Me */}
          <SectionCard icon={Info} title="About Me" iconColor="text-blue-400" index={0}>
            <p className="text-muted-foreground mb-4">
              I'm <span className="text-foreground font-semibold">The Layman</span>, and I'm here to create a space full
              of fun moments, good laughs, and a community you can feel comfortable in.
            </p>
            <p className="text-muted-foreground mb-4">
              Whether we're gaming, talking, or just hanging out, the goal is always the same.
            </p>
            <blockquote className="border-l-2 border-primary pl-4 italic text-foreground/90">
              "Good vibes, good people, and a good time together."
            </blockquote>
            <p className="mt-4 text-muted-foreground">Settle in and enjoy!</p>
          </SectionCard>

          {/* Rules */}
          <SectionCard icon={ScrollText} title="Rules" iconColor="text-amber-400" index={1}>
            <p className="text-muted-foreground mb-4">
              We keep things <span className="text-foreground font-semibold">friendly</span>,{" "}
              <span className="text-foreground font-semibold">respectful</span>, and{" "}
              <span className="text-foreground font-semibold">cozy</span> for everyone.
            </p>
            <ul className="space-y-2">
              {rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2 text-muted-foreground">
                  <Heart className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              We want this world to feel safe and welcoming for{" "}
              <span className="text-foreground font-semibold">ALL</span> Laypeople.
            </p>
          </SectionCard>

          {/* Socials */}
          <SectionCard icon={Globe} title="Socials" iconColor="text-green-400" index={2}>
            <p className="text-muted-foreground mb-4">Stay connected with all things Layman!</p>
            <div className="space-y-2">
              <SocialLink
                href="https://www.twitch.tv/laymanlouie"
                icon={() => (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                  </svg>
                )}
                label="Twitch"
                color="text-purple-400"
              />
              <SocialLink
                href="https://www.youtube.com/channel/UC09m7mKa2IACCB60D9sZ-wQ"
                icon={() => (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                )}
                label="YouTube"
                color="text-red-400"
              />
              <SocialLink
                href="https://www.tiktok.com/@laymanlouie"
                icon={() => (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                )}
                label="TikTok"
                color="text-pink-400"
              />
              <SocialLink
                href="https://www.instagram.com/laymanlouie"
                icon={() => (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.757-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                )}
                label="Instagram"
                color="text-orange-400"
              />
            </div>
          </SectionCard>

          {/* Discord */}
          <SectionCard icon={MessageCircle} title="Discord" iconColor="text-indigo-400" index={3}>
            <p className="text-muted-foreground mb-4">
              Join <span className="text-foreground font-semibold">The Layman's World</span> on Discord!
            </p>
            <p className="text-muted-foreground mb-4">
              We share games, laughs, memes, conversations, and genuinely good vibes. If you want to be part of the
              Laypeople outside of the stream, this is the best place to be!
            </p>
            <a
              href="https://discord.gg/PAy62ZZNzy"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
              </svg>
              <span className="mx-2">Discord</span>
              <ExternalLink className="h-4 w-0 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-200 overflow-hidden ml-0 group-hover:ml-1" />
            </a>
          </SectionCard>

          {/* Stream Schedule */}
          <SectionCard icon={Calendar} title="Stream Schedule" iconColor="text-cyan-400" index={4}>
            <p className="text-muted-foreground mb-4">
              Streams happen <span className="text-foreground font-semibold">OFTEN</span>, and the best way to catch
              them is to follow and turn on notifications!
            </p>
            <p className="text-sm text-muted-foreground italic mb-4">
              Times may shift depending on life, work, or when inspiration strikes, but you'll always know when
              something fun is happening!
            </p>
            <div className="space-y-3">
              {scheduleItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="font-medium text-foreground">{item.day}</span>
                  <span className="text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Setup */}
          <SectionCard icon={Monitor} title="Setup" iconColor="text-emerald-400" index={5}>
            <p className="text-muted-foreground mb-4">
              Curious about the tech that makes the stream run? Here's my current setup:
            </p>
            <div className="space-y-2">
              {setupSpecs.map((spec, index) => (
                <div key={index} className="flex gap-2 text-sm">
                  <span className="font-semibold text-foreground min-w-[90px]">{spec.label}:</span>
                  <span className="text-muted-foreground italic">{spec.value}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Merch */}
          <SectionCard icon={ShoppingBag} title="Merch" iconColor="text-rose-400" index={6}>
            <div className="text-center py-8">
              <p className="text-2xl font-bold text-muted-foreground mb-2">NOT IMPLEMENTED YET!</p>
              <p className="text-sm text-muted-foreground">Stay tuned for Layman merch coming soon...</p>
            </div>
          </SectionCard>
        </div>

        {/* Footer */}
        <motion.footer
          className="text-center py-8 border-t border-border/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-muted-foreground text-sm">
            Made with <Heart className="w-4 h-4 inline text-primary" /> by The Layman Legion
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export default Home;
