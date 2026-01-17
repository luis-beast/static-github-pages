import { useState } from "react";
import { cn } from "@/lib/utils";
import { getTagColor, getGameColor } from "@/lib/tagColors";
import { PERMISSION_CONFIG, Permission } from "@/components/PermissionBadge";
import { withOpacity, ACTIVE_BACKGROUND_OPACITY } from "@/lib/colorUtils";
import { Plus, X } from "lucide-react";

// ============ Configuration Types ============

interface VisibilityConfig {
  name: string;
  description: string;
  overall?: number;
  text: number;
  border: number;
  background: number;
  borderWidth?: string;
  fontWeight?: number;
  glow?: string;
  glowOpacity?: number;
}

// ============ All 23 Configurations ============

const CONFIGURATIONS: VisibilityConfig[] = [
  // Group A: Overall Opacity Variations
  {
    name: "1. Current Baseline",
    description: "Overall: 0.4 | Text: 0.4 | Border: 0.2 | Bg: 0.03",
    overall: 0.4,
    text: 0.4,
    border: 0.2,
    background: 0.03,
  },
  {
    name: "2. No Overall Opacity",
    description: "Removes CSS opacity, uses HSLA values only",
    text: 0.4,
    border: 0.2,
    background: 0.03,
  },
  {
    name: "3. Mild Overall (0.6)",
    description: "Overall: 0.6 - less dim",
    overall: 0.6,
    text: 0.4,
    border: 0.2,
    background: 0.03,
  },
  {
    name: "4. High Overall (0.8)",
    description: "Overall: 0.8 - barely dim",
    overall: 0.8,
    text: 0.4,
    border: 0.2,
    background: 0.03,
  },

  // Group B: Text Opacity Focus
  {
    name: "5. Text 0.5",
    description: "Text bumped to 0.5, no overall",
    text: 0.5,
    border: 0.25,
    background: 0.04,
  },
  {
    name: "6. Text 0.65",
    description: "Text at 0.65, no overall",
    text: 0.65,
    border: 0.35,
    background: 0.05,
  },
  {
    name: "7. Text 0.8",
    description: "Text at 0.8, no overall",
    text: 0.8,
    border: 0.45,
    background: 0.06,
  },
  {
    name: "8. Full Text (1.0)",
    description: "Full opacity text, dim border/bg only",
    text: 1.0,
    border: 0.3,
    background: 0.05,
  },

  // Group C: Background Emphasis
  {
    name: "9. Soft Background (0.1)",
    description: "Background: 0.1, Text: 0.6",
    text: 0.6,
    border: 0.4,
    background: 0.1,
  },
  {
    name: "10. Medium Background (0.15)",
    description: "Background: 0.15, Text: 0.65",
    text: 0.65,
    border: 0.45,
    background: 0.15,
  },
  {
    name: "11. Strong Background (0.25)",
    description: "Background: 0.25, Text: 0.7",
    text: 0.7,
    border: 0.5,
    background: 0.25,
  },

  // Group D: Border Focus
  {
    name: "12. Thick Border (2px)",
    description: "Border-width: 2px, border opacity: 0.5",
    text: 0.55,
    border: 0.5,
    background: 0.05,
    borderWidth: "2px",
  },
  {
    name: "13. Extra Thick (3px)",
    description: "Border-width: 3px, border opacity: 0.6",
    text: 0.6,
    border: 0.6,
    background: 0.06,
    borderWidth: "3px",
  },
  {
    name: "14. Bright Border Only",
    description: "Border: 0.8, text: 0.5, subtle bg",
    text: 0.5,
    border: 0.8,
    background: 0.04,
  },

  // Group E: Special Effects
  {
    name: "15. Subtle Glow",
    description: "box-shadow glow at 0.3 opacity",
    text: 0.6,
    border: 0.4,
    background: 0.06,
    glow: "0 0 6px",
    glowOpacity: 0.3,
  },
  {
    name: "16. Strong Glow",
    description: "box-shadow glow at 0.5 opacity",
    text: 0.65,
    border: 0.45,
    background: 0.08,
    glow: "0 0 12px",
    glowOpacity: 0.5,
  },
  {
    name: "17. Inner Glow",
    description: "Inset box-shadow",
    text: 0.6,
    border: 0.4,
    background: 0.06,
    glow: "inset 0 0 8px",
    glowOpacity: 0.4,
  },

  // Group F: Typography
  {
    name: "18. Semibold (600)",
    description: "Font-weight: 600 for inactive",
    text: 0.55,
    border: 0.35,
    background: 0.05,
    fontWeight: 600,
  },
  {
    name: "19. Bold (700)",
    description: "Font-weight: 700 for inactive",
    text: 0.5,
    border: 0.3,
    background: 0.04,
    fontWeight: 700,
  },

  // Group G: Combined "Best Of" Presets
  {
    name: "20. Balanced Bright",
    description: "No overall | Text: 0.7 | Border: 0.5 | Bg: 0.1",
    text: 0.7,
    border: 0.5,
    background: 0.1,
  },
  {
    name: "21. Maximum Visibility",
    description: "No overall | Text: 0.85 | Border: 0.7 | Bg: 0.15",
    text: 0.85,
    border: 0.7,
    background: 0.15,
  },
  {
    name: "22. Glow + Bright",
    description: "Text: 0.7 | Border: 0.5 | Subtle glow",
    text: 0.7,
    border: 0.5,
    background: 0.08,
    glow: "0 0 8px",
    glowOpacity: 0.35,
  },
  {
    name: "23. Bold + Bright",
    description: "Text: 0.75 | Font-weight: 600 | Bg: 0.12",
    text: 0.75,
    border: 0.5,
    background: 0.12,
    fontWeight: 600,
  },
];

