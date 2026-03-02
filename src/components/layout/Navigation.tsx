import { NavLink } from 'react-router-dom';
import { Home, Lightbulb, CheckSquare, Settings } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/inspiration', icon: Lightbulb, label: '灵感' },
  { to: '/tasks', icon: CheckSquare, label: '任务' },
  { to: '/settings', icon: Settings, label: '设置' },
];

export function Navigation() {
  return (
    <nav className="sticky bottom-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 md:border-t-0 md:static">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-around md:justify-start md:gap-2 md:flex-col py-2 md:py-4">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex flex-col md:flex-row items-center gap-1.5 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-orange-500 bg-orange-50 dark:bg-orange-900/20'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`
              }
            >
              <Icon className="w-5 h-5 md:w-5 md:h-5" />
              <span className="text-xs md:text-sm font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}