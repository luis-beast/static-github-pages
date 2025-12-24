import { Permission } from "@/components/PermissionBadge";
import { Search } from "lucide-react";
import { getTagColor, toProperCase } from "@/lib/tagColors";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "name-asc" | "name-desc" | "perm-asc" | "perm-desc";

interface CommandFiltersProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  selectedPermissions: Permission[];
  onPermissionToggle: (permission: Permission) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  resultCount: number;
}

const permissions: { value: Permission; label: string }[] = [
  { value: "follower", label: "Follower" },
  { value: "subscriber", label: "Subscriber" },
  { value: "moderator", label: "Moderator" },
  { value: "streamer", label: "Streamer" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "perm-asc", label: "Permission (Low → High)" },
  { value: "perm-desc", label: "Permission (High → Low)" },
];

const CommandFilters = ({
  sortBy,
  onSortChange,
  selectedPermissions,
  onPermissionToggle,
  searchQuery,
  onSearchChange,
  availableTags,
  selectedTags,
  onTagToggle,
  resultCount,
}: CommandFiltersProps) => {
  return (
    <div className="glass-card rounded-lg p-4 mb-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
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
              className="pl-10 bg-secondary border-border"
            />
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Sort by
          </label>
          <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
            <SelectTrigger className="w-full md:w-[220px] bg-secondary border-border">
              <SelectValue placeholder="Select sort option" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Filter by permission
          </label>
          <div className="flex flex-wrap gap-2">
            {permissions.map((perm) => {
              const isActive = selectedPermissions.includes(perm.value);
              const colorClasses: Record<Permission, string> = {
                follower: "bg-perm-follower/20 text-perm-follower border-perm-follower/30",
                subscriber: "bg-perm-subscriber/20 text-perm-subscriber border-perm-subscriber/30",
                moderator: "bg-perm-moderator/20 text-perm-moderator border-perm-moderator/30",
                streamer: "bg-perm-streamer/20 text-perm-streamer border-perm-streamer/30",
              };
              
              return (
                <button
                  key={perm.value}
                  onClick={() => onPermissionToggle(perm.value)}
                  className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium border transition-all cursor-pointer ${
                    isActive 
                      ? colorClasses[perm.value]
                      : "bg-secondary/50 text-muted-foreground border-border/50 opacity-50 hover:opacity-75"
                  }`}
                >
                  {perm.label}
                </button>
              );
            })}
          </div>
        </div>
        
        {availableTags.length > 0 && (
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Filter by tag
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => {
                const isActive = selectedTags.includes(tag);
                const tagColor = getTagColor(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => onTagToggle(tag)}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer"
                    style={isActive ? { 
                      backgroundColor: `${tagColor}18`,
                      color: tagColor,
                      borderColor: tagColor
                    } : {
                      backgroundColor: "hsla(270, 30%, 20%, 0.5)",
                      color: "hsl(270, 15%, 60%)",
                      borderColor: "hsl(270, 15%, 60%)",
                      opacity: 0.5
                    }}
                  >
                    {toProperCase(tag)}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {resultCount} command{resultCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default CommandFilters;
