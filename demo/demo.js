// Demo site for <chess-board>. Plain ES module; Vite serves it in `pnpm dev`
// and bundles it for GitHub Pages in `pnpm build:pages`.
import "../src/chess-board.ts";
import { version } from "../package.json";

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
const SCHOLARS_MATE = "r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ───────────────────────── Version badge ───────────────────────── */

for (const el of $$("[data-version]")) el.textContent = `v${version}`;

/* ───────────────────────── Copy buttons ───────────────────────── */

function flashCopied(button) {
  const label = button.textContent;
  button.textContent = "Copied";
  button.classList.add("is-copied");
  setTimeout(() => {
    button.textContent = label;
    button.classList.remove("is-copied");
  }, 1600);
}

document.addEventListener("click", async (event) => {
  const button = event.target.closest("[data-copy], [data-copy-target]");
  if (!button) return;
  const text = button.dataset.copy ?? $(button.dataset.copyTarget)?.textContent ?? "";
  try {
    await navigator.clipboard.writeText(text);
    flashCopied(button);
  } catch {
    button.textContent = "Failed";
  }
});

/* ───────────────────────── Game viewer ───────────────────────── */

// Morphy vs. Duke Karl of Brunswick and Count Isouard, Paris 1858.
// Each ply is its SAN label plus the from→to squares the component needs;
// castling is two moves on one ply.
const OPERA_GAME = [
  ["e4", "e2e4"], ["e5", "e7e5"],
  ["Nf3", "g1f3"], ["d6", "d7d6"],
  ["d4", "d2d4"], ["Bg4", "c8g4"],
  ["dxe5", "d4e5"], ["Bxf3", "g4f3"],
  ["Qxf3", "d1f3"], ["dxe5", "d6e5"],
  ["Bc4", "f1c4"], ["Nf6", "g8f6"],
  ["Qb3", "f3b3"], ["Qe7", "d8e7"],
  ["Nc3", "b1c3"], ["c6", "c7c6"],
  ["Bg5", "c1g5"], ["b5", "b7b5"],
  ["Nxb5", "c3b5"], ["cxb5", "c6b5"],
  ["Bxb5+", "c4b5"], ["Nbd7", "b8d7"],
  ["O-O-O", "e1c1", "a1d1"], ["Rd8", "a8d8"],
  ["Rxd7", "d1d7"], ["Rxd7", "d8d7"],
  ["Rd1", "h1d1"], ["Qe6", "e7e6"],
  ["Bxd7+", "b5d7"], ["Nxd7", "f6d7"],
  ["Qb8+", "b3b8"], ["Nxb8", "d7b8"],
  ["Rd8#", "d1d8"],
];

