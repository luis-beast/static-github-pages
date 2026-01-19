import { useState, memo } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { APP_BUTTON_BASE, APP_BUTTON_DEFAULT, APP_BUTTON_ACTIVE } from "@/lib/buttonStyles";

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
            "h-10 px-4 gap-2",
            APP_BUTTON_BASE,
            totalSelected > 0 ? APP_BUTTON_ACTIVE : APP_BUTTON_DEFAULT,
            totalSelected === 0 && "text-muted-foreground"
          )}
        >
          <Filter className="w-4 h-4" />
          {triggerLabel}
          {totalSelected > 0 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-primary text-primary-foreground font-medium">
              {totalSelected}
            </span>
          )}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-200",
              open && "rotate-180"
            )}
          />
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
                {section.selectedItems.length >= (section.clearThreshold ?? 3) && (
                  <button
                    onClick={section.onClearAll}
                    className={cn(
                      "px-2.5 py-1 text-xs cursor-pointer text-muted-foreground hover:text-foreground",
                      APP_BUTTON_BASE,
                      "hover:bg-destructive/10 hover:border-destructive/30 border-transparent"
                    )}
                  >
                    Clear
                  </button>
                )}
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
