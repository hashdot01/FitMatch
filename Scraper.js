import axios from 'axios';
import * as cheerio from 'cheerio';

export async function fetchSizeChart(url, brandConfig) {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      },
      timeout: 5000
    });

    const $ = cheerio.load(response.data);
    const tableData = [];
    const tableSelector = brandConfig.dynamicSelector || 'table';
    
    $(tableSelector).find('tr').each((_, row) => {
      const rowData = [];
      $(row).find('th, td').each((_, cell) => {
        rowData.push($(cell).text().trim());
      });
      if (rowData.length > 0) tableData.push(rowData);
    });

    return tableData;
  } catch (error) {
    throw new Error('Size chart fetching failed: ' + error.message);
  }
}