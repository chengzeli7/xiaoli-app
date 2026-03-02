import { useEffect, useState } from 'react';
import { useInspirationStore } from '../stores/inspirationStore';
import { InspirationList } from '../components/inspiration/InspirationList';
import { Modal } from '../components/common/Modal';
import { InspirationForm } from '../components/inspiration/InspirationForm';

export function InspirationPage() {
  const { loadInspirations } = useInspirationStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadInspirations();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">灵感记录</h2>
      </div>

      <InspirationList onAddNew={() => setShowForm(true)} />

      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="添加灵感">
        <InspirationForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}