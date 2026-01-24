import { useEffect } from "react";
import { siteConfig } from "@/config/siteConfig";

export function usePageTitle(pageTitle?: string) {
  useEffect(() => {
    const baseTitle = siteConfig.streamer.name;
    document.title = pageTitle ? `${pageTitle} | ${baseTitle}` : baseTitle;
    return () => {
      document.title = baseTitle;
    };
  }, [pageTitle]);
}

export default usePageTitle;
