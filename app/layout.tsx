import type { Metadata } from "next";
import "./globals.css";
import ProvidersComp from "@/components/providers";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/next";
import ReactQueryProvider from "@/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.title}`,
  },
  other: {
    "google-site-verification": "Sr5RR1ysT1vii9jDI2fm5p3Rbq-UeQPPYQK_p-7U3bU",
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    "Banyweire John portfolio",
    "web developer portfolio",
    "creative web solutions",
    "full-stack developer",
    "frontend and backend development",
    "JavaScript expert",
    "Next.js projects",
    "responsive web design",
    "innovative web development",
    "professional portfolio",
    "modern web technologies",
  ],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@shadcn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="scroll-behavior scrollbar-custom" lang="en">
      <body className="body-font scroll-behavior">
        <ReactQueryProvider>
          <ProvidersComp>
            {children}
            <Analytics />
          </ProvidersComp>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
