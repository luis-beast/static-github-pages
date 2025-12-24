import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Navigation from "@/components/Navigation";
import CommandCard from "@/components/CommandCard";
import CommandFilters, { AlphabeticalOrder, RoleSort } from "@/components/CommandFilters";
import { Permission } from "@/components/PermissionBadge";
import { commands } from "@/data/commands";
import { normalizeForSearch } from "@/lib/tagColors";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const permissionOrder: Record<Permission, number> = {
  follower: 1,
  subscriber: 2,
  moderator: 3,
  streamer: 4,
};

const Commands = () => {
  const [alphabeticalOrder, setAlphabeticalOrder] = useState<AlphabeticalOrder>("asc");
  const [roleSort, setRoleSort] = useState<RoleSort>("off");
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

  const handleAlphabeticalToggle = () => {
    setAlphabeticalOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const handleRoleSortCycle = () => {
    setRoleSort(prev => {
      if (prev === "off") return "asc";
      if (prev === "asc") return "desc";
      return "off";
    });
  };

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

    // Sort: Role is primary when active, alphabetical is always secondary
    result.sort((a, b) => {
      if (roleSort !== "off") {
        const roleCompare = roleSort === "asc"
          ? permissionOrder[a.permission] - permissionOrder[b.permission]
          : permissionOrder[b.permission] - permissionOrder[a.permission];
        if (roleCompare !== 0) return roleCompare;
      }
      // Alphabetical sort (primary if role off, secondary if role active)
      return alphabeticalOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });

    return result;
  }, [alphabeticalOrder, roleSort, selectedPermissions, searchQuery, selectedTags]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <motion.header 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">
            Stream Commands
          </h1>
          <p className="text-muted-foreground">
            All available chat commands and how to use them
          </p>
        </motion.header>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CommandFilters
            alphabeticalOrder={alphabeticalOrder}
            onAlphabeticalToggle={handleAlphabeticalToggle}
            roleSort={roleSort}
            onRoleSortCycle={handleRoleSortCycle}
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
        </motion.div>
        
        <LayoutGroup>
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedCommands.length > 0 ? (
                filteredAndSortedCommands.map((command, index) => (
                  <motion.div
                    key={command.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ 
                      layout: { duration: 0.3, ease: "easeOut" },
                      opacity: { duration: 0.2 },
                      y: { duration: 0.2 },
                    }}
                  >
                    <CommandCard command={command} orderNumber={index + 1} />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-lg p-8 text-center"
                >
                  <p className="text-muted-foreground">
                    No commands match your current filters.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </LayoutGroup>
      </main>
      
      <ScrollToTopButton />
    </div>
  );
};

export default Commands;
