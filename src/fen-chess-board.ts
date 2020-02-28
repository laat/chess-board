import { emptyBoard, getFileRank } from "./chess-utils";

/* prettier-ignore */
export type Piece =
  | "p" | "r" | "n" | "b" | "q" | "k" | "b" | "n" | "r"
  | "P" | "R" | "N" | "B" | "Q" | "K" | "B" | "N" | "R";

export const isPiece = (piece: any): piece is Piece =>
  typeof piece === "string" &&
  piece.length === 1 &&
  "prnbqkbnrPRNBQKBNR".includes(piece);

export type BoardPiece = Piece | "";

export default class FENBoard {
  board: BoardPiece[][];
  constructor(fen?: string) {
    this.board = emptyBoard();
    this.fen = fen ?? null;
  }

  /**
   * Gets the piece at a square
   *
   * @param {string} square - The square. Eg: "a2"
   * @return {string} piece - the ascii representation of a piece. Eg: "K"
   */
  piece(square: string) {
    const [file, rank] = getFileRank(square);
    return this._getPiece(file, rank);
  }

  /**
   * Places a piece in the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   * @param {string} piece - the ascii representation of a piece. Eg: "K"
   */
  put(square: string, piece: BoardPiece) {
    const [file, rank] = getFileRank(square);
    this._setPiece(file, rank, piece);
  }

  /**
   * Removes the piece at the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   */
  clear(square: string) {
    this.put(square, "");
  }

  /**
   * Moves a piece.
   *
   * @param {string} from - The square to move from. Eg: "a2"
   * @param {string} to - The square to move to. Eg: "a3"
   */
  move(from: string, to: string) {
    const piece = this.piece(from);
    if (!piece) {
      throw new Error("Move Error: the from square was empty");
    }
    this.put(to, piece);
    this.clear(from);
  }

  /**
   * Set the current position.
   *
   * @param {string} fen - a position string as FEN
   */
  set fen(fen: string | null) {
    // reset board
    this.board.forEach(r => {
      r.length = 0;
    }); // eslint-disable-line no-param-reassign

    if (!fen) return;
    if (fen === "start") fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"; // eslint-disable-line

    let rank = 0;
    let file = 0;
    let fenIndex = 0;

    let fenChar;
    let count;

    while (fenIndex < fen.length) {
      fenChar = fen[fenIndex];

      if (fenChar === " ") {
        break; // ignore the rest
      }
      if (fenChar === "/") {
        rank++;
        file = 0;
        fenIndex++;
        continue;
      }

      if (isNaN(parseInt(fenChar, 10))) {
        this._setPiece(file, rank, fenChar as Piece);
        file++;
      } else {
        count = parseInt(fenChar, 10);
        for (let i = 0; i < count; i++) {
          this._setPiece(file, rank, "");
          file++;
        }
      }

      fenIndex++;
    }
  }

  /**
   * Get the current position as FEN.
   */
  get fen() {
    const fen = [];
    for (let i = 0; i < 8; i++) {
      let empty = 0;
      for (let j = 0; j < 8; j++) {
        const piece = this._getPiece(j, i);
        if (piece) {
          if (empty > 0) {
            fen.push(empty);
            empty = 0;
          }
          fen.push(piece);
        } else {
          empty++;
        }
      }
      if (empty > 0) {
        fen.push(empty);
      }
      fen.push("/");
    }
    fen.pop();
    return fen.join("");
  }

  _setPiece(file: number, rank: number, fenChar: BoardPiece) {
    this.board[rank][file] = fenChar;
  }

  _getPiece(file: number, rank: number) {
    return this.board[rank][file];
  }
}
