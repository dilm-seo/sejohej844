import React from 'react';
import { RefreshCw } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { NewsItem } from './NewsItem';
import { useFeed } from '../hooks/useFeed';

export function NewsFeed() {
  const { news, loading, error, refresh } = useFeed();

  if (loading && news.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Forexlive News</h1>
        <button
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
      <div className="space-y-4">
        {news.map(item => (
          <NewsItem key={`${item.guid}-${item.pubDate}`} item={item} />
        ))}
      </div>
    </div>
  );
}