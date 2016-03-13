import { emptyBoard } from './chess-utils'
import { getFileRank } from './chess-utils'

export class ASCIIBoard {
  constructor (fen) {
    this.board = emptyBoard()
    this.fen = fen
  }

  /**
   * Gets the piece at a square
   *
   * @param {string} square - The square. Eg: "a2"
   * @return {string} piece - the ascii representation of a piece. Eg: "K"
   */
  piece (square) {
    const [file, rank] = getFileRank(square)
    return this._getPiece(file, rank)
  }

  /**
   * Places a piece in the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   * @param {string} piece - the ascii representation of a piece. Eg: "K"
   */
  put (square, piece) {
    const [file, rank] = getFileRank(square)
    this._setPiece(file, rank, piece)
  }

  /**
   * Removes the piece at the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   */
  clear (square) {
    this.put(square, '')
  }

  /**
   * Moves a piece.
   *
   * @param {string} from - The square to move from. Eg: "a2"
   * @param {string} to - The square to move to. Eg: "a3"
   */
  move (from, to) {
    const piece = this._getPiece(this.piece(from))
    if (!piece) {
      throw new Error('Move Error: the from square was empty')
    }
    this.put(to, piece)
    this.clear(from)
  }

  /**
   * Set the current position.
   *
   * @param {string} fen - a position string as FEN
   */
  set fen (fen) {
    if (!fen) return
    if (fen === 'start') fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

    let rank = 0
    let file = 0
    let fenIndex = 0

    let fenChar
    let count

    while (fenIndex < fen.length) {
      fenChar = fen[fenIndex]

      if (fenChar === ' ') {
        break // ignore the rest
      }
      if (fenChar === '/') {
        rank++
        file = 0
        fenIndex++
        continue
      }

      if (isNaN(parseInt(fenChar, 10))) {
        this._setPiece(file, rank, fenChar)
        file++
      } else {
        count = parseInt(fenChar, 10)
        for (let i = 0; i < count; i++) {
          this._setPiece(file, rank, '')
          file++
        }
      }

      fenIndex++
    }
  }

  /**
   * Get the current position as FEN.
   */
  get fen () {
    let fen = []
    for (let i = 0; i < 8; i++) {
      let empty = 0
      for (let j = 0; j < 8; j++) {
        const piece = this._getPiece(j, i)
        if (piece) {
          if (empty > 0) {
            fen.push(empty)
            empty = 0
          }
          fen.push(piece)
        } else {
          empty++
        }
      }
      if (empty > 0) {
        fen.push(empty)
      }
      fen.push('/')
    }
    fen.pop()
    return fen.join('')
  }

  _setPiece (file, rank, fenChar) {
    this.board[file][rank] = fenChar
  }

  _getPiece (file, rank) {
    return this.board[file][rank]
  }
}
