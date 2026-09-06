import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import "./chess-board";
import type { ChessBoardElement } from "./chess-board";

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const EMPTY_FEN = "8/8/8/8/8/8/8/8";
const SCHOLARS_MATE = "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR";
const INVALID_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR/extra";

function createElement(
  fen?: string,
  attrs?: Record<string, string>,
): ChessBoardElement {
  const el = document.createElement("chess-board");
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

function getTable(el: ChessBoardElement): HTMLTableElement {
  const table = el.shadowRoot?.querySelector(".chess-board");
  if (!(table instanceof HTMLTableElement)) {
    throw new Error("board table not found in shadow root");
  }
  return table;
}

function getCell(
  el: ChessBoardElement,
  row: number,
  col: number,
): HTMLTableCellElement {
  const cell = getTable(el).rows[row]?.cells[col];
  if (!cell) throw new Error(`no cell at ${row},${col}`);
  return cell;
}

function getPieceAt(
  el: ChessBoardElement,
  row: number,
  col: number,
): string | null {
  return getCell(el, row, col).firstElementChild?.getAttribute("data-piece") ??
    null;
}

/** Let pending MutationObserver callbacks run. */
function flushObservers(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
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
      expect(customElements.get("chess-board")).toBe(el.constructor);
      // Type-level assertion: HTMLElementTagNameMap augmentation should make
      // document.querySelector("chess-board") infer as ChessBoardElement | null.
      const typed: ChessBoardElement | null =
        document.querySelector("chess-board");
      expect(typed).toBe(el);
    });

    it("initializes with FEN from textContent", () => {
      const el = createElement(START_FEN);
      expect(el.fen).toBe(START_FEN);
    });

    it("initializes empty when no FEN provided", () => {
      const el = createElement();
      expect(el.fen).toBe(EMPTY_FEN);
    });

    it("creates an 8x8 board table in shadow DOM", () => {
      const table = getTable(createElement(START_FEN));
      expect(table.rows.length).toBe(8);
      for (const row of table.rows) {
        expect(row.cells.length).toBe(8);
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
      expect(getCell(el, 0, 0).querySelector("svg")).not.toBeNull();
    });

    it("gives every square its own SVG node", () => {
      const el = createElement(START_FEN);
      const a8 = getCell(el, 0, 0).firstElementChild;
      const h8 = getCell(el, 0, 7).firstElementChild;
      expect(a8?.getAttribute("data-piece")).toBe("r");
      expect(h8?.getAttribute("data-piece")).toBe("r");
      expect(a8).not.toBe(h8);
    });

    it("renders unicode pieces when unicode attribute is set", () => {
      const el = createElement(START_FEN, { unicode: "" });
      const span = getCell(el, 0, 0).querySelector("span.piece");
      expect(span).not.toBeNull();
      expect(span?.textContent).toBe("♜"); // ♜ black rook
    });
  });

  describe("fen property", () => {
    it("gets current position", () => {
      const el = createElement(START_FEN);
      expect(el.fen).toBe(START_FEN);
    });

    it("sets a new position and re-renders", () => {
      const el = createElement(START_FEN);
      el.fen = SCHOLARS_MATE;
      expect(el.fen).toBe(SCHOLARS_MATE);
      // White queen on f7 (row 1, col 5)
      expect(getPieceAt(el, 1, 5)).toBe("Q");
    });

    it("throws on malformed FEN and leaves the board unchanged", () => {
      const el = createElement(START_FEN);
      expect(() => {
        el.fen = INVALID_FEN;
      }).toThrow();
      expect(el.fen).toBe(START_FEN);
      expect(getPieceAt(el, 0, 0)).toBe("r");
    });
  });

  describe("text content", () => {
    let warn: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      warn.mockRestore();
    });

    it("follows changes to the text content", async () => {
      const el = createElement(START_FEN);
      el.textContent = SCHOLARS_MATE;
      await flushObservers();
      expect(el.fen).toBe(SCHOLARS_MATE);
      expect(getPieceAt(el, 1, 5)).toBe("Q");
    });

    it("ignores invalid initial FEN instead of throwing", () => {
      const el = createElement(INVALID_FEN);
      expect(el.fen).toBe(EMPTY_FEN);
      expect(getPieceAt(el, 0, 0)).toBe("");
      expect(warn).toHaveBeenCalledOnce();
    });

    it("keeps the current position when the text becomes invalid", async () => {
      const el = createElement(START_FEN);
      el.textContent = INVALID_FEN;
      await flushObservers();
      expect(el.fen).toBe(START_FEN);
      expect(getPieceAt(el, 0, 0)).toBe("r");
      expect(warn).toHaveBeenCalledOnce();
    });

    it("stops observing after being removed from the document", async () => {
      const el = createElement(START_FEN);
      document.body.removeChild(el);
      el.textContent = SCHOLARS_MATE;
      await flushObservers();
      expect(el.fen).toBe(START_FEN);
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
      expect(el.fen).toBe(EMPTY_FEN);
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
      // Default: SVG
      expect(getCell(el, 0, 0).querySelector("svg")).not.toBeNull();

      el.setAttribute("unicode", "");
      const cell = getCell(el, 0, 0);
      expect(cell.querySelector("svg")).toBeNull();
      expect(cell.querySelector("span.piece")?.getAttribute("data-piece")).toBe(
        "r",
      );

      el.removeAttribute("unicode");
      expect(getCell(el, 0, 0).querySelector("svg")).not.toBeNull();
    });

    it("has frame labels in shadow DOM", () => {
      const el = createElement(START_FEN, { frame: "" });
      const frames = el.shadowRoot?.querySelectorAll(".frame") ?? [];
      expect(frames.length).toBeGreaterThan(0);
    });
  });

  describe("accessibility", () => {
    const START_LABEL =
      "Chess position. " +
      "White: king e1, queen d1, rooks a1 and h1, bishops c1 and f1, " +
      "knights b1 and g1, pawns a2, b2, c2, d2, e2, f2, g2 and h2. " +
      "Black: king e8, queen d8, rooks a8 and h8, bishops c8 and f8, " +
      "knights b8 and g8, pawns a7, b7, c7, d7, e7, f7, g7 and h7.";

    it("exposes the board as an image described by the position", () => {
      const el = createElement(START_FEN);
      expect(el.getAttribute("role")).toBe("img");
      expect(el.getAttribute("aria-label")).toBe(START_LABEL);
    });

    it("describes an empty board", () => {
      const el = createElement();
      expect(el.getAttribute("aria-label")).toBe(
        "Chess position. Empty board.",
      );
    });

    it("leaves out a side that has no pieces", () => {
      const el = createElement("8/8/8/8/8/8/8/4K3");
      expect(el.getAttribute("aria-label")).toBe(
        "Chess position. White: king e1.",
      );
    });

    it("updates the description on every change", async () => {
      const el = createElement(START_FEN);
      el.move("e2", "e4");
      expect(el.getAttribute("aria-label")).toContain(
        "pawns a2, b2, c2, d2, e4, f2, g2 and h2.",
      );
      el.clearBoard();
      expect(el.getAttribute("aria-label")).toBe(
        "Chess position. Empty board.",
      );
      el.textContent = SCHOLARS_MATE;
      await flushObservers();
      expect(el.getAttribute("aria-label")).toBe(
        "Chess position. " +
          "White: king e1, queen f7, rooks a1 and h1, bishops c1 and c4, " +
          "knights b1 and g1, pawns a2, b2, c2, d2, e4, f2, g2 and h2. " +
          "Black: king e8, queen d8, rooks a8 and h8, bishops c8 and f8, " +
          "knights c6 and f6, pawns a7, b7, c7, d7, e5, g7 and h7.",
      );
    });

    it("keeps a role and label supplied by the page", () => {
      const el = createElement(START_FEN, {
        role: "figure",
        "aria-label": "Position after 17.Rd8#",
      });
      el.move("e2", "e4");
      expect(el.getAttribute("role")).toBe("figure");
      expect(el.getAttribute("aria-label")).toBe("Position after 17.Rd8#");
    });

    it("does not add a label when the page uses aria-labelledby", () => {
      const el = createElement(START_FEN, { "aria-labelledby": "caption" });
      expect(el.hasAttribute("aria-label")).toBe(false);
    });

    it("lets the page take over the label later, and hand it back", () => {
      const el = createElement(START_FEN);
      expect(el.getAttribute("aria-label")).toBe(START_LABEL);

      el.setAttribute("aria-label", "Opening position");
      el.move("e2", "e4");
      expect(el.getAttribute("aria-label")).toBe("Opening position");

      el.removeAttribute("aria-label");
      el.move("e7", "e5");
      expect(el.getAttribute("aria-label")).toContain("pawns a7, b7, c7, d7, e5");
    });
  });

  describe("square colors", () => {
    it("assigns correct light/dark classes", () => {
      const el = createElement(START_FEN);
      // a8 (0,0) should be light
      expect(getCell(el, 0, 0).classList.contains("light")).toBe(true);
      // b8 (0,1) should be dark
      expect(getCell(el, 0, 1).classList.contains("dark")).toBe(true);
      // a7 (1,0) should be dark
      expect(getCell(el, 1, 0).classList.contains("dark")).toBe(true);
    });
  });

  describe("diffing", () => {
    it("only updates changed cells", () => {
      const el = createElement(START_FEN);
      // Grab a reference to an element that shouldn't change
      const a8piece = getCell(el, 0, 0).firstElementChild;
      el.move("e2", "e4");
      // a8 rook should be the same DOM node (not replaced)
      expect(getCell(el, 0, 0).firstElementChild).toBe(a8piece);
    });
  });

  describe("reconnection", () => {
    it("can be detached and re-inserted without error", () => {
      const el = createElement(START_FEN);
      expect(getPieceAt(el, 0, 0)).toBe("r");

      expect(() => {
        document.body.removeChild(el);
        document.body.appendChild(el);
      }).not.toThrow();

      // Board still renders the correct position after reconnect
      expect(getPieceAt(el, 0, 0)).toBe("r");
      expect(getPieceAt(el, 0, 4)).toBe("k");
      expect(getPieceAt(el, 7, 4)).toBe("K");
    });
  });
});
