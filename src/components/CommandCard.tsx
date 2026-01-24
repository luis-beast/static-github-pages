import { useState, memo, useCallback } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
import { Command } from "@/types/command";
import ParameterBubble from "./ParameterBubble";
import PermissionBadge from "./PermissionBadge";
import TagBadge from "./TagBadge";
import BaseCard from "./ui/BaseCard";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCount from "@/components/AnimatedCount";

interface CommandCardProps {
  command: Command;
  orderNumber: number;
  isFocused?: boolean;
  onFocus?: () => void;
}

const MAX_VISIBLE_ALIASES = 2;

const getCopyableCommand = (name: string, usage?: string): string => {
  if (!usage) return name;
  const usageParams = usage.replace(name, "").trim();
  if (!usageParams) return name;

  const bracketIndex = usageParams.indexOf("[");
  if (bracketIndex !== -1) {
    const beforeBracket = usageParams.substring(0, bracketIndex).trim();
    return beforeBracket ? `${name} ${beforeBracket}` : name;
  }
  return `${name} ${usageParams}`;
};

interface CopyButtonProps {
  text: string;
}

const CopyButton = memo(function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e: React.MouseEvent) => {
      e.stopPropagation();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({ description: `Copied: ${text}`, duration: 2000 });
      setTimeout(() => setCopied(false), 2000);
    },
    [text]
  );

  return (
    <motion.button
      onClick={handleCopy}
      className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-border/50 bg-secondary/50 hover:bg-primary/20 hover:border-primary/30 transition-all duration-200 text-muted-foreground hover:text-foreground"
      title="Copy command"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="w-4 h-4 text-green-500" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Copy className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
});

const CommandCard = memo(function CommandCard({ command, orderNumber, isFocused = false, onFocus }: CommandCardProps) {
  const [showAllAliases, setShowAllAliases] = useState(false);

  const hasParameterGroups = command.parameterGroups && command.parameterGroups.length > 0;
  const hasVariations = command.usageVariations && command.usageVariations.length > 0;
  const hasDetails = hasParameterGroups || hasVariations;
  const canExpand = hasParameterGroups;

  const aliases = command.aliases || [];
  const visibleAliases = showAllAliases ? aliases : aliases.slice(0, MAX_VISIBLE_ALIASES);
  const hiddenCount = aliases.length - MAX_VISIBLE_ALIASES;
  const usageParams = command.usage ? command.usage.replace(command.name, "").trim() : null;

  const handleCardClick = useCallback(() => {
    if (canExpand) {
      onFocus?.();
    }
  }, [onFocus, canExpand]);

  const handleToggleAliases = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setShowAllAliases((prev) => !prev);
  }, []);

  return (
    <BaseCard
      interactive={canExpand}
      isActive={isFocused}
      onClick={handleCardClick}
    >
        <div className={cn("w-full p-5 text-left flex-1")}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20">
                <span className="text-primary font-mono font-bold">{orderNumber}</span>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="mb-3 flex items-center gap-3 flex-wrap">
                <span className="font-mono font-semibold text-primary text-xl">{command.name}</span>
                {usageParams && (
                  <code className="text-muted-foreground text-base font-mono">
                    {usageParams.split("[").map((part, i) => {
                      if (i === 0) return part;
                      const [param, rest] = part.split("]");
                      return (
                        <span key={i}>
                          <span className="text-muted-foreground/50">[{param}]</span>
                          {rest}
                        </span>
                      );
                    })}
                  </code>
                )}
                <CopyButton text={getCopyableCommand(command.name, command.usage)} />
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <PermissionBadge permission={command.permission} size="md" />

                {aliases.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-muted-foreground/60 text-sm">also:</span>
                    <AnimatePresence mode="popLayout">
                      {visibleAliases.map((alias, index) => (
                        <motion.span
                          key={alias}
                          className="text-muted-foreground text-sm font-mono bg-secondary/30 backdrop-blur-sm px-2 py-1 rounded-lg"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            duration: 0.2,
                            delay: showAllAliases && index >= MAX_VISIBLE_ALIASES ? (index - MAX_VISIBLE_ALIASES) * 0.05 : 0,
                          }}
                        >
                          {alias}
                        </motion.span>
                      ))}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      {hiddenCount > 0 && !showAllAliases && (
                        <motion.button
                          key="more-button"
                          onClick={handleToggleAliases}
                          className="text-primary text-sm font-medium hover:text-primary/80 transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.2 }}
                        >
                          +<AnimatedCount value={hiddenCount} /> more
                        </motion.button>
                      )}
                      {showAllAliases && hiddenCount > 0 && (
                        <motion.button
                          key="less-button"
                          onClick={handleToggleAliases}
                          className="text-primary text-sm font-medium hover:text-primary/80 transition-colors px-2 py-1 rounded-lg hover:bg-primary/10"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          show less
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <p className="text-secondary-foreground/80 text-base leading-relaxed">{command.description}</p>

              {(command.massCompatible || (command.commandGroups && command.commandGroups.filter((g) => g).length > 0)) && (
                <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border/20">
                  {command.massCompatible && <TagBadge tag="!mass" size="sm" />}
                  {command.commandGroups?.filter((group) => group).map((group) => (
                    <TagBadge key={group} tag={group} size="sm" />
                  ))}
                </div>
              )}
            </div>

            {canExpand && (
              <motion.div
                className="flex-shrink-0 w-8 h-8 rounded-xl border border-border/50 bg-secondary/50 flex items-center justify-center text-muted-foreground"
                animate={{ rotate: isFocused ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {hasDetails && isFocused && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="border-t border-border/30 bg-secondary/10 backdrop-blur-sm p-5 space-y-6">
                {hasVariations && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">Also works as</h4>
                    <div className="space-y-2">
                      {command.usageVariations!.map((variation, index) => (
                        <code key={index} className="block text-muted-foreground text-sm font-mono bg-card/50 px-3 py-2 rounded-lg">
                          {variation.split("(").map((part, i) => {
                            if (i === 0) return part;
                            const [param, rest] = part.split(")");
                            return (
                              <span key={i}>
                                <span className="text-muted-foreground/50">({param})</span>
                                {rest}
                              </span>
                            );
                          })}
                        </code>
                      ))}
                    </div>
                  </div>
                )}

                {hasParameterGroups && (
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-4">Variants</h4>
                    <div className="space-y-3">
                      {command.parameterGroups?.map((group, index) => (
                        <motion.div
                          key={index}
                          className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/20"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-mono font-semibold text-primary text-base">{group.name}</span>
                            {group.usage && (
                              <code className="text-muted-foreground/60 text-sm font-mono">{group.usage}</code>
                            )}
                            <CopyButton text={getCopyableCommand(group.name, group.usage)} />
                          </div>
                          {group.aliases && group.aliases.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                              {group.aliases.map((alias, aliasIndex) => (
                                <ParameterBubble key={aliasIndex} value={alias} />
                              ))}
                            </div>
                          )}
                          <p className="text-muted-foreground text-sm">{group.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
    </BaseCard>
  );
});

export default CommandCard;
