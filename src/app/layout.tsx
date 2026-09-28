import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/themeprovider";
import ThemeToggle from "./components/themeToggle";
import SidebarNav from "./components/Sidebarnav";
import Breadcrumb from "./components/breadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Task Dashboard",
  description: "Next.js Task Dashboard App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors flex flex-col">
        <Providers>
          {/* Header: breadcrumb on the left, theme toggle on the right */}
          <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-8 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <Breadcrumb />
            <ThemeToggle />
          </header>

          {/* Body Section below Header */}
          <div className="flex flex-1">
            {/* Sidebar positioned below header (top-16 offsets default header height) */}
            <aside className="fixed top-16 bottom-0 left-0 w-64 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 p-4 z-20">
              <SidebarNav />
            </aside>

            {/* Main content offset to right of sidebar */}
            <main className="flex-1 pl-72 pr-8 py-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}