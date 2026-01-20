import { memo } from "react";
import { Megaphone, Calendar } from "lucide-react";
import ScrollRevealSection from "@/components/home/ScrollRevealSection";

// Placeholder for announcements/milestones - will be populated from database later
interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: "announcement" | "milestone";
}

const AnnouncementsSection = memo(function AnnouncementsSection() {
  // Placeholder state - no announcements yet
  const announcements: Announcement[] = [];

  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <ScrollRevealSection>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-center mb-6">
            Announcements
          </h2>
        </ScrollRevealSection>

        <ScrollRevealSection delay={0.1}>
          <p className="text-xl text-muted-foreground text-center mb-12 font-light">
            News, milestones, and updates
          </p>
        </ScrollRevealSection>

        {announcements.length === 0 ? (
          <ScrollRevealSection delay={0.2}>
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Megaphone className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No Announcements Yet</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Check back later for news and updates!
              </p>
            </div>
          </ScrollRevealSection>
        ) : (
          <div className="space-y-4">
            {announcements.map((announcement, index) => (
              <ScrollRevealSection key={announcement.id} delay={0.15 + index * 0.05}>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-muted/15 to-transparent border border-border/20 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      {announcement.type === "milestone" ? (
                        <Calendar className="w-5 h-5 text-primary" />
                      ) : (
                        <Megaphone className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <span className="text-xs text-muted-foreground">
                          {announcement.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground">{announcement.content}</p>
                    </div>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default AnnouncementsSection;
