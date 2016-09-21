import FENBoard from 'fen-chess-board';
import removeChildren from 'remove-children';
import { template, getPieceClone, sequenceControls } from './templates';

class ChessBoard extends HTMLElement {
  createdCallback() {
    this._boardRoot = this.createShadowRoot();

    const clone = template.content.cloneNode(true);
    this._boardRoot.appendChild(clone);
    this._boardDefinition = this.innerHTML.trim().split("\n");
    this._sequenceLength = this._boardDefinition.length;
    this._isSequence = this._sequenceLength > 1 ? true : false;
    this._sequencePosition = 1,
    this._asciiBoard = new FENBoard(this._boardDefinition[0].trim());
    this._board = this._boardRoot.querySelector('.chessBoard');

    this._renderBoard();
    if (this._isSequence) this._bindControls();

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
  clearBoard(boardDefinition) {
    let newDefinition = boardDefinition || '';
    this._asciiBoard = new FENBoard(newDefinition);
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

  _bindControls() {   
    // append controls
    let clone = sequenceControls.content.cloneNode(true);
    this._boardRoot.appendChild(clone);
    this._updateControls();

    // bind control events
    const buttons = Array.prototype.slice.call(this._boardRoot.querySelectorAll('.controls button'));
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        let action = button.dataset.action;
        switch(action) {
            case 'prev':
                if (this._sequencePosition > 1) this._sequencePosition = this._sequencePosition - 1;
                break;
            case 'next':
                if (this._sequencePosition < this._sequenceLength) this._sequencePosition = this._sequencePosition + 1;
                break;
        }
        this._updateControls();                
        let boardDefinition = this._boardDefinition[this._sequencePosition - 1].trim();
        this.clearBoard(boardDefinition)
      });
    });

  }

  _updateControls(cell, asciiChar) {
    const current = this._boardRoot.querySelector('.controls .current');
    const total = this._boardRoot.querySelector('.controls .total');
    current.innerHTML = this._sequencePosition;
    total.innerHTML = this._boardDefinition.length;
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
