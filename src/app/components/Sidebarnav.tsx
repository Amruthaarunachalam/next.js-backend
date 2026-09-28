'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const learningLinks = [
  { href: '/semver', label: 'Semantic Versioning' },
  { href: '/drizzle_orm', label: 'Drizzle ORM' },
  { href: '/Feature_Flag', label: 'Feature Flag' },
  { href: '/ci_cd', label: 'CI/CD Pipelines'},
  { href: '/message_queue', label: 'Message Queue'},
  { href: '/websockets', label: 'Websockets'},
];

export default function SidebarNav() {
  const pathname = usePathname();
  const isLearningActive = learningLinks.some((l) => l.href === pathname);
  const [isOpen, setIsOpen] = useState(isLearningActive);

  // Keep the group expanded if the user navigates directly to a child page
  useEffect(() => {
    if (isLearningActive) setIsOpen(true);
  }, [isLearningActive]);

  const linkClass = (href: string) =>
    `flex items-center space-x-2 px-3 py-2.5 text-sm rounded transition-all ${
      pathname === href
        ? 'bg-mist-400 text-white'
        : 'hover:bg-mist-400 hover:text-white active:bg-stone-500'
    }`;

  return (
    <nav className="space-y-1">
      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
        Management
      </div>

      <Link href="/" className={linkClass('/')}>
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

      {/* My Learnings collapsible group */}
      <div>
        <button
          onClick={() => setIsOpen((o) => !o)}
          className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded transition-all cursor-pointer ${
            isLearningActive
              ? 'bg-mist-400 text-white'
              : 'hover:bg-mist-400 hover:text-white active:bg-stone-500'
          }`}
        >
          <span className="flex items-center space-x-2">
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
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span>My Learnings</span>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`w-4 h-4 transition-transform duration-150 ${
              isOpen ? 'rotate-90' : ''
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="mt-1 ml-4 space-y-1 border-l border-gray-200 dark:border-gray-700 pl-3">
            {learningLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500 shrink-0" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}