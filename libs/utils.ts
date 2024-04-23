export const round2 = (num: number) =>
  Math.round((num + Number.EPSILON) * 100) / 100

/**
   * // This function rounds a number to two decimal places.
export const round2 = (num: number) => {
  // Add Number.EPSILON to mitigate floating-point precision issues when rounding
  // This ensures that small discrepancies caused by floating-point arithmetic are corrected
  const adjustedNum = num + Number.EPSILON;

  // Multiply the adjusted number by 100 to shift the decimal point two places to the right
  // This effectively converts the number to an integer with two decimal places
  const multipliedNum = adjustedNum * 100;

  // Round the multiplied number to the nearest integer
  const roundedNum = Math.round(multipliedNum);

  // Divide the rounded number by 100 to shift the decimal point back two places to the left
  // This restores the number to its original scale but rounded to two decimal places
  const finalResult = roundedNum / 100;

  // Return the rounded number
  return finalResult;
};

   */
export function convertDocToObj(doc: any) {
  doc._id = doc._id.toString()
  return doc
}