// ============ Sample Data ============

const SAMPLE_TAGS = ["Layman", "Fun", "Educational", "Interactive"];
const SAMPLE_GAMES = ["Fortnite", "Minecraft", "Valorant", "Just Chatting"];
const SAMPLE_PERMISSIONS: Permission[] = ["follower", "subscriber", "moderator", "streamer"];

// ============ Test Badge Component ============

interface TestBadgeProps {
  label: string;
  color: string;
  config: VisibilityConfig;
  isActive: boolean;
  onClick: () => void;
}

const TestBadge = ({ label, color, config, isActive, onClick }: TestBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const backgroundColor = withOpacity(
    color,
    isActive ? ACTIVE_BACKGROUND_OPACITY : config.background
  );
  const textColor = isActive ? color : withOpacity(color, config.text);
  const borderColor = isActive ? color : withOpacity(color, config.border);

  const glowStyle = !isActive && config.glow && config.glowOpacity
    ? { boxShadow: `${config.glow} ${withOpacity(color, config.glowOpacity)}` }
    : {};

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "inline-flex items-center rounded-md font-medium border transition-all duration-200",
        "px-2 py-0.5 text-sm cursor-pointer hover:scale-105"
      )}
      style={{
        backgroundColor,
        color: textColor,
        borderColor,
        borderWidth: isActive ? undefined : config.borderWidth,
        opacity: isActive ? 1 : (config.overall ?? 1),
        fontWeight: isActive ? undefined : config.fontWeight,
        ...glowStyle,
      }}
    >
      <span
        className={cn(
          "transition-all duration-200 overflow-hidden",
          isHovered ? "opacity-100 w-3 mr-1" : "opacity-0 w-0 mr-0"
        )}
      >
        {isActive ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
      </span>
      {label}
    </button>
  );
};

// ============ Configuration Card ============

interface ConfigCardProps {
  config: VisibilityConfig;
  configIndex: number;
  activeStates: Record<string, boolean>;
  onToggle: (key: string) => void;
}