function setupGameViewer() {
  const root = $("#game-viewer");
  const board = $("[data-game-board]", root);
  const list = $("[data-movelist]", root);
  const status = $("[data-game-status]", root);
  const toggle = $('[data-game="toggle"]', root);
  if (!root || !board) return;

  let ply = 0; // number of plies applied
  let timer = null;
  const PLY_MS = 1100;
  const END_PAUSE_MS = 3200;

  // Build the move list like a chess book: "1. e4 e5  2. Nf3 d6 …", with each
  // numbered move kept on one line.
  let pair = null;
  const moveButtons = OPERA_GAME.map(([san], index) => {
    if (index % 2 === 0) {
      pair = document.createElement("li");
      const no = document.createElement("span");
      no.className = "move-no";
      no.textContent = `${index / 2 + 1}.`;
      pair.append(no);
      list.append(pair);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "move";
    button.textContent = san;
    button.setAttribute("aria-label", `Go to move ${index + 1}, ${san}`);
    button.addEventListener("click", () => {
      pause();
      goTo(index + 1);
    });
    pair.append(button);
    return button;
  });

  function render() {
    moveButtons.forEach((button, index) => {
      button.classList.toggle("is-current", index === ply - 1);
    });
    const current = moveButtons[ply - 1];
    if (current) {
      // Keep the current move visible inside the list without scrolling the page.
      const top = current.offsetTop - list.offsetTop;
      const bottom = top + current.offsetHeight;
      if (top < list.scrollTop || bottom > list.scrollTop + list.clientHeight) {
        list.scrollTo({ top: top - list.clientHeight / 2, behavior: reducedMotion.matches ? "auto" : "smooth" });
      }
    }
    if (ply === 0) {
      status.textContent = "Start";
    } else {
      const moveNo = Math.ceil(ply / 2);
      const side = ply % 2 ? "" : "…";
      status.textContent = `${moveNo}.${side} ${OPERA_GAME[ply - 1][0]}`;
      if (ply === OPERA_GAME.length) status.textContent += ", 1–0";
    }
  }

  function goTo(target) {
    target = Math.max(0, Math.min(OPERA_GAME.length, target));
    if (target < ply) {
      // The element has no undo, so rewind by replaying from the start.
      board.fen = START_FEN;
      ply = 0;
    }
    while (ply < target) {
      const [, ...moves] = OPERA_GAME[ply];
      for (const move of moves) board.move(move.slice(0, 2), move.slice(2, 4));
      ply++;
    }
    render();
  }

  function play() {
    if (timer) return;
    if (ply >= OPERA_GAME.length) goTo(0);
    toggle.textContent = "❚❚";
    toggle.setAttribute("aria-label", "Pause");
    const tick = () => {
      goTo(ply + 1);
      if (ply >= OPERA_GAME.length) {
        // Hold the mating position, then loop.
        timer = setTimeout(() => {
          goTo(0);
          timer = setTimeout(tick, PLY_MS);
        }, END_PAUSE_MS);
      } else {
        timer = setTimeout(tick, PLY_MS);
      }
    };
    timer = setTimeout(tick, PLY_MS);
  }

  function pause() {
    if (!timer) return;
    clearTimeout(timer);
    timer = null;
    toggle.textContent = "▶";
    toggle.setAttribute("aria-label", "Play");
  }

  root.addEventListener("click", (event) => {
    const button = event.target.closest("[data-game]");
    if (!button) return;
    switch (button.dataset.game) {
      case "start": pause(); goTo(0); break;
      case "prev": pause(); goTo(ply - 1); break;
      case "next": pause(); goTo(ply + 1); break;
      case "end": pause(); goTo(OPERA_GAME.length); break;
      case "toggle": timer ? pause() : play(); break;
    }
  });

  // Stop the timer when the hero scrolls out of view; resume when it is back.
  let wasPlaying = false;
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (wasPlaying) play();
    } else if (timer) {
      wasPlaying = true;
      pause();
    }
  }, { threshold: 0.2 });
  observer.observe(root);

  render();
  if (!reducedMotion.matches) {
    wasPlaying = true;
    play();
  }
}

/* ───────────────────────── Playground ───────────────────────── */

const PRESETS = [
  ["Start", START_FEN],
  ["Scholar's mate", SCHOLARS_MATE],
  ["Opera Game, final", "1n1Rkb1r/p4ppp/4q3/4p1B1/4P3/8/PPP2PPP/2K5"],
  ["Immortal Game, final", "r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1"],
  ["Lucena position", "1K1k4/1P6/8/8/8/8/r7/2R5"],
  ["Empty", "8/8/8/8/8/8/8/8"],
];

