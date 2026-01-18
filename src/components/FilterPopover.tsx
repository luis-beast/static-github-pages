import { useState, memo } from "react";
import { Filter, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface FilterSection<T extends string> {
  label: string;
  items: T[];
  selectedItems: T[];
  onToggle: (item: T) => void;
  onClearAll: () => void;
  renderBadge: (item: T, isActive: boolean, onClick: () => void) => React.ReactNode;
  clearThreshold?: number;
}

interface FilterPopoverProps {
  sections: FilterSection<string>[];
  triggerLabel?: string;
}

const FilterPopover = memo(function FilterPopover({
  sections,
  triggerLabel = "Filters",
}: FilterPopoverProps) {
  const [open, setOpen] = useState(false);
  const totalSelected = sections.reduce((acc, section) => acc + section.selectedItems.length, 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "h-10 px-4 gap-2 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
            totalSelected > 0
              ? "bg-primary/10 border-primary/30 text-foreground hover:bg-primary/20"
              : "bg-secondary/50 border-border/50 text-muted-foreground hover:bg-secondary"
          )}
        >
          <Filter className="w-4 h-4" />
          {triggerLabel}
          <AnimatePresence mode="wait">
            {totalSelected > 0 && (
              <motion.span
                key="count"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.15 }}
                className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground font-medium"
              >
                {totalSelected}
              </motion.span>
            )}
          </AnimatePresence>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto max-w-[420px] p-5 bg-card/95 backdrop-blur-xl border-border/50 rounded-2xl shadow-2xl"
      >
        <div className="space-y-5">
          {sections.map((section, sectionIndex) => (
            <div key={section.label}>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">{section.label}</label>
                <AnimatePresence mode="wait">
                  {section.selectedItems.length >= (section.clearThreshold ?? 3) && (
                    <motion.button
                      key="clear-button"
                      onClick={section.onClearAll}
                      className="text-muted-foreground hover:text-foreground hover:bg-destructive/10 px-2.5 py-1 text-xs rounded-lg cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <X className="w-3 h-3" />
                      Clear
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <div key={item}>
                    {section.renderBadge(item, section.selectedItems.includes(item), () => section.onToggle(item))}
                  </div>
                ))}
              </div>
              {sectionIndex < sections.length - 1 && (
                <div className="border-b border-border/30 mt-5" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
});

export default FilterPopover;
