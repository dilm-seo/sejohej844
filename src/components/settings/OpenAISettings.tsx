import React from 'react';
import { useSettingsStore } from '../../store/settings';

export function OpenAISettings() {
  const { settings, updateOpenAISettings } = useSettingsStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Configuration OpenAI</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
            Clé API OpenAI
          </label>
          <input
            type="password"
            id="apiKey"
            value={settings.openai.apiKey}
            onChange={(e) => updateOpenAISettings({ apiKey: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">
            Modèle
          </label>
          <select
            id="model"
            value={settings.openai.model}
            onChange={(e) => updateOpenAISettings({ model: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="gpt-4-turbo-preview">GPT-4 Turbo</option>
            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          </select>
        </div>

        <div>
          <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
            Température ({settings.openai.temperature})
          </label>
          <input
            type="range"
            id="temperature"
            min="0"
            max="1"
            step="0.1"
            value={settings.openai.temperature}
            onChange={(e) => updateOpenAISettings({ temperature: parseFloat(e.target.value) })}
            className="mt-1 block w-full"
          />
        </div>
      </div>
    </div>
  );
}