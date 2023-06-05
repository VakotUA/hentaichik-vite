/**
 * Convert `some_random_string` to `Some Random String`
 * @param {string} value string to be formatted
 * @returns formatted string
 */
export const formatString = (value: string): string =>
  value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')

// Yeah. I love one-liner's
