/**
 * CampusFind - College Lost & Found Portal
 * Match Service (match.service.js)
 * Implements rule-based similarity scoring between Lost and Found reports
 */

/**
 * Normalizes input string by trimming and converting to lowercase
 * @param {string} text - Input text
 * @returns {string} - Cleaned lowercase text
 */
function normalize(text = "") {
  return (text || "").toString().trim().toLowerCase();
}

/**
 * Calculates similarity points for item titles
 * - Exact match: 25 points
 * - Partial/substring match: 15 points
 * - No match: 0 points
 */
function nameScore(nameA, nameB) {
  const a = normalize(nameA);
  const b = normalize(nameB);

  if (!a || !b) return 0;
  if (a === b) return 25;
  if (a.includes(b) || b.includes(a)) return 15;
  return 0;
}

/**
 * Calculates similarity score between a LOST item and a FOUND item
 * Maximum score: 100 points
 * 
 * Rules:
 * 1. Category match: 25 points
 * 2. Item name match: Up to 25 points
 * 3. Color match: 20 points
 * 4. Location match: 20 points
 * 5. Date proximity: 10 points (within 3 days) or 5 points (within 7 days)
 * 
 * @param {Object} itemA - First report
 * @param {Object} itemB - Second report
 * @returns {Object} - { score, reasons }
 */
function calculateScore(itemA, itemB) {
  let score = 0;
  const reasons = [];

  // 1. Category comparison (Max 25 pts)
  if (normalize(itemA.category) === normalize(itemB.category)) {
    score += 25;
    reasons.push(`Same category: ${itemA.category} (+25 pts)`);
  }

  // 2. Name / Title comparison (Max 25 pts)
  const titlePoints = nameScore(itemA.title, itemB.title);
  if (titlePoints === 25) {
    score += 25;
    reasons.push("Exact item name match (+25 pts)");
  } else if (titlePoints === 15) {
    score += 15;
    reasons.push("Matching keywords in item name (+15 pts)");
  }

  // 3. Color comparison (Max 20 pts)
  if (normalize(itemA.color) === normalize(itemB.color)) {
    score += 20;
    reasons.push(`Same primary color: ${itemA.color} (+20 pts)`);
  }

  // 4. Campus Location comparison (Max 20 pts)
  if (normalize(itemA.location) === normalize(itemB.location)) {
    score += 20;
    reasons.push(`Same campus location: ${itemA.location} (+20 pts)`);
  }

  // 5. Date Proximity comparison (Max 10 pts)
  const dateA = new Date(itemA.itemDate);
  const dateB = new Date(itemB.itemDate);

  if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
    const dayGap = Math.abs(dateA.getTime() - dateB.getTime()) / (1000 * 60 * 60 * 24);

    if (dayGap <= 3) {
      score += 10;
      reasons.push(`Reported within ${Math.round(dayGap)} day(s) (+10 pts)`);
    } else if (dayGap <= 7) {
      score += 5;
      reasons.push(`Reported within 1 week (+5 pts)`);
    }
  }

  return { score, reasons };
}

/**
 * Finds all matching items of opposite type with score >= threshold
 * @param {Object} targetItem - Item to find matches for
 * @param {Array} allItems - List of candidate reports
 * @param {number} threshold - Minimum score to qualify as match (default: 60)
 * @returns {Array} - Array of matched items with scores and reasons sorted descending
 */
function findMatches(targetItem, allItems = [], threshold = 60) {
  const oppositeType = targetItem.type === "LOST" ? "FOUND" : "LOST";

  return allItems
    .filter((candidate) => candidate.id !== targetItem.id && candidate.type === oppositeType)
    .map((candidate) => {
      const { score, reasons } = calculateScore(targetItem, candidate);
      return {
        item: candidate,
        score,
        reasons,
      };
    })
    .filter((match) => match.score >= threshold)
    .sort((a, b) => b.score - a.score);
}

module.exports = {
  calculateScore,
  findMatches,
  nameScore,
  normalize,
};
