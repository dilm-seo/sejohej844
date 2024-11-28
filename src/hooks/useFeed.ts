import { useState, useEffect } from 'react';
import { NewsItem } from '../types/news';
import { fetchRSSFeed } from '../utils/api';

export function useFeed() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadFeed() {
    try {
      setLoading(true);
      const feed = await fetchRSSFeed();
      setNews(feed.item);
      setError(null);
    } catch (err) {
      setError('Failed to load news feed');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeed();
    const interval = setInterval(loadFeed, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return { news, loading, error, refresh: loadFeed };
}