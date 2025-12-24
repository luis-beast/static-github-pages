import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Command } from "@/types/command";
import ParameterBubble from "./ParameterBubble";
import { cn } from "@/lib/utils";
import { getTagColor, getTagColorWithOpacity, toProperCase } from "@/lib/tagColors";

interface CommandCardProps {
  command: Command;
  orderNumber: number;
}

const MAX_VISIBLE_ALIASES = 2;

const CommandCard = ({ command, orderNumber }: CommandCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAllAliases, setShowAllAliases] = useState(false);
  const hasParameterGroups = command.parameterGroups && command.parameterGroups.length > 0;
  const hasVariations = command.usageVariations && command.usageVariations.length > 0;
  const hasDetails = hasParameterGroups || hasVariations;

  const aliases = command.aliases || [];
  const visibleAliases = showAllAliases 
    ? aliases 
    : aliases.slice(0, MAX_VISIBLE_ALIASES);
  const hiddenCount = aliases.length - MAX_VISIBLE_ALIASES;

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
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
            <span className="text-primary font-mono font-semibold">{orderNumber}</span>
          </div>
          <div className="flex-1 min-w-0">
            {/* Line 1: Command name + usage parameters */}
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-mono font-semibold text-primary text-lg">
                {command.name}
              </span>
              {command.usage && (() => {
                // Extract just the parameters from usage (everything after the command name)
                const usageParams = command.usage.replace(command.name, '').trim();
                if (!usageParams) return null;
                return (
                  <code className="text-muted-foreground text-base font-mono">
                    {usageParams.split("[").map((part, i) => {
                      if (i === 0) return part;
                      const [param, rest] = part.split("]");
                      return (
                        <span key={i}>
                          <span className="text-muted-foreground/60">[{param}]</span>
                          {rest}
                        </span>
                      );
                    })}
                  </code>
                );
              })()}
            </div>
            
            {/* Line 2: Permission + Aliases */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-sm font-medium border ${
                {
                  follower: "bg-perm-follower/20 text-perm-follower border-perm-follower/30",
                  subscriber: "bg-perm-subscriber/20 text-perm-subscriber border-perm-subscriber/30",
                  moderator: "bg-perm-moderator/20 text-perm-moderator border-perm-moderator/30",
                  streamer: "bg-perm-streamer/20 text-perm-streamer border-perm-streamer/30",
                }[command.permission]
              }`}>
                {command.permission.charAt(0).toUpperCase() + command.permission.slice(1)}
              </span>
              
              {visibleAliases.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
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
                </div>
              )}
            </div>
            
            <p className="text-secondary-foreground text-sm">
              {command.description}
            </p>
            
            {(command.massCompatible || (command.commandGroups && command.commandGroups.filter(g => g).length > 0)) && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-border/30">
                {command.massCompatible && (
                  <span 
                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                    style={{ 
                      backgroundColor: "hsla(280, 70%, 55%, 0.15)",
                      color: "hsl(280, 70%, 65%)",
                      borderColor: "hsl(280, 70%, 65%)"
                    }}
                  >
                    !mass
                  </span>
                )}
                {command.commandGroups?.filter(group => group).map((group) => {
                  const tagColor = getTagColor(group);
                  const tagBgColor = getTagColorWithOpacity(group, 0.15);
                  return (
                    <span 
                      key={group} 
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                      style={{ 
                        backgroundColor: tagBgColor,
                        color: tagColor,
                        borderColor: tagColor
                      }}
                    >
                      {toProperCase(group)}
                    </span>
                  );
                })}
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
        <div className="border-t border-border/50 bg-secondary/20 p-4 animate-slide-down space-y-6">
          {hasVariations && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Also works as</h4>
              <div className="space-y-1">
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
            </div>
          )}
          
          {hasParameterGroups && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Options</h4>
              <div className="space-y-4">
                {command.parameterGroups?.map((group, index) => (
                  <div key={index} className="bg-card/50 rounded-lg p-3">
                    <div className="font-medium text-foreground mb-2">{group.title}</div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="font-mono font-semibold text-primary text-base">{group.name}</span>
                      {group.usage && (
                        <code className="text-muted-foreground/70 text-sm font-mono">
                          {group.usage}
                        </code>
                      )}
                    </div>
                    {group.aliases && group.aliases.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {group.aliases.map((alias, aliasIndex) => (
                          <ParameterBubble key={aliasIndex} value={alias} />
                        ))}
                      </div>
                    )}
                    <p className="text-muted-foreground text-sm">{group.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommandCard;