const ConfigCard = ({ config, configIndex, activeStates, onToggle }: ConfigCardProps) => {
  const getBadgeKey = (type: string, label: string) => `${configIndex}-${type}-${label}`;

  return (
    <div className="bg-card/50 border border-border rounded-lg p-4 space-y-3">
      <div>
        <h3 className="text-foreground font-semibold">{config.name}</h3>
        <p className="text-muted-foreground text-sm">{config.description}</p>
      </div>

      <div className="space-y-2">
        {/* Tags Row */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground w-16 pt-1">Tags:</span>
          {SAMPLE_TAGS.map((tag) => {
            const key = getBadgeKey("tag", tag);
            return (
              <TestBadge
                key={key}
                label={tag}
                color={getTagColor(tag)}
                config={config}
                isActive={activeStates[key] ?? true}
                onClick={() => onToggle(key)}
              />
            );
          })}
        </div>

        {/* Games Row */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground w-16 pt-1">Games:</span>
          {SAMPLE_GAMES.map((game) => {
            const key = getBadgeKey("game", game);
            return (
              <TestBadge
                key={key}
                label={game}
                color={getGameColor(game)}
                config={config}
                isActive={activeStates[key] ?? true}
                onClick={() => onToggle(key)}
              />
            );
          })}
        </div>

        {/* Permissions Row */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground w-16 pt-1">Roles:</span>
          {SAMPLE_PERMISSIONS.map((perm) => {
            const key = getBadgeKey("perm", perm);
            const permConfig = PERMISSION_CONFIG[perm];
            return (
              <TestBadge
                key={key}
                label={permConfig.label}
                color={permConfig.color}
                config={config}
                isActive={activeStates[key] ?? true}
                onClick={() => onToggle(key)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ============ Main Page Component ============

const BadgeTest = () => {
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>({});

  const handleToggle = (key: string) => {
    setActiveStates((prev) => ({
      ...prev,
      [key]: prev[key] === undefined ? false : !prev[key],
    }));
  };

  const resetAll = () => {
    setActiveStates({});
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">🎨 Badge Visibility Test</h1>
          <p className="text-muted-foreground">
            Click any badge to toggle between active and inactive states
          </p>
          <button
            onClick={resetAll}
            className="mt-2 px-4 py-2 bg-primary/10 text-primary border border-primary/30 rounded-md hover:bg-primary/20 transition-colors text-sm"
          >
            Reset All to Active
          </button>
        </div>

        {/* Group A */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Group A: Overall Opacity Variations
          </h2>
          <div className="grid gap-4">
            {CONFIGURATIONS.slice(0, 4).map((config, i) => (
              <ConfigCard
                key={config.name}
                config={config}
                configIndex={i}
                activeStates={activeStates}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Group B */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Group B: Text Opacity Focus
          </h2>
          <div className="grid gap-4">
            {CONFIGURATIONS.slice(4, 8).map((config, i) => (
              <ConfigCard
                key={config.name}
                config={config}
                configIndex={i + 4}
                activeStates={activeStates}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Group C */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Group C: Background Emphasis
          </h2>
          <div className="grid gap-4">
            {CONFIGURATIONS.slice(8, 11).map((config, i) => (
              <ConfigCard
                key={config.name}
                config={config}
                configIndex={i + 8}
                activeStates={activeStates}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Group D */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Group D: Border Focus
          </h2>
          <div className="grid gap-4">
            {CONFIGURATIONS.slice(11, 14).map((config, i) => (
              <ConfigCard
                key={config.name}
                config={config}
                configIndex={i + 11}
                activeStates={activeStates}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Group E */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Group E: Special Effects
          </h2>
          <div className="grid gap-4">
            {CONFIGURATIONS.slice(14, 17).map((config, i) => (
              <ConfigCard
                key={config.name}
                config={config}
                configIndex={i + 14}
                activeStates={activeStates}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Group F */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Group F: Typography
          </h2>
          <div className="grid gap-4">
            {CONFIGURATIONS.slice(17, 19).map((config, i) => (
              <ConfigCard
                key={config.name}
                config={config}
                configIndex={i + 17}
                activeStates={activeStates}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>

        {/* Group G */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Group G: Combined "Best Of" Presets
          </h2>
          <div className="grid gap-4">
            {CONFIGURATIONS.slice(19, 23).map((config, i) => (
              <ConfigCard
                key={config.name}
                config={config}
                configIndex={i + 19}
                activeStates={activeStates}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeTest;
