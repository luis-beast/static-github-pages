import { Permission } from "@/components/PermissionBadge";
import { Search, Tags, X, ArrowDownAZ, ArrowUpZA, ArrowDown01, ArrowUp10, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PermissionBadge from "@/components/PermissionBadge";
import TagBadge from "@/components/TagBadge";
import PopoverPicker from "@/components/PopoverPicker";
import { cn } from "@/lib/utils";

export type AlphabeticalOrder = "asc" | "desc";
export type RoleSort = "off" | "asc" | "desc";

interface CommandFiltersProps {
  alphabeticalOrder: AlphabeticalOrder;
  onAlphabeticalToggle: () => void;
  roleSort: RoleSort;
  onRoleSortCycle: () => void;
  selectedPermissions: Permission[];
  onPermissionToggle: (permission: Permission) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
  onClearPermissions: () => void;
  resultCount: number;
}

const permissions: Permission[] = ["follower", "subscriber", "moderator", "streamer"];

const CommandFilters = ({
  alphabeticalOrder,
  onAlphabeticalToggle,
  roleSort,
  onRoleSortCycle,
  selectedPermissions,
  onPermissionToggle,
  searchQuery,
  onSearchChange,
  availableTags,
  selectedTags,
  onTagToggle,
  onClearTags,
  onClearPermissions,
  resultCount,
}: CommandFiltersProps) => {
  return (
    <div className="glass-card rounded-lg p-4 mb-6 space-y-4">
      {/* Row 1: Role Filter (Left) + Sort Buttons (Right) */}
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Role Filter
          </label>
          <div className="flex flex-wrap items-center gap-2 p-0.5">
            {permissions.map((perm) => (
              <div key={perm} className="p-0.5">
                <PermissionBadge
                  permission={perm}
                  size="md"
                  isActive={selectedPermissions.includes(perm)}
                  onClick={() => onPermissionToggle(perm)}
                />
              </div>
            ))}
            {selectedPermissions.length >= 3 && (
              <button
                onClick={onClearPermissions}
                className="text-muted-foreground hover:text-foreground hover:bg-accent px-2.5 py-1 text-xs rounded transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Sort
          </label>
          <div className="flex gap-2">
            {/* Alphabetical Toggle - Always active */}
            <Button
              variant="outline"
              size="sm"
              onClick={onAlphabeticalToggle}
              className={cn(
                "bg-primary/20 border-primary text-foreground hover:bg-primary/30"
              )}
            >
              {alphabeticalOrder === "asc" ? (
                <ArrowDownAZ className="w-4 h-4 mr-1.5" />
              ) : (
                <ArrowUpZA className="w-4 h-4 mr-1.5" />
              )}
              {alphabeticalOrder === "asc" ? "A-Z" : "Z-A"}
            </Button>
            
            {/* Role Sort - 3-state cycle */}
            <Button
              variant="outline"
              size="sm"
              onClick={onRoleSortCycle}
              className={cn(
                roleSort === "off"
                  ? "bg-secondary border-border text-muted-foreground hover:bg-secondary/80"
                  : "bg-primary/20 border-primary text-foreground hover:bg-primary/30"
              )}
            >
              {roleSort === "off" ? (
                <ShieldCheck className="w-4 h-4 mr-1.5" />
              ) : roleSort === "asc" ? (
                <ArrowDown01 className="w-4 h-4 mr-1.5" />
              ) : (
                <ArrowUp10 className="w-4 h-4 mr-1.5" />
              )}
              Role
              {roleSort !== "off" && (
                <span className="ml-1 text-xs opacity-75">
                  {roleSort === "asc" ? "↑" : "↓"}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Row 2: Tag Filter (Left) + Search (Right) */}
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        {availableTags.length > 0 && (
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Tag Filter
            </label>
            <PopoverPicker
              items={availableTags}
              selectedItems={selectedTags}
              onToggle={onTagToggle}
              onClearAll={onClearTags}
              renderBadge={(tag, isActive, onClick) => (
                <TagBadge
                  tag={tag}
                  size="sm"
                  isActive={isActive}
                  onClick={onClick}
                />
              )}
              label="Pick Tags"
              icon={<Tags className="w-4 h-4" />}
              maxVisibleSelected={2}
              clearThreshold={3}
            />
          </div>
        )}
        
        <div className="w-full md:w-[280px] flex-shrink-0">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              maxLength={50}
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {resultCount} command{resultCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default CommandFilters;