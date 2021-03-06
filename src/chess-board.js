import FENBoard from 'fen-chess-board';
import removeChildren from 'remove-children';
import { template, getPieceClone } from './templates';

class ChessBoard extends HTMLElement {
  createdCallback() {
    this._boardRoot = this.createShadowRoot();

    const clone = template.content.cloneNode(true);
    this._boardRoot.appendChild(clone);

    this._asciiBoard = new FENBoard(this.innerHTML.trim());
    this._board = this._boardRoot.querySelector('.chessBoard');

    this._renderBoard();

    // Observe innerHTML for new FEN-strings;
    const observer = new MutationObserver(() => {
      this.fen = this.innerHTML.trim();
    });
    observer.observe(this, { subtree: true, characterData: true });

    /*
     * A stinky fugly workaround to redraw the board.
     *
     * (Chrome 36/38) The chessboard will not rotate with css if I do not force
     * a redraw of the component. It's difficult to reproduce a minimal example
     * for bugreports.
     */
    this.style.display = 'run-in';
    setTimeout(() => {
      this.style.display = 'block';
    }, 0);
    // end of stinky fugly workaround
  }

  attributeChangedCallback(attribute) {
    if (attribute === 'unicode') {
      this._renderBoard();
    }
  }

  /**
   * Replaces the current board with an empty one.
   */
  clearBoard() {
    this._asciiBoard = new FENBoard();
    this._renderBoard();
  }

  _renderBoard() {
    const ascii = this._asciiBoard.board;
    const board = this._board;
    for (let i = 0; i < ascii.length; i++) {
      const row = board.rows[i];
      for (let j = 0; j < ascii.length; j++) {
        const cell = row.cells[j];
        const asciiChar = ascii[i][j];
        this._updateCell(cell, asciiChar);
      }
    }
  }

  _updateCell(cell, asciiChar) {
    const currentPiece = cell.querySelector('[ascii]') || { attributes: {} };
    const currentAscii = currentPiece.attributes.ascii;
    const currentUnicode = !!currentPiece.attributes.unicode;
    const unicode = !!this.attributes.unicode;

    // supersimple diff
    if (asciiChar !== currentAscii || unicode !== currentUnicode) {
      removeChildren(cell);
      cell.appendChild(getPieceClone(asciiChar, unicode));
    }
  }

  /**
   * Gets the piece at a square
   *
   * @param {string} square - The square. Eg: "a2"
   * @return {string} piece - the ascii representation of a piece. Eg: "K"
   */
  piece(square) {
    this._asciiBoard.piece(square);
    this._renderBoard();
  }

  /**
   * Places a piece in the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   * @param {string} piece - the ascii representation of a piece. Eg: "K"
   */
  put(square, piece) {
    this._asciiBoard.put(square, piece);
    this._renderBoard();
  }

  /**
   * Removes the piece at the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   */
  clear(square) {
    this._asciiBoard.clear(square);
    this._renderBoard();
  }

  /**
   * Moves a piece.
   *
   * @param {string} from - The square to move from. Eg: "a2"
   * @param {string} to - The square to move to. Eg: "a3"
   */
  move(from, to) {
    this._asciiBoard.move(from, to);
    this._renderBoard();
  }

  /**
   * Set the current position.
   *
   * @param {string} fen - a position string as FEN
   */
  set fen(fen) {
    this._asciiBoard.fen = fen;
    this._renderBoard();
  }

  /**
   * Get the current position as FEN.
   */
  get fen() {
    return this._asciiBoard.fen;
  }
}

window.ChessBoard = document.registerElement('chess-board', ChessBoard);
