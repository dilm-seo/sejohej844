import OpenAI from 'openai';
import { useSettingsStore } from '../store/settings';
import { NewsItem } from '../types/news';
import { NewsAnalysis } from '../types/analysis';

const defaultAnalysis: NewsAnalysis = {
  sentiment: {
    score: 0,
    label: 'neutral',
    explanation: 'Analyse en attente'
  },
  opportunities: [],
  forexOpportunities: [],
  summary: '',
  keywords: []
};

export async function analyzeNews(
  news: NewsItem,
  promptTemplate: string
): Promise<NewsAnalysis> {
  const settings = useSettingsStore.getState().settings.openai;
  
  if (!settings.apiKey) {
    return defaultAnalysis;
  }

  const openai = new OpenAI({
    apiKey: settings.apiKey,
    dangerouslyAllowBrowser: true
  });

  const systemPrompt = `Vous êtes un expert en analyse financière et trading forex avec une expertise particulière dans l'analyse des nouvelles économiques et leur impact sur le marché des changes.

Pour chaque nouvelle, analysez en profondeur:
1. L'impact direct sur les principales paires de devises
2. Les corrélations potentielles entre les devises
3. Les niveaux techniques importants
4. Le contexte macroéconomique
5. Les implications à court, moyen et long terme

Retournez un objet JSON avec la structure suivante:
{
  "sentiment": {
    "score": number (-1 à 1),
    "label": "positive" | "negative" | "neutral",
    "explanation": string (explication détaillée du sentiment)
  },
  "opportunities": [
    {
      "description": string (description détaillée de l'opportunité),
      "confidence": number (0 à 1),
      "timeframe": string (H1, H4, D1, etc.)
    }
  ],
  "forexOpportunities": [
    {
      "pair": string (e.g., "EUR/USD"),
      "direction": "long" | "short",
      "entryPrice": number (prix d'entrée suggéré),
      "stopLoss": number (niveau de stop loss),
      "takeProfit": number (objectif de profit),
      "timeframe": string (H1, H4, D1, etc.),
      "confidence": number (0 à 1),
      "rationale": string (analyse détaillée incluant contexte macro et technique)
    }
  ],
  "summary": string (résumé global de l'analyse),
  "keywords": string[] (mots-clés pertinents)
}

Concentrez-vous sur les paires majeures: EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, USD/CAD, NZD/USD.
Fournissez des niveaux de prix précis basés sur les données techniques et fondamentales actuelles.`;

  const prompt = `${promptTemplate}\n\nTitre: ${news.title}\nDescription: ${news.description}`;

  try {
    const response = await openai.chat.completions.create({
      model: settings.model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: settings.temperature,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in response');
    }

    const analysis = JSON.parse(content);
    return {
      ...defaultAnalysis,
      ...analysis
    };
  } catch (error) {
    console.error('Error analyzing news:', error);
    return defaultAnalysis;
  }
}