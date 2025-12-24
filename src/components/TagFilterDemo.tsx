import { useState } from "react";
import { cn } from "@/lib/utils";
import TagBadge from "@/components/TagBadge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, ChevronUp, Filter, Tags, X } from "lucide-react";
import { getTagColor } from "@/lib/tagColors";

interface TagFilterDemoProps {
  availableTags: string[];
}

const TagFilterDemo = ({ availableTags }: TagFilterDemoProps) => {
  // Style 1: Multi-Select Dropdown
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [selectedTags1, setSelectedTags1] = useState<string[]>([]);

  // Style 2: Collapsible Section
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [selectedTags2, setSelectedTags2] = useState<string[]>([]);

  // Style 3: Searchable Command Menu
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedTags3, setSelectedTags3] = useState<string[]>([]);

  // Style 4: Show More/Less
  const [showAll, setShowAll] = useState(false);
  const [selectedTags4, setSelectedTags4] = useState<string[]>([]);
  const INITIAL_SHOW_COUNT = 8;

  // Style 5: Popover Picker
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedTags5, setSelectedTags5] = useState<string[]>([]);

  const toggleTag = (
    tag: string,
    selected: string[],
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="glass-card rounded-lg p-6 mb-6 space-y-8">
      <div className="text-center border-b border-border pb-4">
        <h2 className="text-xl font-bold text-foreground mb-1">
          Tag Filter Style Demo
        </h2>
        <p className="text-sm text-muted-foreground">
          Try each style and pick your favorite. This section will be removed after you decide.
        </p>
      </div>

      {/* Style 1: Multi-Select Dropdown */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">1</span>
          <h3 className="text-sm font-medium text-foreground">Multi-Select Dropdown</h3>
        </div>
        <Popover open={dropdown1Open} onOpenChange={setDropdown1Open}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[300px] justify-between bg-secondary border-border"
            >
              <span className="flex items-center gap-2">
                <Tags className="w-4 h-4" />
                {selectedTags1.length === 0
                  ? "Select tags..."
                  : `${selectedTags1.length} tag${selectedTags1.length > 1 ? "s" : ""} selected`}
              </span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-2 bg-card border-border" align="start">
            <div className="flex flex-wrap gap-1.5 max-h-[200px] overflow-y-auto">
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag, selectedTags1, setSelectedTags1)}
                  className={cn(
                    "px-2.5 py-1 text-xs rounded-full border transition-all",
                    selectedTags1.includes(tag)
                      ? "bg-primary/20 border-primary text-primary"
                      : "bg-secondary border-border text-muted-foreground hover:border-primary/50"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {selectedTags1.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {selectedTags1.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full bg-primary/20 text-primary border border-primary"
              >
                {tag}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-primary/70"
                  onClick={() => toggleTag(tag, selectedTags1, setSelectedTags1)}
                />
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Style 2: Collapsible Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">2</span>
          <h3 className="text-sm font-medium text-foreground">Collapsible Section</h3>
        </div>
        <Collapsible open={collapsibleOpen} onOpenChange={setCollapsibleOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="bg-secondary border-border">
              <Filter className="w-4 h-4 mr-2" />
              Filter by Tags
              {selectedTags2.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded">
                  {selectedTags2.length}
                </span>
              )}
              {collapsibleOpen ? (
                <ChevronUp className="w-4 h-4 ml-2" />
              ) : (
                <ChevronDown className="w-4 h-4 ml-2" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  size="md"
                  isActive={selectedTags2.includes(tag)}
                  onClick={() => toggleTag(tag, selectedTags2, setSelectedTags2)}
                />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Style 3: Searchable Command Menu */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">3</span>
          <h3 className="text-sm font-medium text-foreground">Searchable Command Menu</h3>
        </div>
        <Popover open={commandOpen} onOpenChange={setCommandOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-[300px] justify-between bg-secondary border-border"
            >
              <span className="flex items-center gap-2">
                <Tags className="w-4 h-4" />
                {selectedTags3.length === 0
                  ? "Search and select tags..."
                  : `${selectedTags3.length} tag${selectedTags3.length > 1 ? "s" : ""} selected`}
              </span>
              <ChevronDown className="w-4 h-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0 bg-card border-border" align="start">
            <Command className="bg-transparent">
              <CommandInput placeholder="Search tags..." className="border-b border-border" />
              <CommandList>
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup className="max-h-[200px] overflow-y-auto">
                  {availableTags.map((tag) => (
                    <CommandItem
                      key={tag}
                      value={tag}
                      onSelect={() => toggleTag(tag, selectedTags3, setSelectedTags3)}
                      className="cursor-pointer"
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded border",
                          selectedTags3.includes(tag)
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted-foreground"
                        )}
                      >
                        {selectedTags3.includes(tag) && <Check className="h-3 w-3" />}
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: getTagColor(tag) }}
                      >
                        {tag}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedTags3.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {selectedTags3.map((tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                size="sm"
                isActive={true}
                onClick={() => toggleTag(tag, selectedTags3, setSelectedTags3)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Style 4: Show More/Less */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">4</span>
          <h3 className="text-sm font-medium text-foreground">Show More / Less</h3>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {(showAll ? availableTags : availableTags.slice(0, INITIAL_SHOW_COUNT)).map(
            (tag) => (
              <TagBadge
                key={tag}
                tag={tag}
                size="md"
                isActive={selectedTags4.includes(tag)}
                onClick={() => toggleTag(tag, selectedTags4, setSelectedTags4)}
              />
            )
          )}
          {availableTags.length > INITIAL_SHOW_COUNT && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAll(!showAll)}
              className="text-muted-foreground hover:text-foreground"
            >
              {showAll
                ? "Show less"
                : `+${availableTags.length - INITIAL_SHOW_COUNT} more`}
            </Button>
          )}
        </div>
      </div>

      {/* Style 5: Popover Picker */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">5</span>
          <h3 className="text-sm font-medium text-foreground">Popover Picker</h3>
        </div>
        <div className="flex items-center gap-3">
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="bg-secondary border-border">
                <Tags className="w-4 h-4 mr-2" />
                Pick Tags
                {selectedTags5.length > 0 && (
                  <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary/20 text-primary rounded">
                    {selectedTags5.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-4 bg-card border-border" align="start">
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <TagBadge
                    key={tag}
                    tag={tag}
                    size="md"
                    isActive={selectedTags5.includes(tag)}
                    onClick={() => toggleTag(tag, selectedTags5, setSelectedTags5)}
                  />
                ))}
              </div>
              {selectedTags5.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3 w-full text-muted-foreground"
                  onClick={() => setSelectedTags5([])}
                >
                  Clear all
                </Button>
              )}
            </PopoverContent>
          </Popover>
          {selectedTags5.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {selectedTags5.map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  size="sm"
                  isActive={true}
                  onClick={() => toggleTag(tag, selectedTags5, setSelectedTags5)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TagFilterDemo;
