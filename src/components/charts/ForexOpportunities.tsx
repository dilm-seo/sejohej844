import React from 'react';
import { TrendingUp, TrendingDown, Clock, Percent, Target, DollarSign, ArrowUpDown } from 'lucide-react';
import { ForexOpportunity } from '../../types/analysis';
import { motion } from 'framer-motion';

interface ForexOpportunitiesProps {
  opportunities: ForexOpportunity[];
}

export function ForexOpportunities({ opportunities }: ForexOpportunitiesProps) {
  return (
    <div className="space-y-4">
      {opportunities.map((opportunity, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100"
        >
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-lg ${
              opportunity.direction === 'long' 
                ? 'bg-green-100 border border-green-200' 
                : 'bg-red-100 border border-red-200'
            }`}>
              {opportunity.direction === 'long' 
                ? <TrendingUp className="w-6 h-6 text-green-600" />
                : <TrendingDown className="w-6 h-6 text-red-600" />
              }
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    {opportunity.pair}
                  </h3>
                  <span className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                    opportunity.direction === 'long'
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {opportunity.direction.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {opportunity.timeframe}
                  </span>
                </div>
              </div>
              
              <div className="bg-white bg-opacity-50 rounded-lg p-3 mb-3">
                <p className="text-gray-700 leading-relaxed">{opportunity.rationale}</p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 bg-blue-50 rounded-lg p-3">
                {opportunity.entryPrice && (
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <ArrowUpDown className="w-4 h-4" />
                      <span>Entry</span>
                    </div>
                    <span className="font-bold text-blue-700">{opportunity.entryPrice}</span>
                  </div>
                )}
                {opportunity.stopLoss && (
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span>Stop Loss</span>
                    </div>
                    <span className="font-bold text-red-600">{opportunity.stopLoss}</span>
                  </div>
                )}
                {opportunity.takeProfit && (
                  <div className="text-sm">
                    <div className="flex items-center gap-1 text-gray-600 mb-1">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span>Take Profit</span>
                    </div>
                    <span className="font-bold text-green-600">{opportunity.takeProfit}</span>
                  </div>
                )}
              </div>
              
              <div className="mt-3 flex items-center justify-end gap-2">
                <Target className="w-4 h-4 text-blue-600" />
                <div className="text-sm font-medium">
                  Confiance: 
                  <span className="ml-1 text-blue-700">
                    {(opportunity.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {opportunities.length === 0 && (
        <div className="text-center py-8 bg-blue-50 rounded-lg border border-blue-100">
          <ArrowUpDown className="w-12 h-12 text-blue-300 mx-auto mb-3" />
          <p className="text-gray-600">
            Aucune opportunité forex détectée pour le moment
          </p>
        </div>
      )}
    </div>
  );
}