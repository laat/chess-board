import FENBoard, { BoardPiece, Piece } from "./fen-chess-board";
import { template, getPieceClone } from "./templates";

class ChessBoard extends HTMLElement {
  static observedAttributes = ["fen", "unicode"];
  private board: HTMLTableElement;
  private asciiBoard: FENBoard;
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.board = shadowRoot.querySelector(".chessBoard")! as HTMLTableElement;
    this.asciiBoard = new FENBoard();
  }
  connectedCallback() {
    this._upgradeProperty("fen");
    this._upgradeProperty("unicode");
    this.renderBoard();
  }

  attributeChangedCallback(
    name: string,
    _oldValue: string | null,
    newValue: string | null
  ) {
    if (name === "fen") {
      this.asciiBoard.fen = newValue;
      this.renderBoard();
    }
    if (name === "unicode") {
      this.renderBoard();
    }
  }

  piece(square: string) {
    return this.asciiBoard.piece(square);
  }

  put(square: string, piece: Piece) {
    this.asciiBoard.put(square, piece);
    this.fen = this.asciiBoard.fen;
  }

  clear(square: string) {
    this.asciiBoard.clear(square);
    this.fen = this.asciiBoard.fen;
  }

  move(from: string, to: string) {
    this.asciiBoard.move(from, to);
    this.fen = this.asciiBoard.fen;
  }

  private renderBoard() {
    const ascii = this.asciiBoard.board;
    const board = this.board;
    for (let i = 0; i < ascii.length; i++) {
      const row = board.rows[i];

      for (let j = 0; j < ascii.length; j++) {
        const cell = row.cells[j];
        const asciiChar = ascii[i][j];
        this.updateCell(cell, asciiChar);
      }
    }
  }
  private updateCell(
    cell: HTMLTableDataCellElement | HTMLTableHeaderCellElement,
    asciiChar: BoardPiece
  ) {
    const currentPiece = (cell.querySelector(
      "[ascii]"
    ) as unknown) as HTMLElement | null;
    const currentAscii = currentPiece?.getAttribute("ascii");
    const currentUnicode = currentPiece?.hasAttribute("unicode");

    // simple diff
    if (asciiChar !== currentAscii || currentUnicode !== this.unicode) {
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
      cell.appendChild(getPieceClone(asciiChar, this.unicode));
    }
  }

  set frame(value: boolean) {
    if (value) {
      this.setAttribute("frame", "");
    } else {
      this.removeAttribute("frame");
    }
  }
  get frame() {
    return this.hasAttribute("frame");
  }

  set reverse(value: boolean) {
    if (value) {
      this.setAttribute("reverse", "");
    } else {
      this.removeAttribute("reverse");
    }
  }
  get reverse() {
    return this.hasAttribute("reverse");
  }

  set unicode(value: boolean) {
    if (value) {
      this.setAttribute("unicode", "");
    } else {
      this.removeAttribute("unicode");
    }
  }
  get unicode() {
    return this.hasAttribute("unicode");
  }

  set fen(fen: string | null) {
    if (fen != null) {
      this.setAttribute("fen", fen);
    } else {
      this.removeAttribute("fen");
    }
  }
  get fen() {
    return this.getAttribute("fen");
  }

  _upgradeProperty(prop: any) {
    if (this.hasOwnProperty(prop)) {
      // @ts-ignore
      let value = this[prop];
      // @ts-ignore
      delete this[prop];
      // @ts-ignore
      this[prop] = value;
    }
  }
}

window.customElements.define("chess-board", ChessBoard);
