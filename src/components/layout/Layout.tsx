import type { ReactNode } from 'react';
import { Header } from './Header';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        <aside className="hidden md:block w-48 flex-shrink-0">
          <Navigation />
        </aside>
        <main className="flex-1 min-w-0 pb-20 md:pb-0">{children}</main>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <Navigation />
      </div>
    </div>
  );
}