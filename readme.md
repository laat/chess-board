# &lt;chess-board&gt; [![npm][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/chess-board.svg?style=flat
[npm-url]: https://npmjs.org/package/chess-board

> A web component for displaying chess positions.

## Demo

[Check it live](https://chess-board.laat.dev/).

## Install

```sh
npm install chess-board
```

## Usage

Import the module once to register the `<chess-board>` custom element:

```ts
import "chess-board";
```

Then use it in your markup. The element reads its initial position from its
text content as a [FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)
string (the piece-placement field is enough):

```html
<chess-board>rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR</chess-board>
```

Changing the text content later updates the board — it's observed via a
`MutationObserver`. Malformed FEN in the text content is reported with
`console.warn` and ignored; the board keeps its current position.

### TypeScript

Types for the element, squares and pieces are exported from the package:

```ts
import type { ChessBoardElement, Square, Piece } from "chess-board";
```

## Attributes

| Attribute | Description                                                    |
| --------- | -------------------------------------------------------------- |
| `unicode` | Render pieces as Unicode glyphs instead of the default SVGs.   |
| `frame`   | Show file (a–h) and rank (1–8) labels around the board.        |
| `reverse` | Flip the board so the black pieces are on the bottom.          |

```html
<chess-board unicode frame reverse>
  rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
</chess-board>
```

## Properties

### `fen` (get / set)

Read or write the current position as a FEN string. Setting a malformed FEN
throws and leaves the board unchanged.

```js
const board = document.querySelector("chess-board");

board.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
board.move("e2", "e4");

const currentFen = board.fen;
```

## Methods

All methods operate on an already-mounted element. Grab it with
`document.querySelector` — do not use `new`:

```js
const board = document.querySelector("chess-board");
```

### `piece(square)`

Return the piece on the given square, or an empty string if the square is
empty.

```js
board.piece("e1"); // "K"
board.piece("e4"); // ""
```

### `put(square, piece)`

Place a piece on a square.

```js
board.put("a4", "Q"); // white queen on a4
```

### `clear(square)`

Remove the piece from a square.

```js
board.clear("a4");
```

### `move(from, to)`

Move a piece between squares.

```js
board.move("e2", "e4");
```

### `clearBoard()`

Remove all pieces from the board.

```js
board.clearBoard();
```

## Pieces

Pieces use [Forsyth–Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation):
uppercase letters are white, lowercase are black.

```
P // ♙ white pawn
N // ♘ white knight
B // ♗ white bishop
R // ♖ white rook
Q // ♕ white queen
K // ♔ white king

p // ♟ black pawn
n // ♞ black knight
b // ♝ black bishop
r // ♜ black rook
q // ♛ black queen
k // ♚ black king
```

## Development

The repository uses [pnpm](https://pnpm.io) (the version is pinned in
`package.json`, so `corepack` or `pnpm self-update` picks it up):

```sh
pnpm install
pnpm test       # vitest, once
pnpm typecheck  # tsc --noEmit
pnpm build      # dist/ — the published package
pnpm dev        # demo page with live reload
```

## Preview deploys

Every pull request from a branch in this repository gets a preview of the demo
site on Cloudflare Pages, deployed by the
[Preview workflow](.github/workflows/preview.yml). The URL is posted as a
comment on the pull request and shown as the `preview` deployment. Production
stays on GitHub Pages.

One-time setup:

1. Create the Pages project (Direct Upload, no Git integration):

   ```sh
   npx wrangler@4 login
   npx wrangler@4 pages project create chess-board --production-branch master
   ```

2. Create an API token at
   [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens):
   **Create Token → Custom token**, permission **Account → Cloudflare Pages →
   Edit**, limited to the one account. No domain on Cloudflare is needed.
3. Copy the account ID: it is the 32-character hex segment in the dashboard
   URL right after `dash.cloudflare.com/` once the account is selected, and
   `curl -H "Authorization: Bearer $TOKEN" https://api.cloudflare.com/client/v4/accounts`
   lists it too.
4. In the GitHub repository go to **Settings → Environments → preview**
   (the first workflow run creates it) and add two **environment secrets**:
   `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. Environment secrets
   are only readable by the preview job, not by the CI, publish or Pages
   jobs.

The token can manage every Pages project in the account but nothing else
(no DNS, Workers or billing), so give it an expiry and rotate it. wrangler
and its dependencies are pinned by `.github/cloudflare/package-lock.json`,
which Dependabot keeps current.

Previews live at `https://<hash>.chess-board-4mh.pages.dev`, with a per-branch
alias at `https://<branch>.chess-board-4mh.pages.dev`. Pull requests from forks
are skipped because they cannot read the secrets.

## Releasing

1. `pnpm version <patch|minor|major>` and push the commit and the `vX.Y.Z` tag.
2. The [Publish workflow](.github/workflows/publish.yml) builds and tests the
   tag, then **stages** it on npm with provenance via
   [trusted publishing](https://docs.npmjs.com/trusted-publishers). Nothing is
   live yet.
3. Inspect it with `pnpm stage list` / `pnpm stage view <id>`, then promote it
   with `pnpm stage approve <id>` (this is the step that asks for 2FA), or
   drop it with `pnpm stage reject <id>`.

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
