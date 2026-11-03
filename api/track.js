import { identifyBrand } from '../../BrandIdentifier';
import { fetchSizeChart } from '../../Scraper';
import { calculateBestFit } from '../../SizingLogic';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url, userBody, fitPreference } = req.body;

  try {
    const brandInfo = identifyBrand(url);
    if (!brandInfo.identified) {
      return res.status(400).json({ message: 'Brand not supported' });
    }

    const sizeChart = await fetchSizeChart(url, brandInfo.config);
    const recommendation = calculateBestFit(userBody, sizeChart, fitPreference);

    return res.status(200).json({
      brand: brandInfo.brand,
      recommendation
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}