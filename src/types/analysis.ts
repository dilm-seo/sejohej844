export interface ForexOpportunity {
  pair: string;
  direction: 'long' | 'short';
  entryPrice?: number;
  stopLoss?: number;
  takeProfit?: number;
  timeframe: string;
  confidence: number;
  rationale: string;
}

export interface NewsAnalysis {
  sentiment: {
    score: number;
    label: 'positive' | 'negative' | 'neutral';
    explanation: string;
  };
  opportunities: {
    description: string;
    confidence: number;
    timeframe: string;
  }[];
  forexOpportunities: ForexOpportunity[];
  summary: string;
  keywords: string[];
}