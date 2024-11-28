import React from 'react';
import { Pencil, Trash2, Save } from 'lucide-react';
import { useSettingsStore } from '../../store/settings';
import { PromptTemplate } from '../../types/settings';

export function PromptSettings() {
  const { settings, updatePrompt, deletePrompt } = useSettingsStore();
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editedPrompt, setEditedPrompt] = React.useState<string>('');

  const handleEdit = (prompt: PromptTemplate) => {
    setEditingId(prompt.id);
    setEditedPrompt(prompt.prompt);
  };

  const handleSave = (id: string) => {
    updatePrompt(id, { prompt: editedPrompt });
    setEditingId(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Prompts Personnalisés</h2>
      
      <div className="space-y-4">
        {settings.prompts.map((prompt) => (
          <div key={prompt.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{prompt.name}</h3>
              <div className="flex gap-2">
                {editingId === prompt.id ? (
                  <button
                    onClick={() => handleSave(prompt.id)}
                    className="p-1 text-green-600 hover:text-green-700"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(prompt)}
                    className="p-1 text-blue-600 hover:text-blue-700"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => deletePrompt(prompt.id)}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {editingId === prompt.id ? (
              <textarea
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="w-full h-32 p-2 border rounded"
              />
            ) : (
              <p className="text-gray-600 text-sm">{prompt.prompt}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}