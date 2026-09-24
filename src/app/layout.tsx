import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/themeprovider";
import ThemeToggle from "./components/themeToggle";
import Link from "next/link";

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
          {/* Header sits on top, full width, with contents aligned to the far right */}
          <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md px-8 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-end">
            {/* Dark Mode Toggle */}
            <ThemeToggle />
          </header>

          {/* Body Section below Header */}
          <div className="flex flex-1">
            {/* Sidebar positioned below header (top-16 offsets default header height) */}
            <aside className="fixed top-16 bottom-0 left-0 w-64 bg-gray-50 dark:bg-gray-800/50 border-r border-gray-200 dark:border-gray-700 p-4 z-20">
              <nav className="space-y-1">
                <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Management
                </div>
                <Link
                  href="/"
                  className="flex items-center space-x-2 px-3 py-2.5 text-sm rounded hover:bg-mist-400 hover:text-white transition-all active:bg-stone-500"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Dashboard</span>
                </Link>
                 <Link
                  href="/semver"
                  className="flex items-center space-x-2 px-3 py-2.5 text-sm rounded hover:bg-mist-400 hover:text-white transition-all active:bg-stone-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
                    />
                  </svg>
                  <span>Semantic Versioning</span>
                </Link>
                <Link
                  href="/drizzle_orm"
                  className="flex items-center space-x-2 px-3 py-2.5 text-sm rounded  hover:bg-mist-400 hover:text-white transition-all active:bg-stone-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.25V18a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 21 18V8.25m-18 0V6a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 6v2.25m-18 0h18M5.25 6h.008v.008H5.25V6ZM7.5 6h.008v.008H7.5V6Zm2.25 0h.008v.008H9.75V6Z"
                    />
                  </svg>
                  <span>Drizzle ORM</span>
                </Link>
              </nav>
            </aside>

            {/* Main content offset to right of sidebar */}
            <main className="flex-1 pl-72 pr-8 py-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}