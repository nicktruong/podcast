/**
 * Pads a value with leading zeros to a minimum length of two characters.
 * @param {string | number | undefined} value - The value to pad.
 * @returns {string} The padded string, always at least two characters long.
 * @example
 * const padded = padZero(5); // Output: "05"
 * const padded2 = padZero("12"); // Output: "12"
 * const padded3 = padZero(); // Output: "00"
 */
export const padZero = (value: string | number | undefined) => {
  return String(value ?? 0).padStart(2, "0");
};
