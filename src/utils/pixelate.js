/**
 * Get CSS filter for pixelation effect
 * @param {number} pixelSize - Size of each pixel block (default: 6)
 * @returns {string} - CSS filter string
 */
export const getPixelationFilter = (pixelSize = 6) => {
  return `blur(${pixelSize}px) contrast(1.2)`;
};
