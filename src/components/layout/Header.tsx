import { Moon, Sun } from 'lucide-react';
import { useSettingsStore } from '../../stores/settingsStore';

export function Header() {
  const { theme, toggleTheme } = useSettingsStore();

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl">
            🍐
          </div>
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            小梨Ai助手
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="切换主题"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </button>
      </div>
    </header>
  );
}