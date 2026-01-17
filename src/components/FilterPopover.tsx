import { useState } from "react";
import { Filter, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

const FilterPopover = ({ sections, triggerLabel = "Filters" }: FilterPopoverProps) => {
  const [open, setOpen] = useState(false);
  
  const totalSelected = sections.reduce(
    (acc, section) => acc + section.selectedItems.length,
    0
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "gap-2 transition-all duration-200",
            totalSelected > 0
              ? "bg-primary/20 border-primary text-foreground hover:bg-primary/30"
              : "bg-secondary border-border text-muted-foreground hover:bg-secondary/80"
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
                className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-primary text-primary-foreground font-medium"
              >
                {totalSelected}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-auto max-w-[400px] p-4 bg-popover border-border"
      >
        <div className="space-y-4">
          {sections.map((section, sectionIndex) => (
            <div key={section.label}>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-foreground">
                  {section.label}
                </label>
                <AnimatePresence mode="wait">
                  {section.selectedItems.length >= (section.clearThreshold ?? 3) && (
                    <motion.button
                      key="clear-button"
                      onClick={section.onClearAll}
                      className="text-muted-foreground hover:text-foreground hover:bg-accent px-2 py-0.5 text-xs rounded cursor-pointer inline-flex items-center gap-1"
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
              </div>
              <div className="flex flex-wrap gap-1.5">
                {section.items.map((item) => (
                  <div key={item} className="p-0.5">
                    {section.renderBadge(
                      item,
                      section.selectedItems.includes(item),
                      () => section.onToggle(item)
                    )}
                  </div>
                ))}
              </div>
              {sectionIndex < sections.length - 1 && (
                <div className="border-b border-border mt-4" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
