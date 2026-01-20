import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

/**
 * Custom hook for dynamic page titles
 * 
 * @param pageTitle - The name of the current page (optional)
 * 
 * Usage:
 * - usePageTitle() → "LaymanLouie" (for homepage)
 * - usePageTitle("Commands") → "Commands | LaymanLouie"
 */
export function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    const baseTitle = siteConfig.streamer.name;
    
    if (pageTitle) {
      document.title = `${pageTitle} | ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }

    // Cleanup: Reset to base title when component unmounts
    return () => {
      document.title = baseTitle;
    };
  }, [pageTitle]);
}

export default usePageTitle;
