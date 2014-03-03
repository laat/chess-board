# &lt;chess-board&gt;

A web component for displaying chess positions.

> Maintained by [Sigurd Fosseng](https://github.com/laat).

## Demo

> [Check it live](http://laat.github.io/chess-board).

## Usage

1. Import Web Components' polyfill:

    ```html
    <script src="//cdnjs.cloudflare.com/ajax/libs/polymer/0.1.4/platform.js"></script>
    ```

2. Import Custom Element:

    ```html
    <link rel="import" href="src/chess-board.html">
    ```

3. Start using it!

    ```html
    <chess-board>rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1</chess-board>
    ```

## Setup

In order to run it locally you'll need a basic server setup.

1. Install [NodeJS](http://nodejs.org/download/).
2. Install [GruntJS](http://gruntjs.com/):

    ```sh
    $ [sudo] npm install -g grunt-cli
    ```

3. Install local dependencies:

    ```sh
    $ npm install
    ```

4. Run a local server and open `http://localhost:8000`.

    ```sh
    $ grunt connect
    ```
## Options

Attribute  | Description
---        | ---
`unicode`  | Display chess pices with unicode characters.
`framed`   | Display file and rank arround the chessboard
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

### resetBoard()

```js
var board = new ChessBoard();
board.resetBoard();
```

### applyFEN()
```js
var board = new ChessBoard();
board.applyFEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
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

Wanting to learn how Web Components work, I started out creating this component with only the platform polyfill from [polymer](http://polymer-project.org). However, after a while I have come to realize that I really want to use a framework like [polymer](http://polymer-project.org) or [x-tags](http://x-tags.org) because they seem to add an useful abstraction on top of the web standard.

It has been a very fun, which has obviously lead to quite a bit of over engineering. I hope to be able to add a few more features in the future, like context menu, drag and drop, and another component that uses this one for viewing PGN games.
