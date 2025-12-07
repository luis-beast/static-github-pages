import { Permission } from "@/components/PermissionBadge";
import { Checkbox } from "@/components/ui/checkbox";
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
}: CommandFiltersProps) => {
  return (
    <div className="glass-card rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <div className="flex-1">
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
        
        <div className="flex-1">
          <label className="text-sm font-medium text-foreground mb-2 block">
            Filter by permission
          </label>
          <div className="flex flex-wrap gap-4">
            {permissions.map((perm) => (
              <div key={perm.value} className="flex items-center space-x-2">
                <Checkbox
                  id={perm.value}
                  checked={selectedPermissions.includes(perm.value)}
                  onCheckedChange={() => onPermissionToggle(perm.value)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor={perm.value}
                  className="text-sm text-secondary-foreground cursor-pointer"
                >
                  {perm.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandFilters;
