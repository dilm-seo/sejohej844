import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { NewsItem as NewsItemType } from '../types/news';
import { motion, AnimatePresence } from 'framer-motion';

interface NewsItemProps {
  item: NewsItemType;
}

export function NewsItem({ item }: NewsItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="p-4">
        <header className="mb-2">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-lg font-semibold text-gray-900 flex-1">
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-indigo-600 inline-flex items-center gap-2"
              >
                {item.title}
                <ExternalLink className="w-4 h-4 flex-shrink-0" />
              </a>
            </h2>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={isExpanded ? "Réduire" : "Développer"}
            >
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <span className="font-medium text-indigo-600">{item.creator}</span>
            <span>•</span>
            <time dateTime={item.pubDate} className="text-gray-500">
              {formatDistanceToNow(new Date(item.pubDate), { addSuffix: true })}
            </time>
          </div>
        </header>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-gray-700 mt-2 leading-relaxed">{item.description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {item.category && (
          <footer className="mt-3">
            <span className="inline-block px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
              {item.category}
            </span>
          </footer>
        )}
      </div>
    </article>
  );
}