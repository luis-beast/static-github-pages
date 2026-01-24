export type UserRole = "admin" | "moderator" | "subscriber" | "viewer";

export type PageVisibility = "public" | "hidden" | "wip" | "authenticated" | "restricted";

export interface AccessGroup {
  id: string;
  name: string;
  description: string;
  roles: UserRole[];
}

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

export interface PageAccessConfig {
  visibility: PageVisibility;
  featured: boolean;
  showInNav: boolean;
  showInFooter: boolean;
  allowedRoles?: UserRole[];
  allowedGroups?: string[];
}

export const DEFAULT_PAGE_ACCESS: PageAccessConfig = {
  visibility: "public",
  featured: false,
  showInNav: true,
  showInFooter: true,
};

export const PAGE_ACCESS_CONFIG: Record<string, PageAccessConfig> = {
  home: {
    visibility: "public",
    featured: false,
    showInNav: false,
    showInFooter: false,
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
};

export function canAccessPage(
  pageId: string,
  userRole: UserRole | null
): boolean {
  const config = PAGE_ACCESS_CONFIG[pageId] || DEFAULT_PAGE_ACCESS;
  
  switch (config.visibility) {
    case "public":
      return true;
    
    case "hidden":
    case "wip":
      return userRole === "admin";
    
    case "authenticated":
      return userRole !== null;
    
    case "restricted":
      if (!userRole) return false;
      if (config.allowedRoles?.includes(userRole)) return true;
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

export function isPageVisibleInNav(
  pageId: string,
  userRole: UserRole | null
): boolean {
  const config = PAGE_ACCESS_CONFIG[pageId] || DEFAULT_PAGE_ACCESS;
  
  if (!config.showInNav) return false;
  
  if (config.visibility === "hidden" || config.visibility === "wip") {
    return userRole === "admin";
  }
  
  return canAccessPage(pageId, userRole);
}

export function isPageFeatured(
  pageId: string,
  userRole: UserRole | null
): boolean {
  const config = PAGE_ACCESS_CONFIG[pageId] || DEFAULT_PAGE_ACCESS;
  
  if (!config.featured) return false;
  
  if (config.visibility === "hidden" || config.visibility === "wip") {
    return false;
  }
  
  return canAccessPage(pageId, userRole);
}

export function getPageVisibilityStatus(pageId: string): PageVisibility {
  return PAGE_ACCESS_CONFIG[pageId]?.visibility || "public";
}
