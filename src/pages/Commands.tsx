import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import CommandCard from "@/components/CommandCard";
import CommandFilters, { SortOption } from "@/components/CommandFilters";
import { Permission } from "@/components/PermissionBadge";
import { commands } from "@/data/commands";

const permissionOrder: Record<Permission, number> = {
  follower: 1,
  subscriber: 2,
  moderator: 3,
  streamer: 4,
};

const Commands = () => {
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([
    "follower",
    "subscriber",
    "moderator",
    "streamer",
  ]);

  const handlePermissionToggle = (permission: Permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const filteredAndSortedCommands = useMemo(() => {
    let result = commands.filter((cmd) =>
      selectedPermissions.includes(cmd.permission)
    );

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
  }, [sortBy, selectedPermissions]);

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
        
        <CommandFilters
          sortBy={sortBy}
          onSortChange={setSortBy}
          selectedPermissions={selectedPermissions}
          onPermissionToggle={handlePermissionToggle}
        />
        
        <div className="space-y-4">
          {filteredAndSortedCommands.length > 0 ? (
            filteredAndSortedCommands.map((command) => (
              <CommandCard key={command.id} command={command} />
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
    </div>
  );
};

export default Commands;
