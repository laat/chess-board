import FENBoard, { BoardPiece, Piece } from "./fen-chess-board";
import { getPieceClone } from "./templates";
import { getSquare } from "./chess-utils";

const html = String.raw;
class ChessBoard extends HTMLElement {
  static observedAttributes = ["fen"];
  private asciiBoard: FENBoard;
  private cellBoard: HTMLElement[][] = [];
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.asciiBoard = new FENBoard();

    // find square elements once
    for (let i = 0; i < 8; i++) {
      this.cellBoard[i] = [];
      for (let j = 0; j < 8; j++) {
        this.cellBoard[i][j] = shadowRoot.querySelector(
          `.${getSquare(j, i)}`
        )! as HTMLElement;
      }
    }
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
    for (let i = 0; i < ascii.length; i++) {
      for (let j = 0; j < ascii.length; j++) {
        const asciiChar = ascii[i][j];
        this.updateCell(this.cellBoard[i][j], asciiChar);
      }
    }
  }
  private updateCell(cell: HTMLElement, asciiChar: BoardPiece) {
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
const template = document.createElement("template");
template.innerHTML = html`
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
    .empty {
      padding-top: 100%;
    }
    .piece {
      display: block;
      height: 100%;
      width: 100%;
    }
    .cell {
      box-sizing: border-box;
      align-items: center;
      justify-content: center;
    }
    :host([frame="all"]) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    :host([frame*="left"]:not([reverse])),
    :host([frame*="right"][reverse]) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    :host([frame*="right"]:not([reverse])),
    :host([frame*="left"][reverse]) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    :host([frame*="right"][frame*="left"]) {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    :host([frame*="bottom"]:not([reverse])),
    :host([frame*="top"][reverse]) {
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    :host([frame*="top"]:not([reverse])),
    :host([frame*="bottom"][reverse]) {
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
    }
    :host([frame*="bottom"][frame*="top"]) {
      grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
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
  <div class="cell a8 light"><span class="empty"></span></div>
  <div class="cell b8 dark"><span class="empty"></span></div>
  <div class="cell c8 light"><span class="empty"></span></div>
  <div class="cell d8 dark"><span class="empty"></span></div>
  <div class="cell e8 light"><span class="empty"></span></div>
  <div class="cell f8 dark"><span class="empty"></span></div>
  <div class="cell g8 light"><span class="empty"></span></div>
  <div class="cell h8 dark"><span class="empty"></span></div>
  <div class="frame right">8</div>
  <div class="frame left">7</div>
  <div class="cell a7 dark"><span class="empty"></span></div>
  <div class="cell b7 light"><span class="empty"></span></div>
  <div class="cell c7 dark"><span class="empty"></span></div>
  <div class="cell d7 light"><span class="empty"></span></div>
  <div class="cell e7 dark"><span class="empty"></span></div>
  <div class="cell f7 light"><span class="empty"></span></div>
  <div class="cell g7 dark"><span class="empty"></span></div>
  <div class="cell h7 light"><span class="empty"></span></div>
  <div class="frame right">7</div>
  <div class="frame left">6</div>
  <div class="cell a6 light"><span class="empty"></span></div>
  <div class="cell b6 dark"><span class="empty"></span></div>
  <div class="cell c6 light"><span class="empty"></span></div>
  <div class="cell d6 dark"><span class="empty"></span></div>
  <div class="cell e6 light"><span class="empty"></span></div>
  <div class="cell f6 dark"><span class="empty"></span></div>
  <div class="cell g6 light"><span class="empty"></span></div>
  <div class="cell h6 dark"><span class="empty"></span></div>
  <div class="frame right">6</div>
  <div class="frame left">5</div>
  <div class="cell a5 dark"><span class="empty"></span></div>
  <div class="cell b5 light"><span class="empty"></span></div>
  <div class="cell c5 dark"><span class="empty"></span></div>
  <div class="cell d5 light"><span class="empty"></span></div>
  <div class="cell e5 dark"><span class="empty"></span></div>
  <div class="cell f5 light"><span class="empty"></span></div>
  <div class="cell g5 dark"><span class="empty"></span></div>
  <div class="cell h5 light"><span class="empty"></span></div>
  <div class="frame right">5</div>
  <div class="frame left">4</div>
  <div class="cell a4 light"><span class="empty"></span></div>
  <div class="cell b4 dark"><span class="empty"></span></div>
  <div class="cell c4 light"><span class="empty"></span></div>
  <div class="cell d4 dark"><span class="empty"></span></div>
  <div class="cell e4 light"><span class="empty"></span></div>
  <div class="cell f4 dark"><span class="empty"></span></div>
  <div class="cell g4 light"><span class="empty"></span></div>
  <div class="cell h4 dark"><span class="empty"></span></div>
  <div class="frame right">4</div>
  <div class="frame left">3</div>
  <div class="cell a3 dark"><span class="empty"></span></div>
  <div class="cell b3 light"><span class="empty"></span></div>
  <div class="cell c3 dark"><span class="empty"></span></div>
  <div class="cell d3 light"><span class="empty"></span></div>
  <div class="cell e3 dark"><span class="empty"></span></div>
  <div class="cell f3 light"><span class="empty"></span></div>
  <div class="cell g3 dark"><span class="empty"></span></div>
  <div class="cell h3 light"><span class="empty"></span></div>
  <div class="frame right">3</div>
  <div class="frame left">2</div>
  <div class="cell a2 light"><span class="empty"></span></div>
  <div class="cell b2 dark"><span class="empty"></span></div>
  <div class="cell c2 light"><span class="empty"></span></div>
  <div class="cell d2 dark"><span class="empty"></span></div>
  <div class="cell e2 light"><span class="empty"></span></div>
  <div class="cell f2 dark"><span class="empty"></span></div>
  <div class="cell g2 light"><span class="empty"></span></div>
  <div class="cell h2 dark"><span class="empty"></span></div>
  <div class="frame right">2</div>
  <div class="frame left">1</div>
  <div class="cell a1 dark"><span class="empty"></span></div>
  <div class="cell b1 light"><span class="empty"></span></div>
  <div class="cell c1 dark"></div>
  <div class="cell d1 light"><span class="empty"></span></div>
  <div class="cell e1 dark"><span class="empty"></span></div>
  <div class="cell f1 light"><span class="empty"></span></div>
  <div class="cell g1 dark"><span class="empty"></span></div>
  <div class="cell h1 light"><span class="empty"></span></div>
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
window.customElements.define("chess-board", ChessBoard);
