import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { useSettingsStore } from '../../store/settings';
import { analyzeNews } from '../../utils/openai';

export function PromptGenerator() {
  const [generating, setGenerating] = useState(false);
  const { settings, addPrompt } = useSettingsStore();

  const generatePrompt = async () => {
    if (!settings.openai.apiKey) return;

    setGenerating(true);
    try {
      const result = await analyzeNews(
        {
          title: 'Générer un nouveau prompt',
          description: 'Créez un nouveau prompt pour analyser les nouvelles financières',
          guid: 'generator',
          pubDate: new Date().toISOString(),
          creator: 'System',
          category: 'system'
        },
        'Créez un nouveau prompt d\'analyse pour les nouvelles financières. Le prompt doit être détaillé et spécifique, orienté vers l\'analyse technique ou fondamentale. Répondez avec un objet JSON contenant: name (nom du prompt), prompt (le texte du prompt), type (analysis, sentiment, opportunity, ou visualization).'
      );

      if (result) {
        addPrompt({
          id: `generated-${Date.now()}`,
          name: result.name || 'Nouveau Prompt',
          prompt: result.prompt || '',
          type: result.type || 'analysis'
        });
      }
    } catch (error) {
      console.error('Error generating prompt:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Générateur de Prompts</h2>
      
      <button
        onClick={generatePrompt}
        disabled={generating || !settings.openai.apiKey}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        <Wand2 className="w-5 h-5" />
        {generating ? 'Génération...' : 'Générer un nouveau prompt'}
      </button>
      
      {!settings.openai.apiKey && (
        <p className="mt-2 text-sm text-yellow-600">
          Configurez d'abord votre clé API OpenAI pour utiliser le générateur.
        </p>
      )}
    </div>
  );
}