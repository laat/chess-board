export const ranks = {
  "1": 7,
  "2": 6,
  "3": 5,
  "4": 4,
  "5": 3,
  "6": 2,
  "7": 1,
  "8": 0
};
export const files = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7
};
export type File = keyof typeof files;
export type Rank = keyof typeof ranks;

export const isRank = (x: string): x is Rank => x in ranks;
export const isFile = (x: string): x is File => x in files;

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
export function getFileRank(square: string) {
  const [file, rank] = square.split("");
  if (!isFile(file)) {
    throw new Error(`file ${file} is illegal`);
  }
  if (!isRank(rank)) {
    throw new Error(`rank ${rank} is illegal`);
  }
  return [files[file], ranks[rank]];
}

export function emptyBoard<T>() {
  const board: T[][] = [];
  for (let i = 0; i < 8; i++) {
    board[i] = [];
  }
  return board;
}
