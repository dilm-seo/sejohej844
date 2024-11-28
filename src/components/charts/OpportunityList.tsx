import React from 'react';
import { Clock, TrendingUp, Percent } from 'lucide-react';
import { NewsAnalysis } from '../../types/analysis';

interface OpportunityListProps {
  opportunities: NewsAnalysis['opportunities'];
}

export function OpportunityList({ opportunities }: OpportunityListProps) {
  return (
    <div className="space-y-4">
      {opportunities.map((opportunity, index) => (
        <div key={index} className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-gray-900 font-medium">{opportunity.description}</p>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{opportunity.timeframe}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Percent className="w-4 h-4" />
                  <span>{(opportunity.confidence * 100).toFixed(0)}% de confiance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}