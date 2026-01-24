export const siteConfig = {
  streamer: {
    name: "LaymanLouie",
    displayName: "Layman Louie",
    communityName: "The Laypeople",
    tagline: "Check out everything Layman here!",
  },
  meta: {
    title: "LaymanLouie",
    description: "Check out everything Layman here!",
    author: "LaymanLouie",
    twitterHandle: "@LaymanLouie",
    ogImage:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/40a5eb03-da73-4e9c-8252-dc10c94499f6-profile_image-150x150.png",
  },
  socials: {
    twitch: "https://twitch.tv/laymanlouie",
    youtube: "https://youtube.com/@laymanlouie",
    discord: "https://discord.gg/laymanlouie",
    twitter: "https://twitter.com/laymanlouie",
    tiktok: "https://tiktok.com/@laymanlouie",
    kick: "https://kick.com/laymanlouie",
  },
  streamingPlatforms: {
    primary: "twitch",
    platforms: ["twitch", "youtube", "tiktok"],
  },
} as const;

export type SiteConfig = typeof siteConfig;
