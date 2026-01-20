/**
 * Site Configuration
 * 
 * This is the centralized configuration for the entire site.
 * In the future, this will be replaced with database-driven values
 * to support multi-tenant streamer sites.
 */

export const siteConfig = {
  // Streamer identity
  streamer: {
    name: "LaymanLouie",
    displayName: "Layman Louie",
    communityName: "The Laypeople",
    tagline: "Check out everything Layman here!",
  },

  // Meta information for SEO
  meta: {
    title: "LaymanLouie",
    description: "Check out everything Layman here!",
    author: "LaymanLouie",
    twitterHandle: "@LaymanLouie",
    ogImage: "https://static-cdn.jtvnw.net/jtv_user_pictures/40a5eb03-da73-4e9c-8252-dc10c94499f6-profile_image-150x150.png",
  },

  // Social links (will be editable via admin dashboard later)
  socials: {
    twitch: "https://twitch.tv/laymanlouie",
    youtube: "https://youtube.com/@laymanlouie",
    discord: "https://discord.gg/laymanlouie",
    twitter: "https://twitter.com/laymanlouie",
    tiktok: "https://tiktok.com/@laymanlouie",
    kick: "https://kick.com/laymanlouie",
  },

  // Streaming platforms (for The Streams page)
  streamingPlatforms: {
    primary: "twitch",
    platforms: ["twitch", "youtube", "kick"],
  },
} as const;

export type SiteConfig = typeof siteConfig;
