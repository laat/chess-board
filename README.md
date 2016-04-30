# &lt;chess-board&gt; [![travis][travis-image]][travis-url] [![npm][npm-image]][npm-url]
[npm-image]: https://img.shields.io/npm/v/chess-board.svg?style=flat
[npm-url]: https://npmjs.org/package/chess-board
[travis-image]: https://img.shields.io/travis/laat/chess-board.svg?style=flat
[travis-url]: https://travis-ci.org/laat/chess-board

> A web component for displaying chess positions.

## Demo

> [Check it live](http://laat.github.io/chess-board).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.21/webcomponents.min.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="/bower_components/chess-board/dist/chess-board.html">
    ```

3. Start using it!

    ```html
    <chess-board>rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1</chess-board>
    ```

## Options

Attribute  | Description
---        | ---
`unicode`  | Display chess pices with unicode characters.
`frame`   | Display file and rank arround the chessboard
`reverse`  | Display the chessboard with black pieces at the bottom.

## Methods

### put()
Put the white queen on the a4 square
```js
var board = new ChessBoard();
board.put("a4", "Q");
```

set a4 square empty
```js
var board = new ChessBoard();
board.put("a4", "");
```

### move()
move a piece from a4 to a1
```js
var board = new ChessBoard();
board.move("a4", "a1");
```

The pieces are defined as in [Forsyth–Edwards Notation](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation)

```js
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

### clearBoard()

```js
var board = new ChessBoard();
board.clearBoard();
```

### setting board position
```js
var board = new ChessBoard();
board.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
```

### getting board position
```js
var board = new ChessBoard();
board.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
board.move("a2", "a3");

var currentFen = board.fen;
```

## License

MIT © [Sigurd Fosseng](https://github.com/laat)
