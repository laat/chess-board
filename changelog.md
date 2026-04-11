
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
