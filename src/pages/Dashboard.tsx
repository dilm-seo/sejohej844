import React from 'react';
import { NewsFeed } from '../components/NewsFeed';
import { NewsAnalytics } from '../components/NewsAnalytics';
import { useSettingsStore } from '../store/settings';

export function Dashboard() {
  const { settings } = useSettingsStore();
  const hasApiKey = Boolean(settings.openai.apiKey);

  return (
    <div className="container mx-auto py-6 px-4">
      {/* Analytics Section - Full Width at Top */}
      <div className="mb-8">
        {hasApiKey ? (
          <NewsAnalytics />
        ) : (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
            <p className="text-amber-800 text-center">
              Veuillez configurer votre clé API OpenAI dans les paramètres pour voir l'analyse des nouvelles.
            </p>
          </div>
        )}
      </div>

      {/* News Feed Section */}
      <div className="max-w-4xl mx-auto">
        <NewsFeed />
      </div>
    </div>
  );
}