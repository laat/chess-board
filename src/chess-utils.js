export const ranks = {1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1, 8: 0}
export const files = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7}

/**
 * Returns indices for a cell
 * (can be used to access board arrays)
 *
 * Example:
 *   getFileRank("a2") => [0, 6]
 *
 *   2 = 6 because arrays usally are displayed with 0,0 in the upper
 *   left corner
 *
 * @param {string} square - Eg: "a2"
 */
export function getFileRank (square) {
  const [file, rank] = square
  return [files[file], ranks[rank]]
}
