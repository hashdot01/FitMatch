export function identifyBrand(inputUrl) {
  try {
    const parsedUrl = new URL(inputUrl);
    const hostname = parsedUrl.hostname.toLowerCase().replace('www.', '');

    const domainMap = {
      'zara.com': { brand: 'zara', dynamicSelector: '.size-guide-table', parserType: 'DOM' },
      'nike.com': { brand: 'nike', dynamicSelector: 'table[aria-label="Size Chart"]', parserType: 'SCHEMA' },
      'hm.com': { brand: 'hm', dynamicSelector: '.size-guide-content', parserType: 'DOM' }
    };

    for (const domain in domainMap) {
      if (hostname.includes(domain)) {
        return { identified: true, brand: domainMap[domain].brand, config: domainMap[domain] };
      }
    }
    const parts = hostname.split('.');
    const fallbackBrand = parts.length > 2 ? parts[parts.length - 2] : parts[0];
    return { identified: false, brand: fallbackBrand, config: { parserType: 'GENERIC_SCRAPER' } };
  } catch (err) {
    return { identified: false, error: 'Invalid URL' };
  }
}