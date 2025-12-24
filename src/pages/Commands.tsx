import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import CommandCard from "@/components/CommandCard";
import CommandFilters, { SortOption } from "@/components/CommandFilters";
import { Permission } from "@/components/PermissionBadge";
import { commands } from "@/data/commands";
import { normalizeForSearch } from "@/lib/tagColors";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import TagFilterDemo from "@/components/TagFilterDemo";

const permissionOrder: Record<Permission, number> = {
  follower: 1,
  subscriber: 2,
  moderator: 3,
  streamer: 4,
};

const allPermissions: Permission[] = ["follower", "subscriber", "moderator", "streamer"];

const Commands = () => {
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique command groups from commands
  const availableTags = useMemo(() => {
    const groups = new Set<string>();
    commands.forEach(cmd => {
      cmd.commandGroups?.forEach(group => groups.add(group));
    });
    return Array.from(groups).sort();
  }, []);

  const handlePermissionToggle = (permission: Permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleClearTags = () => {
    setSelectedTags([]);
  };

  const handleClearPermissions = () => {
    setSelectedPermissions([]);
  };

  const filteredAndSortedCommands = useMemo(() => {
    // If no permissions selected, show all commands; otherwise filter by selected
    let result = selectedPermissions.length === 0
      ? [...commands]
      : commands.filter((cmd) => selectedPermissions.includes(cmd.permission));

    // Filter by command groups (if any selected)
    if (selectedTags.length > 0) {
      result = result.filter((cmd) =>
        cmd.commandGroups?.some(group => selectedTags.includes(group))
      );
    }

    // Filter by search query (accent-insensitive)
    if (searchQuery.trim()) {
      const normalizedQuery = normalizeForSearch(searchQuery);
      result = result.filter((cmd) =>
        normalizeForSearch(cmd.name).includes(normalizedQuery) ||
        (cmd.aliases?.some(alias => normalizeForSearch(alias).includes(normalizedQuery)) ?? false) ||
        normalizeForSearch(cmd.description).includes(normalizedQuery) ||
        (cmd.commandGroups?.some(group => normalizeForSearch(group).includes(normalizedQuery)) ?? false)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "perm-asc":
          return permissionOrder[a.permission] - permissionOrder[b.permission];
        case "perm-desc":
          return permissionOrder[b.permission] - permissionOrder[a.permission];
        default:
          return 0;
      }
    });

    return result;
  }, [sortBy, selectedPermissions, searchQuery, selectedTags]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Stream Commands
          </h1>
          <p className="text-muted-foreground">
            All available chat commands and how to use them
          </p>
        </header>
        
        <TagFilterDemo availableTags={availableTags} />
        
        <CommandFilters
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedPermissions={selectedPermissions}
          onPermissionToggle={handlePermissionToggle}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          availableTags={availableTags}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearTags={handleClearTags}
          onClearPermissions={handleClearPermissions}
          resultCount={filteredAndSortedCommands.length}
        />
        
        <div className="space-y-4">
          {filteredAndSortedCommands.length > 0 ? (
            filteredAndSortedCommands.map((command, index) => (
              <CommandCard key={command.id} command={command} orderNumber={index + 1} />
            ))
          ) : (
            <div className="glass-card rounded-lg p-8 text-center">
              <p className="text-muted-foreground">
                No commands match your current filters.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <ScrollToTopButton />
    </div>
  );
};

export default Commands;
