export const siteConfig = {
  name: "Banyweire John",
  title: "Its the best portfolio one should own ",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://john-banyweire.vercel.app",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "Discover Banyweire John's portfolio—showcasing expertise in web development, innovative projects, and creative solutions.",
  links: {
    twitter: "https://x.com/JohnJ53991?t=Zif90Q51W_1QNy_eq5mKEQ&s=09",
    github: "https://github.com/johnelipse",
    LinkedIn:
      "https://www.linkedin.com/in/banyweire-john-a57692326?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
};

export type SiteConfig = typeof siteConfig;
