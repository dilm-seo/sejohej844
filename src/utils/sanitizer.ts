import he from 'he';

export function sanitizeHtml(html: string): string {
  // Decode HTML entities
  const decodedHtml = he.decode(html);
  
  // Remove CDATA tags
  const withoutCdata = decodedHtml.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
  
  // Remove HTML tags except for basic formatting
  const allowedTags = ['p', 'b', 'i', 'strong', 'em'];
  const stripped = allowedTags.reduce((acc, tag) => {
    const regex = new RegExp(`<\/?${tag}>`, 'gi');
    return acc.replace(regex, '');
  }, withoutCdata);
  
  return stripped.trim();
}