import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tags, X } from "lucide-react";

interface PopoverPickerProps<T extends string> {
  items: T[];
  selectedItems: T[];
  onToggle: (item: T) => void;
  onClearAll: () => void;
  renderBadge: (item: T, isActive: boolean, onClick: () => void) => React.ReactNode;
  label: string;
  icon?: React.ReactNode;
  maxVisibleSelected?: number;
  clearThreshold?: number;
  size?: "sm" | "md";
}

function PopoverPicker<T extends string>({
  items,
  selectedItems,
  onToggle,
  onClearAll,
  renderBadge,
  label,
  icon = <Tags className="w-4 h-4" />,
  maxVisibleSelected = 2,
  clearThreshold = 3,
  size = "md",
}: PopoverPickerProps<T>) {
  const [open, setOpen] = useState(false);

  const visibleSelected = selectedItems.slice(0, maxVisibleSelected);
  const hiddenCount = selectedItems.length - maxVisibleSelected;

  const buttonSizeClasses = size === "sm" 
    ? "text-xs px-2.5 py-1.5" 
    : "text-sm px-3 py-2";

  const popoverWidth = size === "sm" ? "w-[260px]" : "w-[280px]";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className={cn("bg-secondary border-border", buttonSizeClasses)}
          >
            {icon}
            <span className="ml-2">{label}</span>
            <span 
              className={cn(
                "px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded overflow-hidden transition-all duration-200",
                selectedItems.length > 0 ? "ml-2 min-w-[1.5rem] opacity-100" : "ml-0 w-0 opacity-0 px-0"
              )}
            >
              {selectedItems.length > 0 && (
                <span key={selectedItems.length} className="animate-count-change inline-block">
                  {selectedItems.length}
                </span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className={cn("p-3 bg-card border-border", popoverWidth)} 
          align="start"
        >
          <div className="flex flex-wrap gap-1.5 max-h-[180px] overflow-y-auto p-1">
            {items.map((item) => (
              <div key={item} className="p-0.5 max-w-[60%]">
                {renderBadge(item, selectedItems.includes(item), () => onToggle(item))}
              </div>
            ))}
          </div>
          {selectedItems.length >= clearThreshold && (
            <button
              className="mt-2 w-full text-muted-foreground hover:text-foreground hover:bg-accent px-2.5 py-1.5 text-xs rounded transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
              onClick={() => {
                onClearAll();
              }}
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </PopoverContent>
      </Popover>
      
      {/* Selected items display with +X more */}
      {selectedItems.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 p-0.5">
          {visibleSelected.map((item, index) => (
            <div 
              key={item} 
              className="p-0.5 animate-badge-pop"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {renderBadge(item, true, () => onToggle(item))}
            </div>
          ))}
          <span 
            className={cn(
              "text-xs text-muted-foreground px-2 py-1 overflow-hidden transition-all duration-200",
              hiddenCount > 0 ? "w-auto opacity-100" : "w-0 px-0 opacity-0"
            )}
          >
            +{hiddenCount} more
          </span>
          <button
            onClick={onClearAll}
            className={cn(
              "text-muted-foreground hover:text-foreground hover:bg-accent py-1 text-xs rounded cursor-pointer inline-flex items-center gap-1.5 transition-all duration-200",
              hiddenCount > 0 
                ? "px-2.5 opacity-100 scale-100 animate-badge-pop" 
                : "px-0 w-0 opacity-0 scale-0"
            )}
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default PopoverPicker;
