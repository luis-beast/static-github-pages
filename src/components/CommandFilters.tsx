import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Permission } from "@/components/PermissionBadge";
import { Search, X, ArrowDownAZ, ArrowUpZA, ArrowDown01, ArrowUp10, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PermissionBadge from "@/components/PermissionBadge";
import FilterPopover from "@/components/FilterPopover";
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
    <div className="max-w-4xl mx-auto mb-12">
      <div className="relative group">
        <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
        
        <div className="relative bg-card/40 backdrop-blur-xl rounded-2xl border border-border/50 p-6 shadow-2xl shadow-primary/5 space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 space-y-3">
              <label className="text-sm font-medium text-foreground/80">Filter by Role</label>
              <div className="flex flex-wrap items-center gap-2">
                {PERMISSIONS.map((perm) => (
                  <motion.div
                    key={perm}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PermissionBadge
                      permission={perm}
                      size="md"
                      isActive={selectedPermissions.includes(perm)}
                      onClick={() => onPermissionToggle(perm)}
                    />
                  </motion.div>
                ))}
                <AnimatePresence mode="wait">
                  {selectedPermissions.length >= 3 && (
                    <motion.button
                      key="clear-permissions"
                      onClick={onClearPermissions}
                      className="text-muted-foreground hover:text-foreground hover:bg-destructive/10 px-3 py-1.5 text-xs rounded-lg cursor-pointer inline-flex items-center gap-1.5 transition-colors"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-3 h-3" />
                      Clear
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="w-full lg:w-80 space-y-3">
              <label className="text-sm font-medium text-foreground/80">Search</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search commands..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  maxLength={20}
                  className="pl-12 h-12 bg-secondary/50 border-0 rounded-xl text-base placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/30">
            <div className="flex flex-wrap items-center gap-3">
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
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <button
                            onClick={onClick}
                            className={cn(
                              "px-3 py-1.5 text-sm rounded-lg transition-all duration-200",
                              isActive
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                            )}
                          >
                            {tag}
                          </button>
                        </motion.div>
                      ),
                      clearThreshold: 3,
                    },
                  ]}
                />
              )}

              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onAlphabeticalToggle}
                    className="h-10 px-4 bg-primary/10 border-primary/30 text-foreground hover:bg-primary/20 rounded-xl"
                  >
                    {alphabeticalOrder === "asc" ? (
                      <ArrowDownAZ className="w-4 h-4 mr-2" />
                    ) : (
                      <ArrowUpZA className="w-4 h-4 mr-2" />
                    )}
                    {alphabeticalOrder === "asc" ? "A-Z" : "Z-A"}
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onRoleSortCycle}
                    className={cn(
                      "h-10 px-4 rounded-xl transition-all duration-200",
                      roleSort === "off"
                        ? "bg-secondary/50 border-border/50 text-muted-foreground hover:bg-secondary"
                        : "bg-primary/10 border-primary/30 text-foreground hover:bg-primary/20"
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
                    <motion.span
                      className="ml-1 text-xs opacity-60"
                      initial={false}
                      animate={{ opacity: roleSort !== "off" ? 0.6 : 0, width: roleSort !== "off" ? "auto" : 0 }}
                    >
                      {roleSort === "asc" ? "↓" : roleSort === "desc" ? "↑" : ""}
                    </motion.span>
                  </Button>
                </motion.div>
              </div>
            </div>

            <motion.div
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={resultCount}
            >
              {resultCount} command{resultCount !== 1 ? "s" : ""}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CommandFilters;