function setupPlayground() {
  const form = $("[data-pg-form]");
  const board = $("[data-pg-board]");
  const code = $("[data-pg-code]");
  const error = $("[data-pg-error]");
  const presets = $("[data-pg-presets]");
  const sizeOut = $("[data-pg-size-out]");
  if (!form || !board) return;

  const fenField = form.elements.fen;
  const sizeField = form.elements.size;
  const attrs = ["frame", "reverse", "unicode"];

  const chips = PRESETS.map(([label, fen]) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.textContent = label;
    chip.dataset.fen = fen;
    chip.addEventListener("click", () => {
      fenField.value = fen;
      update();
    });
    presets.append(chip);
    return chip;
  });

  function updateCode() {
    const attrString = attrs
      .filter((name) => form.elements[name].checked)
      .map((name) => ` ${name}`)
      .join("");
    const size = Number(sizeField.value);
    let markup = `<chess-board${attrString}>\n  ${board.fen}\n</chess-board>`;
    if (size !== 16) {
      markup += `\n\n<style>\n  chess-board { font-size: ${size}px; }\n</style>`;
    }
    code.textContent = markup;
  }

  function update() {
    for (const name of attrs) {
      board.toggleAttribute(name, form.elements[name].checked);
    }

    const size = Number(sizeField.value);
    board.style.fontSize = `${size}px`;
    sizeOut.textContent = `${size}px`;

    const fen = fenField.value.trim();
    let valid = true;
    try {
      if (fen) board.fen = fen;
      else valid = false;
    } catch (err) {
      valid = false;
      error.textContent = err instanceof Error ? err.message : String(err);
    }
    if (!fen) error.textContent = "Enter a FEN string. The piece-placement field is enough.";
    error.hidden = valid;
    fenField.setAttribute("aria-invalid", String(!valid));

    for (const chip of chips) {
      chip.setAttribute("aria-pressed", String(chip.dataset.fen === board.fen));
    }
    updateCode();
  }

  form.addEventListener("input", update);
  form.addEventListener("change", update);
  update();
}

/* ───────────────────────── API console ───────────────────────── */

function setupApiDemo() {
  const board = $("[data-api-board]");
  const log = $("[data-api-log]");
  const calls = $("[data-api-calls]");
  if (!board || !log || !calls) return;

  const CALLS = {
    "fen-get": () => board.fen,
    "fen-set": () => { board.fen = SCHOLARS_MATE; },
    "fen-bad": () => { board.fen = "8/8/8/8/8/8/8/8/8"; },
    "move": () => board.move("e2", "e4"),
    "piece": () => board.piece("e1"),
    "put": () => board.put("d5", "Q"),
    "clear": () => board.clear("d5"),
    "bad-square": () => board.put("z9", "Q"),
    "clear-board": () => board.clearBoard(),
    "text": () => { board.textContent = START_FEN; },
  };

  function format(value) {
    if (value === undefined) return "undefined";
    return JSON.stringify(value);
  }

  function append(codeText, result, isError) {
    const li = document.createElement("li");
    const prompt = document.createElement("span");
    prompt.className = "log-prompt";
    prompt.textContent = ">";
    const body = document.createElement("span");
    const codeLine = document.createElement("div");
    codeLine.className = "log-code";
    codeLine.textContent = codeText;
    const resultLine = document.createElement("div");
    resultLine.className = isError ? "log-error" : "log-result";
    resultLine.textContent = result;
    body.append(codeLine, resultLine);
    li.append(prompt, body);
    log.append(li);
    log.scrollTop = log.scrollHeight;
  }

  calls.addEventListener("click", (event) => {
    const button = event.target.closest("[data-call]");
    if (!button) return;
    const run = CALLS[button.dataset.call];
    const codeText = $("code", button).textContent;
    let isError = false;
    let result;
    try {
      result = format(run());
    } catch (err) {
      isError = true;
      result = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    }
    append(codeText, result, isError);
    const cls = isError ? "is-flash-error" : "is-flash";
    button.classList.add(cls);
    setTimeout(() => button.classList.remove(cls), 500);
  });

  $('[data-api="clear-log"]')?.addEventListener("click", () => log.replaceChildren());
}

/* ───────────────────────── Boot ───────────────────────── */

customElements.whenDefined("chess-board").then(() => {
  setupGameViewer();
  setupPlayground();
  setupApiDemo();
});
