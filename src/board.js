var ChessBoard = (function() { /* jshint validthis: true */
    "use strict";

    var me = (function (){
        // The polymer platform polyfill prefixes currentScript with _
        // TODO: do I need HTMLImports?
        if(document.currentScript) {
            return document.currentScript.ownerDocument;
        } else if (document._currentScript){
            return document._currentScript.ownerDocument;
        } else {
            return HTMLImports.currentScript.ownerDocument;
        }
    })();

    var emptySquare = me.querySelector("#emptyTemplate"),
        pieces = {P: me.querySelector("#whitePawnTemplate"),  // ♙ white
                  N: me.querySelector("#whiteKnightTemplate"),// ♘
                  B: me.querySelector("#whiteBishopTemplate"),// ♗
                  R: me.querySelector("#whiteRookTemplate"),  // ♖
                  Q: me.querySelector("#whiteQueenTemplate"), // ♕
                  K: me.querySelector("#whiteKingTemplate"),  // ♔
                  p: me.querySelector("#blackPawnTemplate"),  // ♟ black
                  n: me.querySelector("#blackKnightTemplate"),// ♞
                  b: me.querySelector("#blackBishopTemplate"),// ♝
                  r: me.querySelector("#blackRookTemplate"),  // ♜
                  q: me.querySelector("#blackQueenTemplate"), // ♛
                  k: me.querySelector("#blackKingTemplate")}, // ♚
        svgPieces = {P: me.querySelector("#whitePawnSvgTemplate"),  // ♙ white
                  N: me.querySelector("#whiteKnightSvgTemplate"),// ♘
                  B: me.querySelector("#whiteBishopSvgTemplate"),// ♗
                  R: me.querySelector("#whiteRookSvgTemplate"),  // ♖
                  Q: me.querySelector("#whiteQueenSvgTemplate"), // ♕
                  K: me.querySelector("#whiteKingSvgTemplate"),  // ♔
                  p: me.querySelector("#blackPawnSvgTemplate"),  // ♟ black
                  n: me.querySelector("#blackKnightSvgTemplate"),// ♞
                  b: me.querySelector("#blackBishopSvgTemplate"),// ♝
                  r: me.querySelector("#blackRookSvgTemplate"),  // ♜
                  q: me.querySelector("#blackQueenSvgTemplate"), // ♛
                  k: me.querySelector("#blackKingSvgTemplate")}, // ♚
        template = me.querySelector("#chessBoardTemplate"),
        frameTemplate = me.querySelector("#chessBoardFrameTemplate"),
        ranks = {1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1, 8: 0},
        files = {a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7};


    /**
     * Creates a shadowroot and fill it with a chess board
     */
    function createdCallback() {
        var root = this.createShadowRoot();
        this.applyFEN(this.innerHTML.trim());
    }


    /**
     * Places pieces on the board according to the FEN string
     *
     * @param {string} fen The fen string
     */
    function applyFEN(fen) {
        this.resetBoard();
        if(!fen) { return; }

        var rank = 0,
            file = 0,
            fenIndex = 0;

        while(fenIndex < fen.length){
            var fenChar = fen[fenIndex],
                piece = null;

            if(fenChar === ' '){
                return; // ignore the rest
            }
            if(fenChar === '/'){
                rank++;
                file = 0;
                fenIndex++;
                continue;
            }

            if(isNaN(parseInt(fenChar, 10))) {
                internalPut.call(this, file, rank, fenChar);
                file++;
            } else {
                var count = parseInt(fenChar, 10);
                for(var i = 0; i < count; i++) {
                    internalPut.call(this, file, rank, "");
                    file++;
                }
            }

            fenIndex++;
        }
    }

    /**
     * Places a piece on the given file and rank.
     *
     * @param {number} file The file index (File a = 0, file h = 7)
     * @param {number} rank The rank index. (Rank 1 = 7, rank 8 = 0)
     */
    function internalPut(file, rank, piece) {
        var row = this.board.rows[rank],
            cell = row.cells[file];

        removeNodeContent(cell);

        //some polyfill
        if(!(cell instanceof Node)) {
            cell = ShadowDOMPolyfill.wrap(cell);
        }

        cell.appendChild(getPieceClone.call(this, piece));
    }

    /**
     * Places a piece on the given filerank.
     *
     * @param {number} filerank The filerank on the form file + rank, eg: "a2"
     * @param {number} piece The ascii character representing the piece.
     */
    function put(fileRank, piece) { // put("a2", "P")
        internalPut.call(this, files[fileRank[0]], ranks[fileRank[1]], piece);
    }

    function move(from, to) {
        var fromFile = files[from[0]],
            fromRank = ranks[from[1]],
            fromCell = this.board.rows[fromRank].cells[fromFile],

            toFile = files[to[0]],
            toRank = ranks[to[1]],
            toCell = this.board.rows[toRank].cells[toFile];

        var piece = fromCell.getElementsByClassName("piece")[0],
            emptyPiece = emptySquare.content.cloneNode(true);

        if(!piece) {
            throw "Move Error: the from square was empty";
        }
        removeNodeContent(toCell);
        removeNodeContent(fromCell);
        toCell.appendChild(piece);
        fromCell.appendChild(emptyPiece);
    }


    function getPieceClone(piece){
        var clone;
        if(pieces[piece]) {
            if(!this.attributes.unicode) {
                clone = svgPieces[piece].content.cloneNode(true);
            } else {
                clone = pieces[piece].content.cloneNode(true);
            }
        } else {
            clone = emptySquare.content.cloneNode(true);
        }
        return clone;
    }

    /**
     * Replace the current chessboard with an empty one.
     */
    function resetBoard() {
        var clone = template.content.cloneNode(true),
            root = this.shadowRoot;

        removeNodeContent(root);

        this.shadowRoot.appendChild(clone);
        this.board = this.shadowRoot.getElementsByClassName("chessBoard")[0];
        if(this.attributes.framed) {
            var frameRoot = this.createShadowRoot();
            var frameClone = frameTemplate.content.cloneNode(true);
            frameRoot.appendChild(frameClone);
        }
    }

    /**
     * Removes all children elements from a node.
     */
    function removeNodeContent(node) {
        while (node.firstChild) { node.removeChild(node.firstChild); }
    }

    return document.registerElement('chess-board', {
        prototype: Object.create(HTMLElement.prototype, {
            createdCallback: {
                value: createdCallback
            },
            resetBoard: {
                value: resetBoard
            },
            applyFEN: {
                value: applyFEN
            },
            put: {
                value: put
            },
            move: {
                value: move
            }
        })
    });
})();
