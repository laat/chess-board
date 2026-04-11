# &lt;chess-board&gt; [![npm][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/chess-board.svg?style=flat
[npm-url]: https://npmjs.org/package/chess-board

> A web component for displaying chess positions.

## Demo

[Check it live](https://laat.github.io/chess-board).

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
`MutationObserver`.

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

Read or write the current position as a FEN string.

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

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
