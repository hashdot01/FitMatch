import { db } from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, productUrl, brandName, recommendedSize } = req.body;

  try {
    const { data, error } = await db
      .from('size_check_history')
      .insert([{ user_id: userId, product_url: productUrl, brand_name: brandName, recommended_size: recommendedSize }]);

    if (error) throw error;

    return res.status(200).json({ message: 'History saved successfully', data });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}