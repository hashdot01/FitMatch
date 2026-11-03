export function calculateBestFit(userBody, sizeChart, fitPreference = 'regular') {
  let fitOffset = 0;
  if (fitPreference === 'tight') fitOffset = -0.5;
  if (fitPreference === 'loose') fitOffset = 1.0;

  const targetChest = userBody.chest + fitOffset;
  const targetWaist = userBody.waist + fitOffset;

  let bestMatch = null;
  let lowestDiff = Infinity;

  const scoringResults = sizeChart.map((entry) => {
    const midChest = (entry.chestMin + entry.chestMax) / 2;
    const midWaist = (entry.waistMin + entry.waistMax) / 2;

    const chestDiff = Math.abs(targetChest - midChest);
    const waistDiff = Math.abs(targetWaist - midWaist);
    const totalScore = (chestDiff * 0.6) + (waistDiff * 0.4);

    if (totalScore < lowestDiff) {
      lowestDiff = totalScore;
      bestMatch = entry.size;
    }

    return {
      size: entry.size,
      score: totalScore
    };
  });

  return {
    recommendedSize: bestMatch,
    confidenceScore: Math.max(0, 100 - (lowestDiff * 10)).toFixed(1) + '%'
  };
}