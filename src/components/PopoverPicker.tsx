import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PopoverPickerProps<T extends string> {
  items: T[];
  selectedItems: T[];
  onToggle: (item: T) => void;
  onClearAll: () => void;
  renderBadge: (item: T, isActive: boolean, onClick: () => void) => React.ReactNode;
  clearThreshold?: number;
}

function PopoverPicker<T extends string>({
  items,
  selectedItems,
  onToggle,
  onClearAll,
  renderBadge,
  clearThreshold = 3,
}: PopoverPickerProps<T>) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClear = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    onClearAll();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-0.5">
      {/* All items displayed inline, just like Role filters */}
      {items.map((item) => (
        <div key={item} className="p-0.5">
          {renderBadge(item, selectedItems.includes(item), () => onToggle(item))}
        </div>
      ))}
      
      {/* Animated Clear button */}
      <AnimatePresence mode="wait">
        {selectedItems.length >= clearThreshold && (
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
    </div>
  );
}

export default PopoverPicker;
