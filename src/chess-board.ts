import "core-js/modules/es.object.from-entries";

import FENBoard, { BoardPiece, Piece } from "./fen-chess-board";
import { getPieceClone } from "./templates";
import { getSquare } from "./chess-utils";
import { ChessArrow } from "./chess-arrow";

const nextId = (() => {
  let id = 0;
  return () => ++id;
})();
const throttle = (func: Function, limit: number) => {
  let lastFunc: any;
  let lastRan: any;
  return function() {
    const args = arguments;
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if (Date.now() - lastRan >= limit) {
          func.apply(null, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

const html = String.raw;
class ChessBoard extends HTMLElement {
  static observedAttributes = ["fen"];
  private asciiBoard: FENBoard;
  private cellBoard: HTMLElement[][] = [];
  private svg: SVGSVGElement;
  private svgDefs: SVGDefsElement;
  private arrowSlots: HTMLSlotElement;
  constructor() {
    super();
    let shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.asciiBoard = new FENBoard();

    // find square elements only once
    for (let i = 0; i < 8; i++) {
      this.cellBoard[i] = [];
      for (let j = 0; j < 8; j++) {
        const className = `.${getSquare(j, i)}`;
        const el = shadowRoot.querySelector(className) as HTMLElement;
        this.cellBoard[i][j] = el;
      }
    }
    this.svg = shadowRoot.querySelector("svg")! as SVGSVGElement;
    this.svgDefs = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "defs"
    );
    this.svg.appendChild(this.svgDefs);

    this.arrowSlots = this.shadowRoot?.querySelector("slot")!;
    this.arrowSlots.addEventListener("slotchange", this.updateArrows);
  }
  connectedCallback() {
    this.upgradeProperty("fen");
    this.renderBoard();
    this.updateArrows();

    // backcompat: not needed when slotchange works.
    Promise.all([customElements.whenDefined("chess-arrow")]).then(
      this.updateArrows
    );
  }
  updateArrows = throttle(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        while (this.svg.firstChild) {
          this.svg.removeChild(this.svg.firstChild);
        }
        this.svgDefs = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        );
        this.svg.appendChild(this.svgDefs);
        const arrows = Array.from<ChessArrow>(
          this.querySelectorAll("chess-arrow")
        );
        arrows.forEach(this.drawArrow);
      });
    });
  }, 300);

  drawArrow = (arrow: ChessArrow) => {
    const from = arrow.from!;
    const to = arrow.to!;
    const color = arrow.color || "green";
    const opacity = arrow.opacity || "1";
    const width = arrow.width || "10";
    const fromEl = this.shadowRoot?.querySelector(`.${from}`);
    const toEl = this.shadowRoot?.querySelector(`.${to}`);
    if (!fromEl) {
      throw new Error(`from is not a valid square: ${from}`);
    }
    if (!toEl) {
      throw new Error(`to is not a valid square: ${to}`);
    }
    const marker = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "marker"
    );
    marker.id = `chess-board-marker-${nextId()}`;
    marker.setAttribute("orient", "auto");
    marker.setAttribute("markerHeight", "8");
    marker.setAttribute("markerWidth", "4");
    marker.setAttribute("refX", "2.05");
    marker.setAttribute("refY", "2.01");

    const markerPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    markerPath.setAttribute("d", "M0,0 V4 L3,2 Z");
    markerPath.setAttribute("fill", color);
    marker.appendChild(markerPath);
    this.svgDefs.appendChild(marker);

    const thisRect = this.getBoundingClientRect();
    const foo = (r: DOMRect) => [
      r.x - thisRect.x + r.width / 2,
      r.y - thisRect.y + r.height / 2
    ];
    const [fromX, fromY] = foo(fromEl.getBoundingClientRect());
    const [toX, toY] = foo(toEl.getBoundingClientRect());
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("stroke-width", width);
    line.setAttribute("stroke-linecap", "round");
    line.setAttribute("stroke", color);
    line.setAttribute("opacity", opacity);
    line.setAttribute("x1", String(fromX));
    line.setAttribute("y1", String(fromY));
    line.setAttribute("x2", String(toX));
    line.setAttribute("y2", String(toY));
    line.setAttribute("marker-end", `url(#${marker.id})`);

    this.svg.appendChild(line);
  };

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
    const currentPiece = cell.querySelector("[ascii]");
    const currentAscii = currentPiece?.getAttribute("ascii");

    // simple diff
    if (asciiChar !== currentAscii) {
      if (currentPiece) {
        cell.removeChild(currentPiece);
      }
      const piece = getPieceClone(asciiChar);
      if (piece) {
        cell.insertAdjacentElement("beforeend", piece);
      }
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
      position: relative;
      display: inline-grid;
      grid-template-columns: repeat(8, 1fr);
      grid-template-rows: repeat(8, 1fr);
      height: 25rem;
      width: 25rem;
    }
    .light {
      background: #ffce9e;
    }
    .dark {
      background: #d18b47;
    }
    .cell {
      position: relative;
    }

    .lines,
    .lines > *,
    .piece,
    ::slotted(*) {
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

    :host([frame*="right"]:not([reverse])),
    :host([frame*="left"]) {
      grid-template-columns: repeat(8, 1fr) 1fr;
    }
    :host([frame*="left"]:not([reverse])),
    :host([frame*="right"]) {
      grid-template-columns: 1fr repeat(8, 1fr);
    }
    :host([frame*="top"]:not([reverse])),
    :host([frame*="bottom"]) {
      grid-template-rows: 1fr repeat(8, 1fr);
    }
    :host([frame*="bottom"]:not([reverse])),
    :host([frame*="top"]) {
      grid-template-rows: repeat(8, 1fr) 1fr;
    }

    :host([frame="all"]),
    :host([frame*="right"][frame*="left"]) {
      grid-template-columns: 1fr repeat(8, 1fr) 1fr;
    }
    :host([frame="all"]),
    :host([frame*="bottom"][frame*="top"]) {
      grid-template-rows: 1fr repeat(8, 1fr) 1fr;
    }
    .frame {
      display: none;
    }
    :host([frame="all"]) .frame.right,
    :host([frame*="right"]:not([reverse])) .frame.right,
    :host([frame*="right"][reverse]) .frame.left,
    :host([frame*="left"][reverse]) .frame.right,
    :host([frame="all"]) .frame.left,
    :host([frame*="left"]:not([reverse])) .frame.left,
    :host([frame="all"]) .frame.bottom,
    :host([frame*="bottom"][reverse]) .frame.top,
    :host([frame*="bottom"]:not([reverse])) .frame.bottom,
    :host([frame="all"]) .frame.top,
    :host([frame*="top"][reverse]) .frame.bottom,
    :host([frame*="top"]:not([reverse])) .frame.top {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :host([frame="all"]) .frame.corner,
    :host([frame*="top"][frame*="right"][reverse]) .frame.bl.corner,
    :host([frame*="top"][frame*="right"]:not([reverse])) .frame.tr.corner,
    :host([frame*="top"][frame*="left"]:not([reverse])) .frame.tl.corner,
    :host([frame*="top"][frame*="left"][reverse]) .frame.bb.corner,
    :host([frame*="bottom"][frame*="right"]:not([reverse])) .frame.br.corner,
    :host([frame*="bottom"][frame*="right"][reverse]) .frame.tl.corner,
    :host([frame*="bottom"][frame*="left"]:not([reverse])) .frame.bl.corner,
    :host([frame*="bottom"][frame*="left"][reverse]) .frame.tr.corner {
      display: block;
    }
    :host([reverse]),
    :host([reverse]) ::slotted(*),
    :host([reverse]) .frame,
    :host([reverse]) .piece {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
  </style>
  <slot></slot>
  <div class="frame tl corner"></div>
  <div class="frame top">a</div>
  <div class="frame top">b</div>
  <div class="frame top">c</div>
  <div class="frame top">d</div>
  <div class="frame top">e</div>
  <div class="frame top">f</div>
  <div class="frame top">g</div>
  <div class="frame top">h</div>
  <div class="frame tr corner"></div>
  <div class="frame left">8</div>
  <div class="cell a8 light"><slot name="a8"></slot></div>
  <div class="cell b8 dark"><slot name="b8"></slot></div>
  <div class="cell c8 light"><slot name="c8"></slot></div>
  <div class="cell d8 dark"><slot name="d8"></slot></div>
  <div class="cell e8 light"><slot name="e8"></slot></div>
  <div class="cell f8 dark"><slot name="f8"></slot></div>
  <div class="cell g8 light"><slot name="g8"></slot></div>
  <div class="cell h8 dark"><slot name="h8"></slot></div>
  <div class="frame right">8</div>
  <div class="frame left">7</div>
  <div class="cell a7 dark"><slot name="a7"></slot></div>
  <div class="cell b7 light"><slot name="b7"></slot></div>
  <div class="cell c7 dark"><slot name="c7"></slot></div>
  <div class="cell d7 light"><slot name="d7"></slot></div>
  <div class="cell e7 dark"><slot name="e7"></slot></div>
  <div class="cell f7 light"><slot name="f7"></slot></div>
  <div class="cell g7 dark"><slot name="g7"></slot></div>
  <div class="cell h7 light"><slot name="h7"></slot></div>
  <div class="frame right">7</div>
  <div class="frame left">6</div>
  <div class="cell a6 light"><slot name="a6"></slot></div>
  <div class="cell b6 dark"><slot name="b6"></slot></div>
  <div class="cell c6 light"><slot name="c6"></slot></div>
  <div class="cell d6 dark"><slot name="d6"></slot></div>
  <div class="cell e6 light"><slot name="e6"></slot></div>
  <div class="cell f6 dark"><slot name="f6"></slot></div>
  <div class="cell g6 light"><slot name="g6"></slot></div>
  <div class="cell h6 dark"><slot name="h6"></slot></div>
  <div class="frame right">6</div>
  <div class="frame left">5</div>
  <div class="cell a5 dark"><slot name="a5"></slot></div>
  <div class="cell b5 light"><slot name="b5"></slot></div>
  <div class="cell c5 dark"><slot name="c5"></slot></div>
  <div class="cell d5 light"><slot name="d5"></slot></div>
  <div class="cell e5 dark"><slot name="e5"></slot></div>
  <div class="cell f5 light"><slot name="f5"></slot></div>
  <div class="cell g5 dark"><slot name="g5"></slot></div>
  <div class="cell h5 light"><slot name="h5"></slot></div>
  <div class="frame right">5</div>
  <div class="frame left">4</div>
  <div class="cell a4 light"><slot name="a4"></slot></div>
  <div class="cell b4 dark"><slot name="b4"></slot></div>
  <div class="cell c4 light"><slot name="c4"></slot></div>
  <div class="cell d4 dark"><slot name="d4"></slot></div>
  <div class="cell e4 light"><slot name="e4"></slot></div>
  <div class="cell f4 dark"><slot name="f4"></slot></div>
  <div class="cell g4 light"><slot name="g4"></slot></div>
  <div class="cell h4 dark"><slot name="h4"></slot></div>
  <div class="frame right">4</div>
  <div class="frame left">3</div>
  <div class="cell a3 dark"><slot name="a3"></slot></div>
  <div class="cell b3 light"><slot name="b3"></slot></div>
  <div class="cell c3 dark"><slot name="c3"></slot></div>
  <div class="cell d3 light"><slot name="d3"></slot></div>
  <div class="cell e3 dark"><slot name="e3"></slot></div>
  <div class="cell f3 light"><slot name="f3"></slot></div>
  <div class="cell g3 dark"><slot name="g3"></slot></div>
  <div class="cell h3 light"><slot name="h3"></slot></div>
  <div class="frame right">3</div>
  <div class="frame left">2</div>
  <div class="cell a2 light"><slot name="a2"></slot></div>
  <div class="cell b2 dark"><slot name="b2"></slot></div>
  <div class="cell c2 light"><slot name="c2"></slot></div>
  <div class="cell d2 dark"><slot name="d2"></slot></div>
  <div class="cell e2 light"><slot name="e2"></slot></div>
  <div class="cell f2 dark"><slot name="f2"></slot></div>
  <div class="cell g2 light"><slot name="g2"></slot></div>
  <div class="cell h2 dark"><slot name="h2"></slot></div>
  <div class="frame right">2</div>
  <div class="frame left">1</div>
  <div class="cell a1 dark"><slot name="a1"></slot></div>
  <div class="cell b1 light"><slot name="b1"></slot></div>
  <div class="cell c1 dark"><slot name="c1"></slot></div>
  <div class="cell d1 light"><slot name="d1"></slot></div>
  <div class="cell e1 dark"><slot name="e1"></slot></div>
  <div class="cell f1 light"><slot name="f1"></slot></div>
  <div class="cell g1 dark"><slot name="g1"></slot></div>
  <div class="cell h1 light"><slot name="h1"></slot></div>
  <div class="frame right">1</div>
  <div class="frame bl corner"></div>
  <div class="frame bottom">a</div>
  <div class="frame bottom">b</div>
  <div class="frame bottom">c</div>
  <div class="frame bottom">d</div>
  <div class="frame bottom">e</div>
  <div class="frame bottom">f</div>
  <div class="frame bottom">g</div>
  <div class="frame bottom">h</div>
  <div class="frame br corner"></div>
  <svg class="lines"></svg>
`;
window.customElements.define("chess-board", ChessBoard);
