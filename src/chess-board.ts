import FENBoard, { BoardPiece, Piece } from "./fen-chess-board";
import { getPieceClone } from "./templates";

const html = String.raw;
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
    this.upgradeProperty("fen");
    this.upgradeProperty("unicode");
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

  private upgradeProperty(prop: any) {
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
export const template = document.createElement("template");
template.innerHTML = html`
  <style>
    /* the frame */
    .frame {
      display: none;
    }

    :host([frame]) .frame {
      width: 1em;
      height: 1em;
      display: table-cell;
      font-size: 40%;
    }
    :host([frame]) .frame.left,
    :host([frame]) .frame.right {
      vertical-align: middle;
      padding: 0.2em;
    }
    :host([frame]) .frame.top,
    :host([frame]) .frame.bottom {
      text-align: center;
    }

    :host([reverse]) .boardFrame {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
    :host([reverse]) .frame {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }

    /* the board */
    :host {
      display: inline-block;
    }
    .chessBoard {
      border: 1px solid black;
    }
    .light {
      background: #ffce9e;
    }
    .dark {
      background: #d18b47;
    }
    td {
      width: 1em;
      height: 1em;
      text-align: center;
    }
    .piece,
    .empty {
      width: 1em;
      height: 1em;
      display: block;
    }

    :host([unicode]) .piece {
      line-height: 1em;
      font-family: "Arial Unicode MS", sans-serif;
    }

    :host([reverse]) .piece {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
  </style>
  <table class="boardFrame" cellpadding="0" cellspacing="0">
    <tr>
      <td class="frame top left"></td>
      <td class="frame top">a</td>
      <td class="frame top">b</td>
      <td class="frame top">c</td>
      <td class="frame top">d</td>
      <td class="frame top">e</td>
      <td class="frame top">f</td>
      <td class="frame top">g</td>
      <td class="frame top">h</td>
      <td class="frame top right"></td>
    </tr>
    <tr>
      <td class="frame left">8</td>
      <td colspan="8" rowspan="8" class="boardWrap">
        <table class="chessBoard" cellpadding="0" cellspacing="0">
          <tr>
            <td class="a8 light"><span class="empty"></span></td>
            <td class="b8 dark"><span class="empty"></span></td>
            <td class="c8 light"><span class="empty"></span></td>
            <td class="d8 dark"><span class="empty"></span></td>
            <td class="e8 light"><span class="empty"></span></td>
            <td class="f8 dark"><span class="empty"></span></td>
            <td class="g8 light"><span class="empty"></span></td>
            <td class="h8 dark"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a7 dark"><span class="empty"></span></td>
            <td class="b7 light"><span class="empty"></span></td>
            <td class="c7 dark"><span class="empty"></span></td>
            <td class="d7 light"><span class="empty"></span></td>
            <td class="e7 dark"><span class="empty"></span></td>
            <td class="f7 light"><span class="empty"></span></td>
            <td class="g7 dark"><span class="empty"></span></td>
            <td class="h7 light"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a6 light"><span class="empty"></span></td>
            <td class="b6 dark"><span class="empty"></span></td>
            <td class="c6 light"><span class="empty"></span></td>
            <td class="d6 dark"><span class="empty"></span></td>
            <td class="e6 light"><span class="empty"></span></td>
            <td class="f6 dark"><span class="empty"></span></td>
            <td class="g6 light"><span class="empty"></span></td>
            <td class="h6 dark"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a5 dark"><span class="empty"></span></td>
            <td class="b5 light"><span class="empty"></span></td>
            <td class="c5 dark"><span class="empty"></span></td>
            <td class="d5 light"><span class="empty"></span></td>
            <td class="e5 dark"><span class="empty"></span></td>
            <td class="f5 light"><span class="empty"></span></td>
            <td class="g5 dark"><span class="empty"></span></td>
            <td class="h5 light"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a4 light"><span class="empty"></span></td>
            <td class="b4 dark"><span class="empty"></span></td>
            <td class="c4 light"><span class="empty"></span></td>
            <td class="d4 dark"><span class="empty"></span></td>
            <td class="e4 light"><span class="empty"></span></td>
            <td class="f4 dark"><span class="empty"></span></td>
            <td class="g4 light"><span class="empty"></span></td>
            <td class="h4 dark"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a3 dark"><span class="empty"></span></td>
            <td class="b3 light"><span class="empty"></span></td>
            <td class="c3 dark"><span class="empty"></span></td>
            <td class="d3 light"><span class="empty"></span></td>
            <td class="e3 dark"><span class="empty"></span></td>
            <td class="f3 light"><span class="empty"></span></td>
            <td class="g3 dark"><span class="empty"></span></td>
            <td class="h3 light"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a2 light"><span class="empty"></span></td>
            <td class="b2 dark"><span class="empty"></span></td>
            <td class="c2 light"><span class="empty"></span></td>
            <td class="d2 dark"><span class="empty"></span></td>
            <td class="e2 light"><span class="empty"></span></td>
            <td class="f2 dark"><span class="empty"></span></td>
            <td class="g2 light"><span class="empty"></span></td>
            <td class="h2 dark"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a1 dark"><span class="empty"></span></td>
            <td class="b1 light"><span class="empty"></span></td>
            <td class="c1 dark"><span class="empty"></span></td>
            <td class="d1 light"><span class="empty"></span></td>
            <td class="e1 dark"><span class="empty"></span></td>
            <td class="f1 light"><span class="empty"></span></td>
            <td class="g1 dark"><span class="empty"></span></td>
            <td class="h1 light"><span class="empty"></span></td>
          </tr>
        </table>
      </td>
      <td class="frame right">8</td>
    </tr>
    <tr>
      <td class="frame left">7</td>
      <td class="frame right">7</td>
    </tr>
    <tr>
      <td class="frame left">6</td>
      <td class="frame right">6</td>
    </tr>
    <tr>
      <td class="frame left">5</td>
      <td class="frame right">5</td>
    </tr>
    <tr>
      <td class="frame left">4</td>
      <td class="frame right">4</td>
    </tr>
    <tr>
      <td class="frame left">3</td>
      <td class="frame right">3</td>
    </tr>
    <tr>
      <td class="frame left">2</td>
      <td class="frame right">2</td>
    </tr>
    <tr>
      <td class="frame left">1</td>
      <td class="frame right">1</td>
    </tr>
    <tr>
      <td class="frame bottom left"></td>
      <td class="frame bottom">a</td>
      <td class="frame bottom">b</td>
      <td class="frame bottom">c</td>
      <td class="frame bottom">d</td>
      <td class="frame bottom">e</td>
      <td class="frame bottom">f</td>
      <td class="frame bottom">g</td>
      <td class="frame bottom">h</td>
      <td class="frame bottom right"></td>
    </tr>
  </table>
`;

window.customElements.define("chess-board", ChessBoard);
