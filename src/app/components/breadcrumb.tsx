'use client';

import { usePathname } from 'next/navigation';

// Map each learning route to its display label.
// Add new entries here whenever a new learning page is created.
const learningPages: Record<string, string> = {
  '/semver': 'Semantic Versioning',
  '/drizzle_orm': 'Drizzle ORM',
  '/Feature_Flag': 'Feature Flag',
  '/ci_cd' : 'CI/CD Pipeline',
  '/message_queue':'Message Queue',
  '/websockets': 'Websockets',
};

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === '/') {
    return (
      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        Dashboard
      </span>
    );
  }

  const pageLabel = learningPages[pathname];

  // Unknown route: render nothing rather than a broken breadcrumb
  if (!pageLabel) return null;

  return (
    <nav className="flex items-center space-x-1.5 text-sm" aria-label="Breadcrumb">
      <span className="text-gray-500 dark:text-gray-400">My Learnings</span>
      <span className="text-gray-400 dark:text-gray-600">›</span>
      <span className="font-medium text-gray-800 dark:text-gray-100">{pageLabel}</span>
    </nav>
  );
}