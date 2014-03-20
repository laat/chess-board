# &lt;chess-board&gt;

A web component for displaying chess positions.

> Maintained by [Sigurd Fosseng](https://github.com/laat).

## Demo

> [Check it live](http://laat.github.io/chess-board).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="/bower_components/polymer-platform/platform.js"></script>
    ```

1. Traceur Runtime:  (Ecmascript 6)

    ```html
    <script src="/bower_components/traceur-runtime/traceur-runtime.js"></script>
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

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

For detailed changelog, check [Releases](https://github.com/laat/chess-board/releases).

## License

[MIT License](http://opensource.org/licenses/MIT)

### Notes / Rambeling
Web Components are FUN! I hope to be able to add a few more features in the future, like context menu, drag and drop, and animation.
