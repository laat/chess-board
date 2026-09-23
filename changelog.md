Unreleased
==========

**Added**

* The board is a table to assistive technology instead of 64 blank cells.
  The caption describes the position in words ("Chess position. White: king
  e1, queen d1, …"), the files and ranks are column and row headers whether
  or not the frame is shown, and each square holds the name of its piece
  ("White pawn") next to the picture, which is hidden. A screen reader hears
  the whole position on entering the board and can walk it square by square.
  An `aria-label` on the element replaces the caption with the page's own
  words. The description is also exposed as the `description` property, and
  the words can be translated by replacing `ChessBoardElement.strings`. (#22)

**Changed**

* The shadow tree is one table instead of a board table nested in a frame
  table. The border around the board is drawn by its outermost squares, and
  the frame labels are collapsed to nothing rather than removed when `frame`
  is off, so that they stay available as headers. Rendering is unchanged
  apart from sub-pixel positioning of the frame labels.

3.0.0 / 2026-09-05
==================

**Breaking**

* The package is now plain compiled TypeScript instead of a Vite bundle.
  `dist/chess-board.js` is the readable ES2022 output of `src/chess-board.ts`
  (which ships in the package, so source maps and declaration maps resolve),
  and `fen-chess-board` is a regular runtime dependency rather than being
  inlined. Anything that goes through a bundler keeps working unchanged.
  Loading `dist/chess-board.js` straight from a `<script type="module">` tag
  with no bundler breaks, because the file now imports the bare specifier
  `fen-chess-board`; add an import map that points it at a copy of that
  package. See "Without a bundler" in the readme.

**Behaviour changes for users of the element**

* Invalid input now throws instead of quietly producing a broken board. This
  comes from the bundled `fen-chess-board@4`, which validates everything it is
  given:
  * `fen = ...` rejects malformed piece placement: more than eight ranks, a
    rank with more than eight squares, or the digits `0` and `9`. The board is
    left unchanged. Version 3 silently truncated or dropped such input.
  * `piece()`, `put()`, `clear()` and `move()` throw `Invalid square` for
    anything that is not `a1`–`h8`. Version 3 crashed with a `TypeError` or
    corrupted the board.
  * `put()` throws `Invalid piece` unless the piece is a single character that
    is not FEN syntax (digits, `/`, space). Version 3 accepted `"QQ"` and
    produced FEN nobody can parse.
  * Anything after the first space in a FEN string (active colour, castling,
    move counters) is still ignored, as before.
* Malformed FEN in the element's **text content** is reported with
  `console.warn` and ignored, and the board keeps its current position. Without
  this, the validation above would have thrown out of `connectedCallback` or
  the `MutationObserver` and left the element blank.
* `move(square, square)` no longer clears the piece; moving onto the same
  square is a no-op.
* The published JavaScript is ES2022 as written (class fields, `??`, `?.`,
  `Object.hasOwn`), so it needs roughly Chrome/Edge 94, Firefox 93 or Safari
  15.4 and newer. Version 2.0 was down-levelled to Chrome 87, Firefox 78 and
  Safari 14.

**Fixed**

* Importing the module twice (two bundles, HMR) no longer throws from
  `customElements.define`; registration is skipped when `<chess-board>` is
  already defined.
* `dist/chess-board.test.d.ts` is no longer generated or published; the
  package ships only the library declarations.

**Changed**

* Each SVG piece is parsed once into a `<template>` and cloned on render,
  instead of re-parsing the markup for every changed square.
* The deprecated `cellpadding` / `cellspacing` table attributes are replaced by
  `border-spacing: 0`; rendering is unchanged.
* `dist/chess-board.js.map` and `dist/chess-board.d.ts.map` are shipped, and
  point at the bundled `src/chess-board.ts`.
* `package.json` is exported as `./package.json`.
* The `Rank` type is derived from the rank tuple like `File` already was; the
  resulting union is identical.

**Development**

* Toolchain: TypeScript 7, Vite 8, Vitest 5, happy-dom 20, pnpm 12. Node 22.12
  or newer is required to work on the repository (consumers are unaffected).
  Vite now only serves and builds the demo site and runs the tests; `pnpm
  build` is a single `tsc` invocation.
* `tsconfig.json` is stricter (`ES2022`, `noUncheckedIndexedAccess`,
  `verbatimModuleSyntax`, `isolatedModules`); `tsconfig.build.json` excludes
  tests from declaration emit; new `pnpm typecheck` script.
* pnpm settings moved from `package.json` to `pnpm-workspace.yaml` with
  supply-chain policies: `minimumReleaseAge` (24 h, `fen-chess-board`
  excluded), `trustPolicy: no-downgrade`, `blockExoticSubdeps`,
  `strictDepBuilds`. The `esbuild` build allow-list is gone; nothing in the
  tree needs build scripts any more.
* Tests rewritten with helpers; new coverage for the text-content path,
  invalid FEN through both the setter and markup, attribute toggling in both
  directions, observer teardown on disconnect and element registration
  (21 → 27 tests).
* CI: every action pinned to a commit SHA, `permissions: {}` with documented
  job-level grants, `persist-credentials: false`, concurrency groups,
  timeouts, Node 22/24 matrix, typecheck step, dependency review on pull
  requests. `pnpm/setup` replaces `pnpm/action-setup` + `actions/setup-node`.
* New zizmor workflow audits the workflows themselves (pedantic persona,
  SARIF to code scanning, weekly schedule). Dependabot keeps the pinned
  actions and the wrangler lockfile current with a 7-day cooldown; the
  library's own dependencies are bumped by hand because Dependabot does not
  support pnpm 12.
* Release: the Publish workflow checks the tag against `package.json`, runs
  typecheck/test/build, then stages the package with `pnpm stage publish`
  over npm trusted publishing (OIDC) with provenance. A maintainer promotes
  it with `pnpm stage approve`. No npm token and no dependency cache in the
  release job.
* Every pull request from a branch in this repository gets a Cloudflare Pages
  preview of the demo site, posted as a PR comment. wrangler is pinned by
  `.github/cloudflare/package-lock.json`, separate from the library's lockfile.
* Documentation: readme sections for development, preview deploys and the
  staged release flow; changelog entries backfilled for 2.0.2 and 2.0.3.

2.0.3 / 2026-04-14
==================

* Publish to npm from GitHub Actions with provenance
* Fix the repository URL so the provenance attestation resolves

2.0.2 / 2026-04-14
==================

* Move the demo to https://chess-board.laat.dev/ (Vite base path `/`)
* Fix the repository URL in package.json

2.0.1 / 2026-04-11
==================

* Fix shadow root creation crash when the element is moved in the DOM (#13)
* Register `<chess-board>` on `HTMLElementTagNameMap` for type inference (#14)
* Documentation: rewrite README for the v2 API, backfill changelog, remove stale Travis badge

2.0.0 / 2026-04-06
==================

* Full rewrite as TypeScript Custom Elements v1
* Switch build tooling to Vite, ship ESM build and `.d.ts` type declarations
* Bundle `fen-chess-board@3` — zero runtime dependencies in `dist`
* Drop `webcomponents.js` polyfill, HTML Imports and Bower — modern browsers only
* Add vitest + happy-dom test suite and GitHub Actions Pages deploy

1.1.0 / 2016-09-23
==================

* Add MutationObserver to track FEN changes via `innerHTML`

1.0.13 / 2016-09-15
===================

* Fix second shadowRoot being created on re-render (#7)
* `clearBoard` now actually clears the board
* Move `fen-chess-board` to a separate package
* Dependency bumps and switch to airbnb lint preset

1.0.3 / 2016-03-13
==================

* Bumped webcomponents.js
* Removed ShadowCSS polyfills
* Refactor to multiple files
* StandardJS syntax
* New build


0.0.5 / 2014-07-14
=================
* Fixed: #2 Chashing in Chrome 36

0.0.4 / 2014-03-20
=================
* previous release broken by a typo

0.0.3 / 2014-03-20
==================
 * Rewrite to Ecmascript 6, because learning.
 * fixed an issue with reversing position
 * resetBoard renamed to clearBoard
 * applyFen removed in favour of setter

0.0.2 / 2014-03-06
==================

 * Fixed an issue with reverse of unframed boxes.
 * Better resizing based on font-size.
 * Smaller unicode font.  

0.0.1 / 2014-03-05
==================

 * Initial release
