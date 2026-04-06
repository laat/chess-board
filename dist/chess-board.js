const C = { 1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1, 8: 0 }, k = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };
function c(l) {
  const [t, e] = l;
  return [k[t], C[e]];
}
function L() {
  const l = [];
  for (let t = 0; t < 8; t++)
    l[t] = [];
  return l;
}
class d {
  constructor(t) {
    this.board = L(), this.fen = t;
  }
  /**
   * Gets the piece at a square
   *
   * @param {string} square - The square. Eg: "a2"
   * @return {string} piece - the ascii representation of a piece. Eg: "K"
   */
  piece(t) {
    const [e, s] = c(t);
    return this._getPiece(e, s);
  }
  /**
   * Places a piece in the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   * @param {string} piece - the ascii representation of a piece. Eg: "K"
   */
  put(t, e) {
    const [s, o] = c(t);
    this._setPiece(s, o, e);
  }
  /**
   * Removes the piece at the given square.
   *
   * @param {string} square - The square. Eg: "a2"
   */
  clear(t) {
    this.put(t, "");
  }
  /**
   * Moves a piece.
   *
   * @param {string} from - The square to move from. Eg: "a2"
   * @param {string} to - The square to move to. Eg: "a3"
   */
  move(t, e) {
    const s = this.piece(t);
    if (!s)
      throw new Error("Move Error: the from square was empty");
    this.put(e, s), this.clear(t);
  }
  /**
   * Set the current position.
   *
   * @param {string} fen - a position string as FEN
   */
  set fen(t) {
    if (this.board.forEach((n) => {
      n.length = 0;
    }), !t) return;
    t === "start" && (t = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
    let e = 0, s = 0, o = 0, r, i;
    for (; o < t.length && (r = t[o], r !== " "); ) {
      if (r === "/") {
        e++, s = 0, o++;
        continue;
      }
      if (isNaN(parseInt(r, 10)))
        this._setPiece(s, e, r), s++;
      else {
        i = parseInt(r, 10);
        for (let n = 0; n < i; n++)
          this._setPiece(s, e, ""), s++;
      }
      o++;
    }
  }
  /**
   * Get the current position as FEN.
   */
  get fen() {
    const t = [];
    for (let e = 0; e < 8; e++) {
      let s = 0;
      for (let o = 0; o < 8; o++) {
        const r = this._getPiece(o, e);
        r ? (s > 0 && (t.push(s), s = 0), t.push(r)) : s++;
      }
      s > 0 && t.push(s), t.push("/");
    }
    return t.pop(), t.join("");
  }
  _setPiece(t, e, s) {
    this.board[e][t] = s;
  }
  _getPiece(t, e) {
    return this.board[e][t] ?? "";
  }
}
const g = ["a", "b", "c", "d", "e", "f", "g", "h"], m = ["8", "7", "6", "5", "4", "3", "2", "1"], f = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
  P: "♙",
  k: "♚",
  q: "♛",
  r: "♜",
  b: "♝",
  n: "♞",
  p: "♟"
}, p = {
  P: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z" style="fill:#fff;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:miter"/></svg>',
  N: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:none;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" style="fill:#fff"/><path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" style="fill:#fff"/><circle cx="9" cy="25.5" r="0.5" style="fill:#000"/><ellipse cx="14.5" cy="15.5" rx="0.5" ry="1.5" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" style="fill:#000"/></g></svg>',
  B: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:none;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><g style="fill:#fff;stroke-linecap:butt"><path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"/><path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/><circle cx="22.5" cy="8" r="2.5"/></g><path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" style="fill:none;stroke:#000;stroke-linejoin:miter"/></g></svg>',
  R: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:#fff;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z" style="stroke-linecap:butt"/><path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z" style="stroke-linecap:butt"/><path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14" style="stroke-linecap:butt"/><path d="M 34,14 L 31,17 L 14,17 L 11,14"/><path d="M 31,17 L 31,29.5 L 14,29.5 L 14,17" style="stroke-linecap:butt;stroke-linejoin:miter"/><path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5"/><path d="M 11,14 L 34,14" style="fill:none;stroke:#000;stroke-linejoin:miter"/></g></svg>',
  Q: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:#fff;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><path d="M 9 13 A 2 2 0 1 1 5,13 A 2 2 0 1 1 9 13 z" transform="translate(-1,-1)"/><path d="M 9 13 A 2 2 0 1 1 5,13 A 2 2 0 1 1 9 13 z" transform="translate(15.5,-5.5)"/><path d="M 9 13 A 2 2 0 1 1 5,13 A 2 2 0 1 1 9 13 z" transform="translate(32,-1)"/><path d="M 9 13 A 2 2 0 1 1 5,13 A 2 2 0 1 1 9 13 z" transform="translate(7,-4.5)"/><path d="M 9 13 A 2 2 0 1 1 5,13 A 2 2 0 1 1 9 13 z" transform="translate(24,-4)"/><path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z" style="stroke-linecap:butt"/><path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z" style="stroke-linecap:butt"/><path d="M 11.5,30 C 15,29 30,29 33.5,30" style="fill:none"/><path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style="fill:none"/></g></svg>',
  K: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:none;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><path d="M 22.5,11.63 L 22.5,6" style="stroke-linejoin:miter"/><path d="M 20,8 L 25,8" style="stroke-linejoin:miter"/><path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" style="fill:#fff;stroke-linecap:butt;stroke-linejoin:miter"/><path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z" style="fill:#fff;stroke:#000"/><path d="M 11.5,30 C 17,27 27,27 32.5,30" style="fill:none"/><path d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5" style="fill:none"/><path d="M 11.5,37 C 17,34 27,34 32.5,37" style="fill:none"/></g></svg>',
  p: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><path d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z" style="fill:#000;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:miter"/></svg>',
  n: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:none;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" style="fill:#000"/><path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" style="fill:#000"/><circle cx="9" cy="25.5" r="0.5" style="fill:#fff;stroke:#fff"/><ellipse cx="14.5" cy="15.5" rx="0.5" ry="1.5" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" style="fill:#fff;stroke:#fff"/><path d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z" style="fill:#fff;stroke:none"/></g></svg>',
  b: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:none;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><g style="fill:#000;stroke-linecap:butt"><path d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"/><path d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"/><circle cx="22.5" cy="8" r="2.5"/></g><path d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18" style="fill:none;stroke:#fff;stroke-linejoin:miter"/></g></svg>',
  r: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:#000;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><path d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z" style="stroke-linecap:butt"/><path d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z" style="stroke-linecap:butt"/><path d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z" style="stroke-linecap:butt"/><path d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z" style="stroke-linecap:butt;stroke-linejoin:miter"/><path d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z" style="stroke-linecap:butt"/><path d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z" style="stroke-linecap:butt"/><path d="M 12,35.5 L 33,35.5" style="fill:none;stroke:#fff;stroke-width:1;stroke-linejoin:miter"/><path d="M 13,31.5 L 32,31.5" style="fill:none;stroke:#fff;stroke-width:1;stroke-linejoin:miter"/><path d="M 14,29.5 L 31,29.5" style="fill:none;stroke:#fff;stroke-width:1;stroke-linejoin:miter"/><path d="M 14,16.5 L 31,16.5" style="fill:none;stroke:#fff;stroke-width:1;stroke-linejoin:miter"/><path d="M 11,14 L 34,14" style="fill:none;stroke:#fff;stroke-width:1;stroke-linejoin:miter"/></g></svg>',
  q: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:#000;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><g style="fill:#000;stroke:none"><circle cx="6" cy="12" r="2.75"/><circle cx="14" cy="9" r="2.75"/><circle cx="22.5" cy="8" r="2.75"/><circle cx="31" cy="9" r="2.75"/><circle cx="39" cy="12" r="2.75"/></g><path d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z" style="stroke-linecap:butt"/><path d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z" style="stroke-linecap:butt"/><path d="M 11,38.5 A 35,35 1 0 0 34,38.5" style="fill:none;stroke-linecap:butt"/><path d="M 11,29 A 35,35 1 0 1 34,29" style="fill:none;stroke:#fff"/><path d="M 12.5,31.5 L 32.5,31.5" style="fill:none;stroke:#fff"/><path d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5" style="fill:none;stroke:#fff"/><path d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5" style="fill:none;stroke:#fff"/></g></svg>',
  k: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45" class="piece"><g style="fill:none;stroke:#000;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round"><path d="M 22.5,11.63 L 22.5,6" style="stroke-linejoin:miter"/><path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" style="fill:#000;stroke-linecap:butt;stroke-linejoin:miter"/><path d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z" style="fill:#000;stroke:#000"/><path d="M 20,8 L 25,8" style="stroke-linejoin:miter"/><path d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85" style="fill:none;stroke:#fff"/><path d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37" style="fill:none;stroke:#fff"/></g></svg>'
}, u = `
:host {
  display: inline-block;
}
.frame { display: none; }
:host([frame]) .frame {
  width: 1em; height: 1em;
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
:host([reverse]) .board-frame {
  transform: rotate(180deg);
}
:host([reverse]) .frame {
  transform: rotate(180deg);
}
.chess-board {
  border: 1px solid black;
  border-collapse: collapse;
}
.light { background: #FFCE9E; }
.dark  { background: #D18B47; }
td {
  width: 1em; height: 1em;
  text-align: center;
  padding: 0;
}
.piece, .empty {
  width: 1em; height: 1em;
  display: block;
}
:host([unicode]) .piece {
  line-height: 1em;
  font-family: "Arial Unicode MS", sans-serif;
}
:host([reverse]) .piece {
  transform: rotate(180deg);
}
`;
function w() {
  const l = g, t = m;
  let e = `<style>${u}</style>`;
  e += '<table class="board-frame" cellpadding="0" cellspacing="0">', e += '<tr><td class="frame top left"></td>';
  for (const s of l) e += `<td class="frame top">${s}</td>`;
  e += '<td class="frame top right"></td></tr>';
  for (let s = 0; s < 8; s++) {
    const o = t[s];
    if (e += "<tr>", e += `<td class="frame left">${o}</td>`, s === 0) {
      e += '<td colspan="8" rowspan="8" class="board-wrap">', e += '<table class="chess-board" cellpadding="0" cellspacing="0">';
      for (let r = 0; r < 8; r++) {
        e += "<tr>";
        for (let i = 0; i < 8; i++) {
          const n = (r + i) % 2 === 0, a = l[i] + t[r];
          e += `<td class="${a} ${n ? "light" : "dark"}"><span class="empty" data-piece=""></span></td>`;
        }
        e += "</tr>";
      }
      e += "</table></td>";
    }
    e += `<td class="frame right">${o}</td>`, e += "</tr>";
  }
  e += '<tr><td class="frame bottom left"></td>';
  for (const s of l) e += `<td class="frame bottom">${s}</td>`;
  return e += '<td class="frame bottom right"></td></tr>', e += "</table>", e;
}
function y(l, t) {
  if (t && l in f) {
    const s = document.createElement("span");
    return s.className = "piece", s.setAttribute("data-piece", l), s.textContent = f[l], s;
  }
  if (l in p) {
    const s = document.createElement("span");
    s.innerHTML = p[l];
    const o = s.firstElementChild;
    return o.setAttribute("data-piece", l), o;
  }
  const e = document.createElement("span");
  return e.className = "empty", e.setAttribute("data-piece", ""), e;
}
class b extends HTMLElement {
  constructor() {
    super(), this._observer = null, this._board = new d();
  }
  static get observedAttributes() {
    return ["unicode"];
  }
  connectedCallback() {
    var s;
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = w(), this._table = t.querySelector(".chess-board");
    const e = (s = this.textContent) == null ? void 0 : s.trim();
    e && (this._board.fen = e), this._renderBoard(), this._observer = new MutationObserver(() => {
      var r;
      const o = (r = this.textContent) == null ? void 0 : r.trim();
      o && (this._board.fen = o, this._renderBoard());
    }), this._observer.observe(this, { subtree: !0, characterData: !0 });
  }
  disconnectedCallback() {
    var t;
    (t = this._observer) == null || t.disconnect(), this._observer = null;
  }
  attributeChangedCallback(t, e, s) {
    t === "unicode" && this._table && this._renderBoard();
  }
  get fen() {
    return this._board.fen;
  }
  set fen(t) {
    this._board.fen = t, this._renderBoard();
  }
  piece(t) {
    return this._board.piece(t);
  }
  put(t, e) {
    this._board.put(t, e), this._renderBoard();
  }
  clear(t) {
    this._board.clear(t), this._renderBoard();
  }
  move(t, e) {
    this._board.move(t, e), this._renderBoard();
  }
  clearBoard() {
    this._board = new d(), this._renderBoard();
  }
  _renderBoard() {
    if (!this._table) return;
    const t = this._board.board, e = this.hasAttribute("unicode");
    for (let s = 0; s < 8; s++) {
      const o = this._table.rows[s];
      for (let r = 0; r < 8; r++) {
        const i = o.cells[r], n = t[s][r], a = i.firstElementChild, h = (a == null ? void 0 : a.getAttribute("data-piece")) ?? null;
        n !== h && (i.innerHTML = "", i.appendChild(y(n, e)));
      }
    }
  }
}
customElements.define("chess-board", b);
export {
  b as ChessBoardElement
};
