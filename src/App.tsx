import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { InspirationPage } from './pages/InspirationPage';
import { TaskPage } from './pages/TaskPage';
import { SettingsPage } from './pages/SettingsPage';
import { useSettingsStore } from './stores/settingsStore';
import { useEffect } from 'react';

function App() {
  const { theme, loadSettings } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/inspiration" element={<InspirationPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;