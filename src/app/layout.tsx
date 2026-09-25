import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BRANDS, SITE } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Our Little Company / A little company. A lot of fun.",
    template: "%s / Our Little Company",
  },
  description: SITE.metaDescription,
  applicationName: SITE.brandFull,
  authors: [{ name: SITE.operator }],
  creator: SITE.operator,
  keywords: [
    "Our Little Company",
    "Our Little Company LLC",
    "Our Little Book",
    "Chorzle",
    "Carroll Consulting",
    "holding company",
    "family of brands",
  ],
  openGraph: {
    title: SITE.brandFull,
    description: SITE.metaDescription,
    url: siteUrl,
    siteName: SITE.brandFull,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.brandFull,
    description: SITE.metaDescription,
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteUrl}/#org`,
                  name: SITE.brandFull,
                  url: siteUrl,
                  description: SITE.metaDescription,
                  founder: { "@id": `${siteUrl}/#person` },
                  subOrganization: BRANDS.map((b) => ({
                    "@type": "Organization",
                    name: b.name,
                    ...(b.url ? { url: b.url } : {}),
                    parentOrganization: { "@id": `${siteUrl}/#org` },
                  })),
                },
                {
                  "@type": "Person",
                  "@id": `${siteUrl}/#person`,
                  name: SITE.operator,
                  url: siteUrl,
                  sameAs: [SITE.linkedin, "https://carrollconsultingservices.com"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteUrl}/#website`,
                  name: SITE.brandFull,
                  url: siteUrl,
                  publisher: { "@id": `${siteUrl}/#org` },
                },
              ],
            }),
          }}
        />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Nav />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
