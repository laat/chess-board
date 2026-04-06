import { describe, it, expect, beforeEach } from "vitest";
import "./chess-board";
import type { ChessBoardElement } from "./chess-board";

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

function createElement(
  fen?: string,
  attrs?: Record<string, string>,
): ChessBoardElement {
  const el = document.createElement("chess-board") as ChessBoardElement;
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      el.setAttribute(k, v);
    }
  }
  if (fen) {
    el.textContent = fen;
  }
  document.body.appendChild(el);
  return el;
}

function getPieceAt(
  el: ChessBoardElement,
  row: number,
  col: number,
): string | null {
  const table = el.shadowRoot!.querySelector(
    ".chess-board",
  ) as HTMLTableElement;
  const cell = table.rows[row].cells[col];
  return cell.firstElementChild?.getAttribute("data-piece") ?? null;
}

describe("chess-board", () => {
  beforeEach(() => {
    // Remove elements explicitly to trigger disconnectedCallback
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
  });

  describe("initialization", () => {
    it("registers as a custom element", () => {
      const el = createElement();
      expect(el).toBeInstanceOf(HTMLElement);
      expect(el.shadowRoot).not.toBeNull();
    });

    it("initializes with FEN from textContent", () => {
      const el = createElement(START_FEN);
      expect(el.fen).toBe(START_FEN);
    });

    it("initializes empty when no FEN provided", () => {
      const el = createElement();
      expect(el.fen).toBe("8/8/8/8/8/8/8/8");
    });

    it("creates an 8x8 board table in shadow DOM", () => {
      const el = createElement(START_FEN);
      const table = el.shadowRoot!.querySelector(
        ".chess-board",
      ) as HTMLTableElement;
      expect(table).not.toBeNull();
      expect(table.rows.length).toBe(8);
      for (let r = 0; r < 8; r++) {
        expect(table.rows[r].cells.length).toBe(8);
      }
    });
  });

  describe("rendering", () => {
    it("renders starting position pieces correctly", () => {
      const el = createElement(START_FEN);
      // Row 0 = rank 8: r n b q k b n r
      expect(getPieceAt(el, 0, 0)).toBe("r");
      expect(getPieceAt(el, 0, 1)).toBe("n");
      expect(getPieceAt(el, 0, 2)).toBe("b");
      expect(getPieceAt(el, 0, 3)).toBe("q");
      expect(getPieceAt(el, 0, 4)).toBe("k");
      // Row 1 = rank 7: all black pawns
      for (let f = 0; f < 8; f++) {
        expect(getPieceAt(el, 1, f)).toBe("p");
      }
      // Row 6 = rank 2: all white pawns
      for (let f = 0; f < 8; f++) {
        expect(getPieceAt(el, 6, f)).toBe("P");
      }
      // Row 7 = rank 1: R N B Q K B N R
      expect(getPieceAt(el, 7, 0)).toBe("R");
      expect(getPieceAt(el, 7, 4)).toBe("K");
    });

    it("renders empty squares with empty data-piece", () => {
      const el = createElement(START_FEN);
      // Row 3 = rank 5: all empty
      for (let f = 0; f < 8; f++) {
        expect(getPieceAt(el, 3, f)).toBe("");
      }
    });

    it("renders SVG pieces by default", () => {
      const el = createElement(START_FEN);
      const table = el.shadowRoot!.querySelector(
        ".chess-board",
      ) as HTMLTableElement;
      const cell = table.rows[0].cells[0];
      expect(cell.querySelector("svg")).not.toBeNull();
    });

    it("renders unicode pieces when unicode attribute is set", () => {
      const el = createElement(START_FEN, { unicode: "" });
      const table = el.shadowRoot!.querySelector(
        ".chess-board",
      ) as HTMLTableElement;
      const cell = table.rows[0].cells[0];
      const span = cell.querySelector("span.piece");
      expect(span).not.toBeNull();
      expect(span!.textContent).toBe("\u265C"); // ♜ black rook
    });
  });

  describe("fen property", () => {
    it("gets current position", () => {
      const el = createElement(START_FEN);
      expect(el.fen).toBe(START_FEN);
    });

    it("sets a new position and re-renders", () => {
      const el = createElement(START_FEN);
      const scholarsMate =
        "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR";
      el.fen = scholarsMate;
      expect(el.fen).toBe(scholarsMate);
      // White queen on f7 (row 1, col 5)
      expect(getPieceAt(el, 1, 5)).toBe("Q");
    });
  });

  describe("piece()", () => {
    it("returns piece at a given square", () => {
      const el = createElement(START_FEN);
      expect(el.piece("a1")).toBe("R");
      expect(el.piece("e8")).toBe("k");
      expect(el.piece("d2")).toBe("P");
      expect(el.piece("e4")).toBe("");
    });
  });

  describe("put()", () => {
    it("places a piece on a square", () => {
      const el = createElement();
      el.put("e4", "N");
      expect(el.piece("e4")).toBe("N");
      // row 4 (rank 4 = index 4), col 4 (file e = index 4)
      expect(getPieceAt(el, 4, 4)).toBe("N");
    });
  });

  describe("clear()", () => {
    it("removes a piece from a square", () => {
      const el = createElement(START_FEN);
      expect(el.piece("a1")).toBe("R");
      el.clear("a1");
      expect(el.piece("a1")).toBe("");
      expect(getPieceAt(el, 7, 0)).toBe("");
    });
  });

  describe("move()", () => {
    it("moves a piece from one square to another", () => {
      const el = createElement(START_FEN);
      el.move("e2", "e4");
      expect(el.piece("e2")).toBe("");
      expect(el.piece("e4")).toBe("P");
      expect(getPieceAt(el, 4, 4)).toBe("P");
      expect(getPieceAt(el, 6, 4)).toBe("");
    });

    it("throws when moving from an empty square", () => {
      const el = createElement(START_FEN);
      expect(() => el.move("e4", "e5")).toThrow();
    });
  });

  describe("clearBoard()", () => {
    it("removes all pieces", () => {
      const el = createElement(START_FEN);
      el.clearBoard();
      expect(el.fen).toBe("8/8/8/8/8/8/8/8");
      for (let r = 0; r < 8; r++) {
        for (let f = 0; f < 8; f++) {
          expect(getPieceAt(el, r, f)).toBe("");
        }
      }
    });
  });

  describe("attributes", () => {
    it("re-renders when unicode attribute is toggled", () => {
      const el = createElement(START_FEN);
      const table = el.shadowRoot!.querySelector(
        ".chess-board",
      ) as HTMLTableElement;
      // Default: SVG
      expect(table.rows[0].cells[0].querySelector("svg")).not.toBeNull();

      el.setAttribute("unicode", "");
      // Trigger re-render (attributeChangedCallback handles this in browsers;
      // force it here since happy-dom may not fire it reliably)
      el.fen = el.fen;
      const cell = table.rows[0].cells[0];
      const piece = cell.querySelector("[data-piece]");
      expect(piece).not.toBeNull();
      expect(piece!.getAttribute("data-piece")).toBe("r");
      // Should no longer be SVG
      expect(cell.querySelector("svg")).toBeNull();
    });

    it("has frame labels in shadow DOM", () => {
      const el = createElement(START_FEN, { frame: "" });
      const frames = el.shadowRoot!.querySelectorAll(".frame");
      expect(frames.length).toBeGreaterThan(0);
    });
  });

  describe("square colors", () => {
    it("assigns correct light/dark classes", () => {
      const el = createElement(START_FEN);
      const table = el.shadowRoot!.querySelector(
        ".chess-board",
      ) as HTMLTableElement;
      // a8 (0,0) should be light
      expect(table.rows[0].cells[0].classList.contains("light")).toBe(true);
      // b8 (0,1) should be dark
      expect(table.rows[0].cells[1].classList.contains("dark")).toBe(true);
      // a7 (1,0) should be dark
      expect(table.rows[1].cells[0].classList.contains("dark")).toBe(true);
    });
  });

  describe("diffing", () => {
    it("only updates changed cells", () => {
      const el = createElement(START_FEN);
      const table = el.shadowRoot!.querySelector(
        ".chess-board",
      ) as HTMLTableElement;
      // Grab a reference to an element that shouldn't change
      const a8piece = table.rows[0].cells[0].firstElementChild;
      el.move("e2", "e4");
      // a8 rook should be the same DOM node (not replaced)
      expect(table.rows[0].cells[0].firstElementChild).toBe(a8piece);
    });
  });
});
