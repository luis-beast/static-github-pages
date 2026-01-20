/**
 * Access Control Configuration
 * 
 * This config-only setup prepares for future database-driven access control.
 * When Lovable Cloud is enabled, this will be replaced with database queries.
 * 
 * FUTURE: Twitch OAuth (primary) + Discord OAuth for authentication
 * FUTURE: Auto-detect Twitch subscribers + manual assignment
 */

// ============================================================================
// ROLE DEFINITIONS
// ============================================================================

export type UserRole = 
  | "admin"        // Full access to everything, can see WIP pages
  | "moderator"    // Trusted community members with elevated access
  | "subscriber"   // Twitch/YouTube subscribers, supporters
  | "viewer";      // Regular authenticated users

export type PageVisibility = 
  | "public"       // Everyone can see
  | "hidden"       // Not visible anywhere, returns 404 for non-authorized users
  | "wip"          // Work in progress, only admins can see
  | "authenticated" // Only logged-in users
  | "restricted";  // Only specific roles/groups

// ============================================================================
// GROUP DEFINITIONS (for future database)
// ============================================================================

export interface AccessGroup {
  id: string;
  name: string;
  description: string;
  roles: UserRole[];
  // Future: specific user IDs can be added to groups
}

// Pre-defined groups (will be editable via admin later)
export const ACCESS_GROUPS: AccessGroup[] = [
  {
    id: "supporters",
    name: "Supporters",
    description: "Subscribers and people who support the stream",
    roles: ["subscriber"],
  },
  {
    id: "team",
    name: "Team",
    description: "Moderators and admins",
    roles: ["admin", "moderator"],
  },
  {
    id: "everyone",
    name: "Everyone",
    description: "All authenticated users",
    roles: ["admin", "moderator", "subscriber", "viewer"],
  },
];

// ============================================================================
// PAGE ACCESS CONFIGURATION
// ============================================================================

export interface PageAccessConfig {
  visibility: PageVisibility;
  featured: boolean;           // Show in homepage features section
  showInNav: boolean;          // Show in navigation
  showInFooter: boolean;       // Show in footer links
  allowedRoles?: UserRole[];   // If restricted, which roles can access
  allowedGroups?: string[];    // If restricted, which groups can access
  // Future: allowedUserIds for specific user access
}

// Default access config for pages not explicitly configured
export const DEFAULT_PAGE_ACCESS: PageAccessConfig = {
  visibility: "public",
  featured: false,
  showInNav: true,
  showInFooter: true,
};

// ============================================================================
// PAGE REGISTRY
// ============================================================================

export const PAGE_ACCESS_CONFIG: Record<string, PageAccessConfig> = {
  // Main pages
  home: {
    visibility: "public",
    featured: false,
    showInNav: false, // Home is always accessible via logo
    showInFooter: false,
  },
  content: {
    visibility: "public",
    featured: true,
    showInNav: true,
    showInFooter: true,
  },
  streams: {
    visibility: "public",
    featured: true,
    showInNav: true,
    showInFooter: true,
  },
  music: {
    visibility: "public",
    featured: false,
    showInNav: true,
    showInFooter: true,
  },
  laypeople: {
    visibility: "public",
    featured: false,
    showInNav: true,
    showInFooter: true,
  },
  merch: {
    visibility: "public", // Change to "hidden" or "wip" to hide
    featured: true,
    showInNav: true,
    showInFooter: true,
  },
  quotes: {
    visibility: "public",
    featured: true,
    showInNav: true,
    showInFooter: true,
  },
  commands: {
    visibility: "public",
    featured: true,
    showInNav: true,
    showInFooter: true,
  },
  
  // Legal pages (always public, not featured)
  "privacy-policy": {
    visibility: "public",
    featured: false,
    showInNav: false,
    showInFooter: true,
  },
  "terms-of-use": {
    visibility: "public",
    featured: false,
    showInNav: false,
    showInFooter: true,
  },
  "sales-and-refunds": {
    visibility: "public",
    featured: false,
    showInNav: false,
    showInFooter: true,
  },
};

// ============================================================================
// ACCESS CONTROL HELPERS
// ============================================================================

/**
 * Check if a user has access to a page based on their role
 * FUTURE: This will query the database for user roles and group memberships
 */
export function canAccessPage(
  pageId: string,
  userRole: UserRole | null // null = not authenticated
): boolean {
  const config = PAGE_ACCESS_CONFIG[pageId] || DEFAULT_PAGE_ACCESS;
  
  switch (config.visibility) {
    case "public":
      return true;
    
    case "hidden":
    case "wip":
      // Only admins can see hidden/WIP pages
      return userRole === "admin";
    
    case "authenticated":
      return userRole !== null;
    
    case "restricted":
      if (!userRole) return false;
      // Check if user's role is in allowed roles
      if (config.allowedRoles?.includes(userRole)) return true;
      // Check if user's role is in any allowed group
      if (config.allowedGroups) {
        return config.allowedGroups.some(groupId => {
          const group = ACCESS_GROUPS.find(g => g.id === groupId);
          return group?.roles.includes(userRole);
        });
      }
      return false;
    
    default:
      return true;
  }
}

/**
 * Check if a page should be visible in navigation
 */
export function isPageVisibleInNav(
  pageId: string,
  userRole: UserRole | null
): boolean {
  const config = PAGE_ACCESS_CONFIG[pageId] || DEFAULT_PAGE_ACCESS;
  
  // Must be allowed in nav AND user must have access
  if (!config.showInNav) return false;
  
  // For hidden/WIP pages, only show in nav if user is admin
  if (config.visibility === "hidden" || config.visibility === "wip") {
    return userRole === "admin";
  }
  
  return canAccessPage(pageId, userRole);
}

/**
 * Check if a page should be featured on the homepage
 */
export function isPageFeatured(
  pageId: string,
  userRole: UserRole | null
): boolean {
  const config = PAGE_ACCESS_CONFIG[pageId] || DEFAULT_PAGE_ACCESS;
  
  // Must be featured AND visible to the user
  if (!config.featured) return false;
  
  // Hidden/WIP pages are never featured (even for admins)
  if (config.visibility === "hidden" || config.visibility === "wip") {
    return false;
  }
  
  return canAccessPage(pageId, userRole);
}

/**
 * Get page visibility status for display purposes
 */
export function getPageVisibilityStatus(pageId: string): PageVisibility {
  return PAGE_ACCESS_CONFIG[pageId]?.visibility || "public";
}
