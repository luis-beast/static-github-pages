import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tags, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCount from "@/components/AnimatedCount";

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const visibleSelected = isExpanded 
    ? selectedItems 
    : selectedItems.slice(0, maxVisibleSelected);
  const hiddenCount = selectedItems.length - maxVisibleSelected;

  // Reset expansion when items drop below threshold
  useEffect(() => {
    if (selectedItems.length <= maxVisibleSelected) {
      setIsExpanded(false);
    }
  }, [selectedItems.length, maxVisibleSelected]);

  const buttonSizeClasses = size === "sm" 
    ? "text-xs px-2.5 py-1.5" 
    : "text-sm px-3 py-2";

  const popoverWidth = size === "sm" ? "w-[260px]" : "w-[280px]";

  const handleExpand = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsExpanded(true);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleClear = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsExpanded(false);
    onClearAll();
    setTimeout(() => setIsAnimating(false), 300);
  };

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
            <motion.span 
              layout
              className={cn(
                "px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded overflow-hidden",
                selectedItems.length > 0 ? "ml-2 min-w-[1.5rem] opacity-100" : "ml-0 w-0 opacity-0 px-0"
              )}
              animate={{
                width: selectedItems.length > 0 ? "auto" : 0,
                marginLeft: selectedItems.length > 0 ? 8 : 0,
                paddingLeft: selectedItems.length > 0 ? 6 : 0,
                paddingRight: selectedItems.length > 0 ? 6 : 0,
                opacity: selectedItems.length > 0 ? 1 : 0,
              }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <AnimatedCount value={selectedItems.length} />
            </motion.span>
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className={cn("p-3 bg-card border-border", popoverWidth)} 
          align="start"
        >
          {/* Scrollable container with fade indicator */}
          <div className="relative">
            <ScrollArea className="max-h-[180px]">
              <div className="flex flex-wrap gap-1.5 p-1 pr-3">
                {items.map((item) => (
                  <div key={item} className="p-0.5">
                    {renderBadge(item, selectedItems.includes(item), () => onToggle(item))}
                  </div>
                ))}
              </div>
            </ScrollArea>
            {/* Bottom fade indicator */}
            <div className="absolute bottom-0 left-0 right-3 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
          </div>
          {selectedItems.length >= clearThreshold && (
            <button
              className="mt-2 w-full text-muted-foreground hover:text-foreground hover:bg-accent px-2.5 py-1.5 text-xs rounded transition-colors cursor-pointer inline-flex items-center justify-center gap-1.5"
              onClick={handleClear}
            >
              <X className="w-3 h-3" />
              Clear
            </button>
          )}
        </PopoverContent>
      </Popover>
      
      {/* Selected items display with +X more */}
      <AnimatePresence mode="popLayout">
        {selectedItems.length > 0 && (
          <motion.div 
            className="flex flex-wrap items-center gap-1.5 p-0.5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <AnimatePresence mode="popLayout">
              {visibleSelected.map((item, index) => (
                <motion.div 
                  key={item} 
                  layout
                  className="p-0.5 whitespace-nowrap"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ 
                    duration: 0.2, 
                    delay: isExpanded && index >= maxVisibleSelected ? (index - maxVisibleSelected) * 0.05 : 0 
                  }}
                >
                  {renderBadge(item, true, () => onToggle(item))}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* +X more button */}
            <AnimatePresence mode="wait">
              {hiddenCount > 0 && !isExpanded && (
              <motion.button
                  key="more-button"
                  onClick={handleExpand}
                  className="text-xs text-muted-foreground px-2 py-1 hover:text-foreground transition-colors"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  +<AnimatedCount value={hiddenCount} /> more
                </motion.button>
              )}
            </AnimatePresence>

            {/* Clear button - shows when expanded or when clearThreshold met */}
            <AnimatePresence mode="wait">
              {((isExpanded && hiddenCount > 0) || selectedItems.length >= clearThreshold) && (
                <motion.button
                  key="clear-button"
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground hover:bg-accent px-2.5 py-1 text-xs rounded cursor-pointer inline-flex items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-3 h-3" />
                  Clear
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default PopoverPicker;
