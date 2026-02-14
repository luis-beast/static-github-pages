import { memo } from "react";
import { Permission } from "@/components/PermissionBadge";
import { Search, ArrowDownAZ, ArrowUpZA, ArrowDown01, ArrowUp10, ShieldCheck, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PermissionBadge from "@/components/PermissionBadge";
import TagBadge from "@/components/TagBadge";
import FilterPopover from "@/components/FilterPopover";
import { cn } from "@/lib/utils";
import { APP_BUTTON_BASE, APP_BUTTON_DEFAULT, APP_BUTTON_ACTIVE } from "@/lib/buttonStyles";

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

const PERMISSIONS: Permission[] = ["follower", "subscriber", "moderator", "streamer"];

const CommandFilters = memo(function CommandFilters({
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
}: CommandFiltersProps) {
  return (
    <div className="mb-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        
        <div className="relative bg-card/40 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-2xl shadow-primary/5 space-y-4">
          {/* Row 1: Full-width search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search commands..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              maxLength={20}
              className="pl-12 pr-10 h-12 w-full bg-secondary/50 border-0 rounded-xl text-base placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/30 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Row 2: Popover buttons + Sort buttons left, count right */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4 pt-2 border-t border-border/30">
            <div className="flex flex-wrap items-center gap-3">
              {/* Popover buttons */}
              {availableTags.length > 0 && (
                <FilterPopover
                  triggerLabel="Tags"
                  sections={[
                    {
                      label: "Filter by Tag",
                      items: availableTags,
                      selectedItems: selectedTags,
                      onToggle: onTagToggle,
                      onClearAll: onClearTags,
                      renderBadge: (tag, isActive, onClick) => (
                        <TagBadge
                          tag={tag}
                          size="md"
                          isActive={isActive}
                          onClick={onClick}
                        />
                      ),
                      clearThreshold: 3,
                    },
                  ]}
                />
              )}

              <FilterPopover
                triggerLabel="Roles"
                sections={[
                  {
                    label: "Filter by Role",
                    items: PERMISSIONS,
                    selectedItems: selectedPermissions,
                    onToggle: onPermissionToggle,
                    onClearAll: onClearPermissions,
                    renderBadge: (permission, isActive, onClick) => (
                      <PermissionBadge
                        permission={permission as Permission}
                        size="md"
                        isActive={isActive}
                        onClick={onClick}
                      />
                    ),
                    clearThreshold: 3,
                  },
                ]}
              />

              {/* Separator between popovers and sort buttons */}
              <div className="hidden sm:block w-px h-6 bg-border/50" />

              {/* Sort buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onAlphabeticalToggle}
                  className={cn("h-10 px-4", APP_BUTTON_BASE, APP_BUTTON_ACTIVE)}
                >
                  {alphabeticalOrder === "asc" ? (
                    <ArrowDownAZ className="w-4 h-4 mr-2" />
                  ) : (
                    <ArrowUpZA className="w-4 h-4 mr-2" />
                  )}
                  {alphabeticalOrder === "asc" ? "A-Z" : "Z-A"}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRoleSortCycle}
                  className={cn(
                    "h-10 px-4",
                    APP_BUTTON_BASE,
                    roleSort === "off" ? APP_BUTTON_DEFAULT : APP_BUTTON_ACTIVE,
                    roleSort === "off" && "text-muted-foreground"
                  )}
                >
                  {roleSort === "off" ? (
                    <ShieldCheck className="w-4 h-4 mr-2" />
                  ) : roleSort === "asc" ? (
                    <ArrowDown01 className="w-4 h-4 mr-2" />
                  ) : (
                    <ArrowUp10 className="w-4 h-4 mr-2" />
                  )}
                  Role
                  {roleSort !== "off" && (
                    <span className="ml-1 text-xs opacity-60">
                      {roleSort === "asc" ? "↓" : "↑"}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            <div className="text-sm text-muted-foreground whitespace-nowrap">
              {resultCount} command{resultCount !== 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CommandFilters;
