import type { Metadata, Viewport } from "next";
import "@fontsource/geist/latin-400.css";
import "@fontsource/geist/latin-500.css";
import "@fontsource/geist/latin-600.css";
import "@fontsource/geist/latin-700.css";
import "@fontsource/geist-mono/latin-400.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import Loader from "@/components/Loader";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: "Luke (嘉乐) — Backend Developer",
  description:
    "I build APIs, work with databases, and enjoy making systems fast and reliable. Backend development with TypeScript, Node.js, C#, PostgreSQL, and Redis.",
  openGraph: {
    title: "Luke — Behind the interface.",
    description: "APIs. Databases. The details that make a system work.",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Luke — Backend Developer" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <Loader />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
