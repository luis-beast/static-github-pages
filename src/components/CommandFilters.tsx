import { Permission } from "@/components/PermissionBadge";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PermissionBadge from "@/components/PermissionBadge";
import TagBadge from "@/components/TagBadge";

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

const permissions: Permission[] = ["follower", "subscriber", "moderator", "streamer"];

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
            Role Filter
          </label>
          <div className="flex flex-wrap gap-2">
            {permissions.map((perm) => (
              <PermissionBadge
                key={perm}
                permission={perm}
                size="md"
                isActive={selectedPermissions.includes(perm)}
                onClick={() => onPermissionToggle(perm)}
              />
            ))}
          </div>
        </div>
        
        {availableTags.length > 0 && (
          <div className="flex-1">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Tag Filter
            </label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <TagBadge
                  key={tag}
                  tag={tag}
                  size="md"
                  isActive={selectedTags.includes(tag)}
                  onClick={() => onTagToggle(tag)}
                />
              ))}
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
