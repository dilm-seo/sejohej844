import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppSettings, PromptTemplate } from '../types/settings';

const defaultPrompts: PromptTemplate[] = [
  {
    id: 'default-analysis',
    name: 'Analyse Standard',
    prompt: 'Analysez cette nouvelle financière et fournissez un résumé détaillé avec les points clés, le sentiment général et les implications potentielles pour le marché.',
    type: 'analysis'
  },
  {
    id: 'default-sentiment',
    name: 'Analyse de Sentiment',
    prompt: 'Évaluez le sentiment de cette nouvelle sur une échelle de -1 à 1, avec une explication détaillée de votre évaluation.',
    type: 'sentiment'
  },
  {
    id: 'default-opportunity',
    name: 'Identification d\'Opportunités',
    prompt: 'Identifiez les opportunités de trading potentielles basées sur cette nouvelle, avec une estimation de la confiance et du timeframe.',
    type: 'opportunity'
  }
];

interface SettingsStore {
  settings: AppSettings;
  updateOpenAISettings: (settings: Partial<AppSettings['openai']>) => void;
  addPrompt: (prompt: PromptTemplate) => void;
  updatePrompt: (id: string, prompt: Partial<PromptTemplate>) => void;
  deletePrompt: (id: string) => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        openai: {
          apiKey: '',
          model: 'gpt-4-turbo-preview',
          temperature: 0.7
        },
        prompts: defaultPrompts
      },
      updateOpenAISettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            openai: { ...state.settings.openai, ...newSettings }
          }
        })),
      addPrompt: (prompt) =>
        set((state) => ({
          settings: {
            ...state.settings,
            prompts: [...state.settings.prompts, prompt]
          }
        })),
      updatePrompt: (id, promptUpdate) =>
        set((state) => ({
          settings: {
            ...state.settings,
            prompts: state.settings.prompts.map((p) =>
              p.id === id ? { ...p, ...promptUpdate } : p
            )
          }
        })),
      deletePrompt: (id) =>
        set((state) => ({
          settings: {
            ...state.settings,
            prompts: state.settings.prompts.filter((p) => p.id !== id)
          }
        }))
    }),
    {
      name: 'forex-news-settings'
    }
  )
);