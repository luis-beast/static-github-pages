import { useState, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import CommandCard from "@/components/CommandCard";
import CommandFilters, { AlphabeticalOrder, RoleSort } from "@/components/CommandFilters";
import { Permission } from "@/components/PermissionBadge";
import { commands } from "@/data/commands";
import { normalizeForSearch } from "@/lib/searchUtils";

const PERMISSION_PRIORITY: Record<Permission, number> = {
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

  const availableTags = useMemo(() => {
    const groups = new Set<string>();
    commands.forEach((cmd) => {
      cmd.commandGroups?.forEach((group) => groups.add(group));
    });
    return Array.from(groups).sort();
  }, []);

  const toggleAlphabeticalOrder = () => {
    setAlphabeticalOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const cycleRoleSort = () => {
    setRoleSort((prev) => {
      if (prev === "off") return "asc";
      if (prev === "asc") return "desc";
      return "off";
    });
  };

  const togglePermission = (permission: Permission) => {
    setSelectedPermissions((prev) =>
      prev.includes(permission) ? prev.filter((p) => p !== permission) : [...prev, permission],
    );
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const clearTags = () => setSelectedTags([]);
  const clearPermissions = () => setSelectedPermissions([]);

  const filteredCommands = useMemo(() => {
    let result =
      selectedPermissions.length === 0
        ? [...commands]
        : commands.filter((cmd) => selectedPermissions.includes(cmd.permission));

    if (selectedTags.length > 0) {
      result = result.filter((cmd) => cmd.commandGroups?.some((group) => selectedTags.includes(group)));
    }

    if (searchQuery.trim()) {
      const query = normalizeForSearch(searchQuery);
      result = result.filter(
        (cmd) =>
          normalizeForSearch(cmd.name).includes(query) ||
          cmd.aliases?.some((alias) => normalizeForSearch(alias).includes(query)) ||
          normalizeForSearch(cmd.description).includes(query) ||
          cmd.commandGroups?.some((group) => normalizeForSearch(group).includes(query)),
      );
    }

    result.sort((a, b) => {
      if (roleSort !== "off") {
        const roleDiff =
          roleSort === "asc"
            ? PERMISSION_PRIORITY[a.permission] - PERMISSION_PRIORITY[b.permission]
            : PERMISSION_PRIORITY[b.permission] - PERMISSION_PRIORITY[a.permission];
        if (roleDiff !== 0) return roleDiff;
      }
      return alphabeticalOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    });

    return result;
  }, [alphabeticalOrder, roleSort, selectedPermissions, searchQuery, selectedTags]);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <motion.header
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">Layman's Commands</h1>
          <p className="text-muted-foreground">All commands and how to use them</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CommandFilters
            alphabeticalOrder={alphabeticalOrder}
            onAlphabeticalToggle={toggleAlphabeticalOrder}
            roleSort={roleSort}
            onRoleSortCycle={cycleRoleSort}
            selectedPermissions={selectedPermissions}
            onPermissionToggle={togglePermission}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            availableTags={availableTags}
            selectedTags={selectedTags}
            onTagToggle={toggleTag}
            onClearTags={clearTags}
            onClearPermissions={clearPermissions}
            resultCount={filteredCommands.length}
          />
        </motion.div>

        <LayoutGroup>
          <motion.div className="space-y-4" layout transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }}>
            <AnimatePresence mode="popLayout">
              {filteredCommands.length > 0 ? (
                filteredCommands.map((command, index) => (
                  <motion.div
                    key={command.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      layout: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
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
                  <p className="text-muted-foreground">No commands match your current filters.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </main>
    </div>
  );
};

export default Commands;
