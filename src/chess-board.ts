import FENBoard, { BoardPiece, Piece } from "./fen-chess-board";
import { getPieceClone } from "./templates";

const html = String.raw;
class ChessBoard extends HTMLElement {
  static observedAttributes = ["fen"];
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

    // simple diff
    if (asciiChar !== currentAscii) {
      while (cell.firstChild) {
        cell.removeChild(cell.firstChild);
      }
      cell.appendChild(getPieceClone(asciiChar));
    }
  }

  set frame(value: string | null) {
    if (value != null) {
      this.setAttribute("frame", value);
    } else {
      this.removeAttribute("frame");
    }
  }
  get frame() {
    return this.getAttribute("frame");
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
const foo = html`
  <style>
    :host {
      display: inline-grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(8, 1fr);
      height: 400px;
      width: 400px;
    }
    .light {
      background: #ffce9e;
    }
    .dark {
      background: #d18b47;
    }
    .piece {
      height: 100%;
      width: 100%;
    }
    .cell {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :host([frame="all"]) {
      grid-template-columns: 1.5em repeat(8, 1fr) 1.5em;
      grid-template-rows: 1.5em repeat(8, 1fr) 1.5em;
    }
    :host([frame*="left"]:not([reverse])),
    :host([frame*="right"][reverse]) {
      grid-template-columns: 1.5em repeat(8, 1fr);
    }
    :host([frame*="right"]:not([reverse])),
    :host([frame*="left"][reverse]) {
      grid-template-columns: repeat(8, 1fr) 1.5em;
    }
    :host([frame*="right"][frame*="left"]) {
      grid-template-columns: 1.5em repeat(8, 1fr) 1.5em;
    }
    :host([frame*="bottom"]:not([reverse])),
    :host([frame*="top"][reverse]) {
      grid-template-rows: repeat(8, 1fr) 1.5em;
    }
    :host([frame*="top"]:not([reverse])),
    :host([frame*="bottom"][reverse]) {
      grid-template-rows: 1.5em repeat(8, 1fr);
    }
    :host([frame*="bottom"][frame*="top"]) {
      grid-template-rows: 1.5em repeat(8, 1fr) 1.5em;
    }

    .frame {
      display: none;
    }
    :host([frame="all"]) .frame,
    :host([frame*="left"]:not([reverse])) .frame.left,
    :host([frame*="right"]:not([reverse])) .frame.right,
    :host([frame*="top"]:not([reverse])) .frame.top,
    :host([frame*="bottom"]:not([reverse])) .frame.bottom,
    :host([frame*=""]:not([reverse])) .frame.left,
    :host([frame*="left"][reverse]) .frame.right,
    :host([frame*="right"][reverse]) .frame.left,
    :host([frame*="top"][reverse]) .frame.bottom,
    :host([frame*="bottom"][reverse]) .frame.top,
    :host([frame*="top"][frame*="right"][reverse]) .frame.bl-corner,
    :host([frame*="top"][frame*="right"]:not([reverse])) .frame.tr-corner,
    :host([frame*="top"][frame*="left"]:not([reverse])) .frame.tl-corner,
    :host([frame*="top"][frame*="left"][reverse]) .frame.bb-corner,
    :host([frame*="bottom"][frame*="right"]:not([reverse])) .frame.br-corner,
    :host([frame*="bottom"][frame*="right"][reverse]) .frame.tl-corner,
    :host([frame*="bottom"][frame*="left"]:not([reverse])) .frame.bl-corner,
    :host([frame*="bottom"][frame*="left"][reverse]) .frame.tr-corner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cell:nth-of-type(10n - 1) {
      border-right: 1px solid black;
    }
    .cell:nth-of-type(10n + 2) {
      border-left: 1px solid black;
    }
    .cell:nth-of-type(n + 2):nth-last-of-type(n + 80) {
      border-top: 1px solid black;
    }
    .cell:nth-of-type(n + 80):nth-last-of-type(n + 10) {
      border-bottom: 1px solid black;
    }
    :host([reverse]),
    :host([reverse]) .frame,
    :host([reverse]) .piece {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
  </style>
  <div class="frame tl-corner"></div>
  <div class="frame top">a</div>
  <div class="frame top">b</div>
  <div class="frame top">c</div>
  <div class="frame top">d</div>
  <div class="frame top">e</div>
  <div class="frame top">f</div>
  <div class="frame top">g</div>
  <div class="frame top">h</div>
  <div class="frame tr-corner"></div>
  <div class="frame left">8</div>
  <div class="cell a8 light"></div>
  <div class="cell b8 dark"></div>
  <div class="cell c8 light"></div>
  <div class="cell d8 dark"></div>
  <div class="cell e8 light"></div>
  <div class="cell f8 dark"></div>
  <div class="cell g8 light"></div>
  <div class="cell h8 dark"></div>
  <div class="frame right">8</div>
  <div class="frame left">7</div>
  <div class="cell a7 dark"></div>
  <div class="cell b7 light"></div>
  <div class="cell c7 dark"></div>
  <div class="cell d7 light"></div>
  <div class="cell e7 dark"></div>
  <div class="cell f7 light"></div>
  <div class="cell g7 dark"></div>
  <div class="cell h7 light"></div>
  <div class="frame right">7</div>
  <div class="frame left">6</div>
  <div class="cell a6 light"></div>
  <div class="cell b6 dark"></div>
  <div class="cell c6 light"></div>
  <div class="cell d6 dark"></div>
  <div class="cell e6 light"></div>
  <div class="cell f6 dark"></div>
  <div class="cell g6 light"></div>
  <div class="cell h6 dark"></div>
  <div class="frame right">6</div>
  <div class="frame left">5</div>
  <div class="cell a5 dark"></div>
  <div class="cell b5 light"></div>
  <div class="cell c5 dark"></div>
  <div class="cell d5 light"></div>
  <div class="cell e5 dark"></div>
  <div class="cell f5 light"></div>
  <div class="cell g5 dark"></div>
  <div class="cell h5 light"></div>
  <div class="frame right">5</div>
  <div class="frame left">4</div>
  <div class="cell a4 light"></div>
  <div class="cell b4 dark"></div>
  <div class="cell c4 light"></div>
  <div class="cell d4 dark"></div>
  <div class="cell e4 light"></div>
  <div class="cell f4 dark"></div>
  <div class="cell g4 light"></div>
  <div class="cell h4 dark"></div>
  <div class="frame right">4</div>
  <div class="frame left">3</div>
  <div class="cell a3 dark"></div>
  <div class="cell b3 light"></div>
  <div class="cell c3 dark"></div>
  <div class="cell d3 light"></div>
  <div class="cell e3 dark"></div>
  <div class="cell f3 light"></div>
  <div class="cell g3 dark"></div>
  <div class="cell h3 light"></div>
  <div class="frame right">3</div>
  <div class="frame left">2</div>
  <div class="cell a2 light"></div>
  <div class="cell b2 dark"></div>
  <div class="cell c2 light"></div>
  <div class="cell d2 dark"></div>
  <div class="cell e2 light"></div>
  <div class="cell f2 dark"></div>
  <div class="cell g2 light"></div>
  <div class="cell h2 dark"></div>
  <div class="frame right">2</div>
  <div class="frame left">1</div>
  <div class="cell a1 dark"></div>
  <div class="cell b1 light"></div>
  <div class="cell c1 dark"></div>
  <div class="cell d1 light"></div>
  <div class="cell e1 dark"></div>
  <div class="cell f1 light"></div>
  <div class="cell g1 dark"></div>
  <div class="cell h1 light"></div>
  <div class="frame right">1</div>
  <div class="frame bl-corner"></div>
  <div class="frame bottom">a</div>
  <div class="frame bottom">b</div>
  <div class="frame bottom">c</div>
  <div class="frame bottom">d</div>
  <div class="frame bottom">e</div>
  <div class="frame bottom">f</div>
  <div class="frame bottom">g</div>
  <div class="frame bottom">h</div>
  <div class="frame br-corner"></div>
`;
export const template = document.createElement("template");
template.innerHTML = html`
  <style>
    /* the frame */
    .frame {
      display: none;
      vertical-align: middle;
      text-align: center;
    }
    :host([frame="all"]) .frame,
    :host([frame*="right"]) .frame.right,
    :host([frame*="left"]) .frame.left,
    :host([frame*="top"]) .frame.top,
    :host([frame*="bottom"]) .frame.bottom {
      display: table-cell;
    }

    :host([reverse]) .boardFrame,
    :host([reverse]) .frame,
    :host([reverse]) .piece {
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
    .piece,
    .empty {
      display: block;
    }

    /* dynamic sizing */
    .frame {
      height: 1em;
      width: 1em;
    }
    .piece,
    .empty,
    .chessBoard td {
      width: var(--chess-board-cell-size, 50px);
      height: var(--chess-board-cell-size, 50px);
    }
    .frame.bottom,
    .frame.top {
      width: var(--chess-board-cell-size, 50px);
    }
    .frame.left,
    .frame.right {
      height: var(--chess-board-cell-size, 50px);
    }
    .frame.corner {
      height: 1em;
      width: 1em;
    }
  </style>
  <table class="boardFrame" cellpadding="0" cellspacing="0">
    <tr>
      <td class="frame left corner"></td>
      <td class="frame top">a</td>
      <td class="frame top">b</td>
      <td class="frame top">c</td>
      <td class="frame top">d</td>
      <td class="frame top">e</td>
      <td class="frame top">f</td>
      <td class="frame top">g</td>
      <td class="frame top">h</td>
      <td class="frame right corner"></td>
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
      <td class="frame left corner"></td>
      <td class="frame bottom">a</td>
      <td class="frame bottom">b</td>
      <td class="frame bottom">c</td>
      <td class="frame bottom">d</td>
      <td class="frame bottom">e</td>
      <td class="frame bottom">f</td>
      <td class="frame bottom">g</td>
      <td class="frame bottom">h</td>
      <td class="frame right corner"></td>
    </tr>
  </table>
`;

window.customElements.define("chess-board", ChessBoard);
