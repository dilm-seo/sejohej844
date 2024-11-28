import React from 'react';
import { motion } from 'framer-motion';

interface KeywordCloudProps {
  keywords: string[];
}

export function KeywordCloud({ keywords }: KeywordCloudProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {keywords.map((keyword, index) => (
        <motion.span
          key={keyword}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
        >
          {keyword}
        </motion.span>
      ))}
    </div>
  );
}