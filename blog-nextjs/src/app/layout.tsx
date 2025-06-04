import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Toaster } from "sonner";
import { MainNav } from "@/components/main-nav";

export const metadata: Metadata = {
  title: "Blog Prototyp",
  description: "Ein moderner Blog-Prototyp mit Next.js und TypeScript",
  keywords: ["blog", "nextjs", "typescript", "react", "SSG", "SSR", "ISR"],
  authors: [{ name: "Aram Filak" }],
  openGraph: {
    title: "Blog Prototyp",
    description: "Ein moderner Blog-Prototyp mit Next.js und TypeScript",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    title: "Blog Prototyp",
    description: "Ein moderner Blog-Prototyp mit Next.js und TypeScript",
  },
  robots: {
    index: true,
    follow: true,
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors position="top-center" closeButton />
            <TooltipProvider>
              <MainNav />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
