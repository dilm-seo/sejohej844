import { useState, useEffect } from 'react';
import { NewsItem } from '../types/news';
import { NewsAnalysis } from '../types/analysis';
import { analyzeNews } from '../utils/openai';
import { useSettingsStore } from '../store/settings';

export function useNewsAnalysis(newsItem: NewsItem | undefined) {
  const [analysis, setAnalysis] = useState<NewsAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const { settings } = useSettingsStore();

  useEffect(() => {
    let mounted = true;

    async function performAnalysis() {
      if (!newsItem || !settings.openai.apiKey) return;

      setLoading(true);
      try {
        const analysisPrompt = settings.prompts.find(p => p.type === 'analysis');
        if (!analysisPrompt) return;

        const result = await analyzeNews(newsItem, analysisPrompt.prompt);
        if (mounted) {
          setAnalysis(result);
        }
      } catch (error) {
        console.error('Error analyzing news:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    performAnalysis();

    return () => {
      mounted = false;
    };
  }, [newsItem, settings.openai.apiKey]);

  return { analysis, loading };
}