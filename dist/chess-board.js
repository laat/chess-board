"use strict";
var __moduleName = (void 0);
(function(scope) {
  var owner = document._currentScript.ownerDocument || document.currentScript.ownerDocument,
      emptySquare = owner.querySelector("#emptyTemplate"),
      pieces = {
        P: owner.querySelector("#whitePawnTemplate"),
        N: owner.querySelector("#whiteKnightTemplate"),
        B: owner.querySelector("#whiteBishopTemplate"),
        R: owner.querySelector("#whiteRookTemplate"),
        Q: owner.querySelector("#whiteQueenTemplate"),
        K: owner.querySelector("#whiteKingTemplate"),
        p: owner.querySelector("#blackPawnTemplate"),
        n: owner.querySelector("#blackKnightTemplate"),
        b: owner.querySelector("#blackBishopTemplate"),
        r: owner.querySelector("#blackRookTemplate"),
        q: owner.querySelector("#blackQueenTemplate"),
        k: owner.querySelector("#blackKingTemplate")
      },
      svgPieces = {
        P: owner.querySelector("#whitePawnSvgTemplate"),
        N: owner.querySelector("#whiteKnightSvgTemplate"),
        B: owner.querySelector("#whiteBishopSvgTemplate"),
        R: owner.querySelector("#whiteRookSvgTemplate"),
        Q: owner.querySelector("#whiteQueenSvgTemplate"),
        K: owner.querySelector("#whiteKingSvgTemplate"),
        p: owner.querySelector("#blackPawnSvgTemplate"),
        n: owner.querySelector("#blackKnightSvgTemplate"),
        b: owner.querySelector("#blackBishopSvgTemplate"),
        r: owner.querySelector("#blackRookSvgTemplate"),
        q: owner.querySelector("#blackQueenSvgTemplate"),
        k: owner.querySelector("#blackKingSvgTemplate")
      },
      template = owner.querySelector("#chessBoardTemplate"),
      frameTemplate = owner.querySelector("#chessBoardFrameTemplate"),
      ranks = {
        1: 7,
        2: 6,
        3: 5,
        4: 4,
        5: 3,
        6: 2,
        7: 1,
        8: 0
      },
      files = {
        a: 0,
        b: 1,
        c: 2,
        d: 3,
        e: 4,
        f: 5,
        g: 6,
        h: 7
      };
  var removeNodeContent = function removeNodeContent(node) {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  };
  var ChessBoard = function ChessBoard() {
    this._unicode = !!this.attributes.unicode;
    this._board = null;
    this._boardRoot = this.createShadowRoot();
    this.fen = this.innerHTML.trim();
    this._frameRoot = this.createShadowRoot();
    this._frameRoot.appendChild(frameTemplate.content.cloneNode(true));
  };
  ($traceurRuntime.createClass)(ChessBoard, {
    attributeChanged: function(attribute, oldVal, newVal) {
      if (attribute === 'unicode') {
        var fen = this.fen;
        this._unicode = !!this.attributes.unicode;
        removeNodeContent(this._boardRoot);
        this.fen = fen;
      }
    },
    clearBoard: function() {
      var clone = template.content.cloneNode(true);
      removeNodeContent(this._boardRoot);
      this._boardRoot.appendChild(clone);
      this._board = this._boardRoot.querySelector(".chessBoard");
    },
    move: function(from, to) {
      var fromFile = files[from [0]],
          fromRank = ranks[from [1]],
          fromCell = this._board.rows[fromRank].cells[fromFile],
          toFile = files[to[0]],
          toRank = ranks[to[1]],
          toCell = this._board.rows[toRank].cells[toFile],
          piece = fromCell.querySelector(".piece"),
          emptyPiece = emptySquare.content.cloneNode(true);
      if (!piece) {
        throw "Move Error: the from square was empty";
      }
      removeNodeContent(toCell);
      removeNodeContent(fromCell);
      toCell.appendChild(piece);
      fromCell.appendChild(emptyPiece);
    },
    clear: function(cell) {
      var file = files[cell[0]],
          rank = ranks[cell[1]],
          boardCell = this._board.rows[rank].cells[file];
      removeNodeContent(boardCell);
    },
    put: function(cell, piece) {
      var file = files[cell[0]],
          rank = ranks[cell[1]],
          boardCell = this._board.rows[rank].cells[file];
      removeNodeContent(boardCell);
      this._setPiece(board, file, rank, "", this._unicode);
    },
    _setPiece: function(board, file, rank, piece, unicode) {
      var row = board.rows[rank],
          cell = row.cells[file];
      removeNodeContent(cell);
      if (!(cell instanceof Node)) {
        cell = ShadowDOMPolyfill.wrap(cell);
      }
      cell.appendChild(this._getPieceClone(piece, unicode));
    },
    _getPieceClone: function(piece, unicode) {
      var clone;
      if (pieces[piece]) {
        if (!unicode) {
          clone = svgPieces[piece].content.cloneNode(true);
        } else {
          clone = pieces[piece].content.cloneNode(true);
        }
      } else {
        clone = emptySquare.content.cloneNode(true);
      }
      return clone;
    },
    set fen(fen) {
      if (!fen) return;
      if (fen === 'start') fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
      var clone = template.content.cloneNode(true),
          board = clone.children[1],
          rank = 0,
          file = 0,
          fenIndex = 0,
          fenChar,
          piece,
          count,
          i;
      while (fenIndex < fen.length) {
        fenChar = fen[fenIndex];
        piece = null;
        if (fenChar === ' ') {
          break;
        }
        if (fenChar === '/') {
          rank++;
          file = 0;
          fenIndex++;
          continue;
        }
        if (isNaN(parseInt(fenChar, 10))) {
          this._setPiece(board, file, rank, fenChar, this._unicode);
          file++;
        } else {
          count = parseInt(fenChar, 10);
          for (i = 0; i < count; i++) {
            this._setPiece(board, file, rank, "", this._unicode);
            file++;
          }
        }
        fenIndex++;
      }
      removeNodeContent(this._boardRoot);
      this._boardRoot.appendChild(clone);
      this._board = this._boardRoot.querySelector(".chessBoard");
    },
    get fen() {
      var board = this._boardRoot.querySelector('.chessBoard'),
          fen = [],
          i,
          j,
          count,
          cell,
          piece;
      for (i = 0; i < 8; i++) {
        count = 0;
        for (j = 0; j < 8; j++) {
          cell = board.rows[i].cells[j];
          piece = cell.querySelector('[ascii]');
          if (piece) {
            if (count > 0) {
              fen.push(count);
              count = 0;
            }
            fen.push(piece.attributes.ascii.value);
          } else {
            count++;
          }
        }
        if (count > 0) {
          fen.push(count);
        }
        fen.push("/");
      }
      fen.pop();
      return fen.join("");
    }
  }, {}, HTMLElement);
  if (Platform.ShadowCSS) {
    var templateClone = template.content.cloneNode(true);
    var frameClone = frameTemplate.content.cloneNode(true);
    Platform.ShadowCSS.shimStyling(templateClone, "chess-board", "");
    Platform.ShadowCSS.shimStyling(frameClone, "chess-board", "");
  }
  ChessBoard.prototype.createdCallback = ChessBoard.prototype.constructor;
  ChessBoard.prototype.attributeChangedCallback = ChessBoard.prototype.attributeChanged;
  ChessBoard = document.registerElement('chess-board', ChessBoard);
  scope.ChessBoard = ChessBoard;
})(window);
