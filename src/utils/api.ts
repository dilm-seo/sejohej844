import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { RSSFeed } from '../types/rss';
import { sanitizeHtml } from './sanitizer';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const RSS_URL = 'https://www.forexlive.com/feed/news/';

export async function fetchRSSFeed() {
  try {
    const response = await axios.get(`${CORS_PROXY}${encodeURIComponent(RSS_URL)}`);
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });
    
    const result = parser.parse(response.data) as RSSFeed;
    
    return {
      ...result.rss.channel,
      item: result.rss.channel.item.map(item => ({
        ...item,
        description: sanitizeHtml(item.description)
      }))
    };
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    throw error;
  }
}