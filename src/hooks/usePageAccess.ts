import { useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  canAccessPage,
  isPageVisibleInNav,
  isPageFeatured,
  getPageVisibilityStatus,
  PAGE_ACCESS_CONFIG,
  DEFAULT_PAGE_ACCESS,
  type PageVisibility,
} from "@/config/accessConfig";

interface PageAccessResult {
  canAccess: boolean;
  isVisibleInNav: boolean;
  isFeatured: boolean;
  visibility: PageVisibility;
  shouldRedirectToNotFound: boolean;
}

export function usePageAccess(pageId: string): PageAccessResult {
  const { userRole } = useAuth();

  return useMemo(() => {
    const canAccess = canAccessPage(pageId, userRole);
    const visibility = getPageVisibilityStatus(pageId);

    return {
      canAccess,
      isVisibleInNav: isPageVisibleInNav(pageId, userRole),
      isFeatured: isPageFeatured(pageId, userRole),
      visibility,
      shouldRedirectToNotFound: !canAccess && (visibility === "hidden" || visibility === "wip"),
    };
  }, [pageId, userRole]);
}

export function useVisibleNavPages(): string[] {
  const { userRole } = useAuth();

  return useMemo(() => {
    return Object.keys(PAGE_ACCESS_CONFIG).filter(pageId => 
      isPageVisibleInNav(pageId, userRole)
    );
  }, [userRole]);
}

export function useFeaturedPages(): string[] {
  const { userRole } = useAuth();

  return useMemo(() => {
    return Object.keys(PAGE_ACCESS_CONFIG).filter(pageId => 
      isPageFeatured(pageId, userRole)
    );
  }, [userRole]);
}

export function usePageConfig(pageId: string) {
  return PAGE_ACCESS_CONFIG[pageId] || DEFAULT_PAGE_ACCESS;
}
