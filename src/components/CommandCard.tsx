import { useState } from "react";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { Command } from "@/types/command";
import ParameterBubble from "./ParameterBubble";
import PermissionBadge from "./PermissionBadge";
import TagBadge from "./TagBadge";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface CommandCardProps {
  command: Command;
  orderNumber: number;
}

const MAX_VISIBLE_ALIASES = 2;

// Extracts copyable text: name + usage before first bracket
const getCopyableCommand = (name: string, usage?: string): string => {
  if (!usage) return name;
  // Get everything after the command name
  const usageParams = usage.replace(name, '').trim();
  if (!usageParams) return name;
  
  // Find first bracket and take everything before it
  const bracketIndex = usageParams.indexOf('[');
  if (bracketIndex !== -1) {
    const beforeBracket = usageParams.substring(0, bracketIndex).trim();
    return beforeBracket ? `${name} ${beforeBracket}` : name;
  }
  return `${name} ${usageParams}`;
};

interface CopyButtonProps {
  text: string;
}

const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      description: `Copied: ${text}`,
      duration: 2000,
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center justify-center w-6 h-6 rounded hover:bg-secondary/50 transition-colors text-muted-foreground hover:text-foreground"
      title="Copy command"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
};

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

  // Get usage params for display
  const usageParams = command.usage ? command.usage.replace(command.name, '').trim() : null;

  return (
    <div className="glass-card rounded-lg overflow-hidden hover-lift animate-fade-in" style={{ animationFillMode: 'both' }}>
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
            {/* Line 1: Command name + usage parameters + copy button */}
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono font-semibold text-primary text-lg">
                {command.name}
              </span>
              {usageParams && (
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
              )}
              <CopyButton text={getCopyableCommand(command.name, command.usage)} />
            </div>
            
            {/* Line 2: Permission + Aliases */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <PermissionBadge permission={command.permission} size="md" />
              
              {visibleAliases.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-muted-foreground text-sm">also:</span>
                  {visibleAliases.map((alias, index) => (
                    <span 
                      key={alias} 
                      className={cn(
                        "text-muted-foreground text-sm font-mono bg-secondary/50 px-1.5 py-0.5 rounded",
                        showAllAliases && index >= MAX_VISIBLE_ALIASES && "animate-badge-pop"
                      )}
                      style={showAllAliases && index >= MAX_VISIBLE_ALIASES ? { animationDelay: `${(index - MAX_VISIBLE_ALIASES) * 50}ms` } : undefined}
                    >
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
                      className="text-primary text-sm font-medium hover:text-primary/80 transition-colors animate-badge-pop"
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
                  <TagBadge tag="!mass" size="sm" />
                )}
                {command.commandGroups?.filter(group => group).map((group) => (
                  <TagBadge key={group} tag={group} size="sm" />
                ))}
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
              <h4 className="text-sm font-semibold text-foreground mb-4">Variants</h4>
              <div className="space-y-4">
                {command.parameterGroups?.map((group, index) => (
                  <div key={index} className="bg-card/50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono font-semibold text-primary text-base">{group.name}</span>
                      {group.usage && (
                        <code className="text-muted-foreground/70 text-sm font-mono">
                          {group.usage}
                        </code>
                      )}
                      <CopyButton text={getCopyableCommand(group.name, group.usage)} />
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
