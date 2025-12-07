import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Command } from "@/types/command";
import PermissionBadge from "./PermissionBadge";
import ParameterBubble from "./ParameterBubble";
import { cn } from "@/lib/utils";

interface CommandCardProps {
  command: Command;
}

const MAX_VISIBLE_ALIASES = 2;

const CommandCard = ({ command }: CommandCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllAliases, setShowAllAliases] = useState(false);
  const [showVariations, setShowVariations] = useState(false);
  const hasDetails = command.parameterGroups && command.parameterGroups.length > 0;
  const hasVariations = command.usageVariations && command.usageVariations.length > 0;

  const visibleAliases = showAllAliases 
    ? command.aliases 
    : command.aliases.slice(0, MAX_VISIBLE_ALIASES);
  const hiddenCount = command.aliases.length - MAX_VISIBLE_ALIASES;

  return (
    <div className="glass-card rounded-lg overflow-hidden hover-lift animate-fade-in">
      <button
        onClick={() => hasDetails && setIsExpanded(!isExpanded)}
        className={cn(
          "w-full p-4 text-left transition-colors",
          hasDetails && "hover:bg-secondary/30 cursor-pointer",
          !hasDetails && "cursor-default"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className="font-mono font-semibold text-primary text-lg">
                {command.name}
              </span>
            </div>
            
            {visibleAliases.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <span className="text-muted-foreground text-sm">also:</span>
                {visibleAliases.map((alias) => (
                  <span key={alias} className="text-muted-foreground text-sm font-mono bg-secondary/50 px-1.5 py-0.5 rounded">
                    {alias}
                  </span>
                ))}
                {hiddenCount > 0 && !showAllAliases && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllAliases(true);
                    }}
                    className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                  >
                    +{hiddenCount} more
                  </button>
                )}
                {showAllAliases && hiddenCount > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAllAliases(false);
                    }}
                    className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
                  >
                    show less
                  </button>
                )}
            
            {showVariations && hasVariations && (
              <div className="mt-2 space-y-1 animate-fade-in">
                {command.usageVariations!.map((variation, index) => (
                  <code key={index} className="block text-muted-foreground text-sm font-mono">
                    {variation.split("(").map((part, i) => {
                      if (i === 0) return part;
                      const [param, rest] = part.split(")");
                      return (
                        <span key={i}>
                          <span className="text-muted-foreground/60">({param})</span>
                          {rest}
                        </span>
                      );
                    })}
                  </code>
                ))}
              </div>
            )}
            </div>
            )}
            
            <div className="flex items-center gap-3 mb-3">
              <PermissionBadge permission={command.permission} />
              <code className="text-muted-foreground text-sm font-mono">
                {command.usage.split("(").map((part, i) => {
                  if (i === 0) return part;
                  const [param, rest] = part.split(")");
                  return (
                    <span key={i}>
                      <span className="text-muted-foreground/60">({param})</span>
                      {rest}
                    </span>
                  );
                })}
              </code>
              {hasVariations && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowVariations(!showVariations);
                  }}
                  className="text-primary text-xs font-medium hover:text-primary/80 transition-colors flex items-center gap-1"
                >
                  {showVariations ? (
                    <>
                      <ChevronUp className="w-3 h-3" />
                      hide variations
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3" />
                      +{command.usageVariations!.length} variations
                    </>
                  )}
                </button>
              )}
            </div>
            
            <p className="text-secondary-foreground text-sm">
              {command.description}
            </p>
            
            {command.massCompatible && (
              <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-accent/30 px-2 py-1 rounded">
                <span>Works with</span>
                <span className="font-mono font-medium text-primary">!mass</span>
              </div>
            )}
          </div>
          
          {hasDetails && (
            <div className="flex-shrink-0 text-muted-foreground">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          )}
        </div>
      </button>
      
      {hasDetails && isExpanded && (
        <div className="border-t border-border/50 bg-secondary/20 p-4 animate-slide-down">
          <h4 className="text-sm font-semibold text-foreground mb-4">Parameters</h4>
          <div className="space-y-4">
            {command.parameterGroups?.map((group, index) => (
              <div key={index} className="bg-card/50 rounded-lg p-3">
                <div className="font-medium text-foreground mb-2">{group.name}</div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {group.aliases.map((alias, aliasIndex) => (
                    <ParameterBubble key={aliasIndex} value={alias} />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandCard;
