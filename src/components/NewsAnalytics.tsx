import React from 'react';
import { motion } from 'framer-motion';
import { useFeed } from '../hooks/useFeed';
import { SentimentChart } from './charts/SentimentChart';
import { OpportunityList } from './charts/OpportunityList';
import { ForexOpportunities } from './charts/ForexOpportunities';
import { KeywordCloud } from './charts/KeywordCloud';
import { useNewsAnalysis } from '../hooks/useNewsAnalysis';
import { LoadingSpinner } from './LoadingSpinner';

export function NewsAnalytics() {
  const { news } = useFeed();
  const { analysis, loading } = useNewsAnalysis(news[0]);

  if (loading || !analysis) {
    return <LoadingSpinner />;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <motion.div variants={item} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Sentiment</h2>
        <SentimentChart sentiment={analysis.sentiment} />
      </motion.div>

      <motion.div variants={item} className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Forex</h2>
        <ForexOpportunities opportunities={analysis.forexOpportunities} />
      </motion.div>

      <motion.div variants={item} className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Opportunités</h2>
        <OpportunityList opportunities={analysis.opportunities} />
      </motion.div>

      <motion.div variants={item} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Mots-clés</h2>
        <KeywordCloud keywords={analysis.keywords} />
      </motion.div>
    </motion.div>
  );
}