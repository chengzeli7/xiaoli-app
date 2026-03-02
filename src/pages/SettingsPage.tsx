import { useEffect, useState, useRef } from 'react';
import { useSettingsStore } from '../stores/settingsStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Moon, Sun, Download, Upload, Trash2, Check, AlertCircle } from 'lucide-react';

export function SettingsPage() {
  const { theme, loadSettings, toggleTheme, exportData, importData, clearData } = useSettingsStore();
  const [exportStatus, setExportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [clearConfirm, setClearConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  const handleExport = async () => {
    try {
      const data = await exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `xiaoli-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      setExportStatus('success');
      setTimeout(() => setExportStatus('idle'), 2000);
    } catch {
      setExportStatus('error');
      setTimeout(() => setExportStatus('idle'), 2000);
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      await importData(text);
      setImportStatus('success');
      setTimeout(() => setImportStatus('idle'), 2000);
    } catch {
      setImportStatus('error');
      setTimeout(() => setImportStatus('idle'), 2000);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClear = async () => {
    if (!clearConfirm) {
      setClearConfirm(true);
      return;
    }

    try {
      await clearData();
      setClearConfirm(false);
      window.location.reload();
    } catch {
      console.error('Clear failed');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">设置</h2>

      <Card>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">外观</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {theme === 'light' ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-500" />
            )}
            <span className="text-gray-700 dark:text-gray-300">
              {theme === 'light' ? '浅色模式' : '深色模式'}
            </span>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative w-14 h-7 rounded-full transition-colors ${
              theme === 'light' ? 'bg-gray-200' : 'bg-gray-700'
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                theme === 'light' ? 'left-1' : 'left-8'
              }`}
            />
          </button>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">数据管理</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium text-gray-800 dark:text-white">导出数据</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">将所有数据保存为 JSON 文件</p>
            </div>
            <Button variant="secondary" onClick={handleExport}>
              {exportStatus === 'success' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : exportStatus === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-500" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium text-gray-800 dark:text-white">导入数据</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">从 JSON 文件恢复数据</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <Button variant="secondary" onClick={() => fileInputRef.current?.click()}>
              {importStatus === 'success' ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : importStatus === 'error' ? (
                <AlertCircle className="w-4 h-4 text-red-500" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
              <p className="font-medium text-gray-800 dark:text-white">清除所有数据</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">删除所有灵感、任务和标签</p>
            </div>
            <Button variant={clearConfirm ? 'danger' : 'secondary'} onClick={handleClear}>
              <Trash2 className="w-4 h-4" />
              {clearConfirm ? '确认删除' : '清除'}
            </Button>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">关于</h3>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <p>应用名称：小梨Ai助手</p>
          <p>版本：1.0.0</p>
          <p>数据存储：本地浏览器 (IndexedDB)</p>
        </div>
      </Card>
    </div>
  );
}