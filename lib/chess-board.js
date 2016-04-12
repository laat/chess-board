(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.getFileRank = getFileRank;
exports.emptyBoard = emptyBoard;
var ranks = exports.ranks = { 1: 7, 2: 6, 3: 5, 4: 4, 5: 3, 6: 2, 7: 1, 8: 0 };
var files = exports.files = { a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7 };

/**
 * Returns indices for a cell
 * (can be used to access board arrays)
 *
 * Example:
 *   getFileRank("a2") => [0, 6]
 *
 *   2 = 6 because arrays usally are displayed with 0,0 in the upper
 *   left corner
 *
 * @param {string} square - Eg: "a2"
 */
function getFileRank(square) {
  var _square = _slicedToArray(square, 2);

  var file = _square[0];
  var rank = _square[1];

  return [files[file], ranks[rank]];
}

function emptyBoard() {
  var board = [];
  for (var i = 0; i < 8; i++) {
    board[i] = [];
  }
  return board;
}
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chessUtils = require('./chess-utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FENBoard = function () {
  function FENBoard(fen) {
    _classCallCheck(this, FENBoard);

    this.board = (0, _chessUtils.emptyBoard)();
    this.fen = fen;
  }

  /**
   * Gets the piece at a square
   *
   * @param {string} square - The square. Eg: "a2"
   * @return {string} piece - the ascii representation of a piece. Eg: "K"
   */


  _createClass(FENBoard, [{
    key: 'piece',
    value: function piece(square) {
      var _getFileRank = (0, _chessUtils.getFileRank)(square);

      var _getFileRank2 = _slicedToArray(_getFileRank, 2);

      var file = _getFileRank2[0];
      var rank = _getFileRank2[1];

      return this._getPiece(file, rank);
    }

    /**
     * Places a piece in the given square.
     *
     * @param {string} square - The square. Eg: "a2"
     * @param {string} piece - the ascii representation of a piece. Eg: "K"
     */

  }, {
    key: 'put',
    value: function put(square, piece) {
      var _getFileRank3 = (0, _chessUtils.getFileRank)(square);

      var _getFileRank4 = _slicedToArray(_getFileRank3, 2);

      var file = _getFileRank4[0];
      var rank = _getFileRank4[1];

      this._setPiece(file, rank, piece);
    }

    /**
     * Removes the piece at the given square.
     *
     * @param {string} square - The square. Eg: "a2"
     */

  }, {
    key: 'clear',
    value: function clear(square) {
      this.put(square, '');
    }

    /**
     * Moves a piece.
     *
     * @param {string} from - The square to move from. Eg: "a2"
     * @param {string} to - The square to move to. Eg: "a3"
     */

  }, {
    key: 'move',
    value: function move(from, to) {
      var piece = this.piece(from);
      if (!piece) {
        throw new Error('Move Error: the from square was empty');
      }
      this.put(to, piece);
      this.clear(from);
    }

    /**
     * Set the current position.
     *
     * @param {string} fen - a position string as FEN
     */

  }, {
    key: '_setPiece',
    value: function _setPiece(file, rank, fenChar) {
      this.board[file][rank] = fenChar;
    }
  }, {
    key: '_getPiece',
    value: function _getPiece(file, rank) {
      return this.board[file][rank];
    }
  }, {
    key: 'fen',
    set: function set(fen) {
      if (!fen) return;
      if (fen === 'start') fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';

      var rank = 0;
      var file = 0;
      var fenIndex = 0;

      var fenChar = void 0;
      var count = void 0;

      while (fenIndex < fen.length) {
        fenChar = fen[fenIndex];

        if (fenChar === ' ') {
          break; // ignore the rest
        }
        if (fenChar === '/') {
          rank++;
          file = 0;
          fenIndex++;
          continue;
        }

        if (isNaN(parseInt(fenChar, 10))) {
          this._setPiece(file, rank, fenChar);
          file++;
        } else {
          count = parseInt(fenChar, 10);
          for (var i = 0; i < count; i++) {
            this._setPiece(file, rank, '');
            file++;
          }
        }

        fenIndex++;
      }
    }

    /**
     * Get the current position as FEN.
     */
    ,
    get: function get() {
      var fen = [];
      for (var i = 0; i < 8; i++) {
        var empty = 0;
        for (var j = 0; j < 8; j++) {
          var piece = this._getPiece(j, i);
          if (piece) {
            if (empty > 0) {
              fen.push(empty);
              empty = 0;
            }
            fen.push(piece);
          } else {
            empty++;
          }
        }
        if (empty > 0) {
          fen.push(empty);
        }
        fen.push('/');
      }
      fen.pop();
      return fen.join('');
    }
  }]);

  return FENBoard;
}();

exports.default = FENBoard;
},{"./chess-utils":1}],3:[function(require,module,exports){
module.exports = function removeChildren (node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fenChessBoard = require('fen-chess-board');

var _fenChessBoard2 = _interopRequireDefault(_fenChessBoard);

var _templates = require('./templates');

var _removeChildren = require('remove-children');

var _removeChildren2 = _interopRequireDefault(_removeChildren);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChessBoard = function (_HTMLElement) {
  _inherits(ChessBoard, _HTMLElement);

  function ChessBoard() {
    _classCallCheck(this, ChessBoard);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ChessBoard).apply(this, arguments));
  }

  _createClass(ChessBoard, [{
    key: 'createdCallback',
    value: function createdCallback() {
      var _this2 = this;

      this._boardRoot = this.createShadowRoot();

      var clone = _templates.template.content.cloneNode(true);
      this._boardRoot.appendChild(clone);

      this._asciiBoard = new _fenChessBoard2.default(this.innerHTML.trim());
      this._board = this._boardRoot.querySelector('.chessBoard');

      this._frameRoot = this.createShadowRoot();
      this._frameRoot.appendChild(_templates.frameTemplate.content.cloneNode(true));

      this._renderBoard();

      /*
       * A stinky fugly workaround to redraw the board.
       *
       * (Chrome 36/38) The chessboard will not rotate with css if I do not force
       * a redraw of the component. It's difficult to reproduce a minimal example
       * for bugreports.
       */
      this.style.display = 'run-in';
      setTimeout(function () {
        _this2.style.display = 'block';
      }, 0);
      // end of stinky fugly workaround
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attribute, oldVal, newVal) {
      if (attribute === 'unicode') {
        this._renderBoard();
      }
    }

    /**
     * Replaces the current board with an empty one.
     */

  }, {
    key: 'clearBoard',
    value: function clearBoard() {
      this._asciiBoard = new _fenChessBoard2.default();
      this._renderBoard();
    }
  }, {
    key: '_renderBoard',
    value: function _renderBoard() {
      var ascii = this._asciiBoard.board;
      var board = this._board;
      for (var i = 0; i < ascii.length; i++) {
        var row = board.rows[i];
        for (var j = 0; j < ascii.length; j++) {
          var cell = row.cells[j];
          var asciiChar = ascii[j][i];
          this._updateCell(cell, asciiChar);
        }
      }
    }
  }, {
    key: '_updateCell',
    value: function _updateCell(cell, asciiChar) {
      var currentPiece = cell.querySelector('[ascii]') || { attributes: {} };
      var currentAscii = currentPiece.attributes.ascii;
      var currentUnicode = !!currentPiece.attributes.unicode;
      var unicode = !!this.attributes.unicode;

      // supersimple diff
      if (asciiChar !== currentAscii || unicode !== currentUnicode) {
        (0, _removeChildren2.default)(cell);
        cell.appendChild((0, _templates.getPieceClone)(asciiChar, unicode));
      }
    }

    /**
     * Gets the piece at a square
     *
     * @param {string} square - The square. Eg: "a2"
     * @return {string} piece - the ascii representation of a piece. Eg: "K"
     */

  }, {
    key: 'piece',
    value: function piece(square) {
      this._asciiBoard.piece(square);
      this._renderBoard();
    }

    /**
     * Places a piece in the given square.
     *
     * @param {string} square - The square. Eg: "a2"
     * @param {string} piece - the ascii representation of a piece. Eg: "K"
     */

  }, {
    key: 'put',
    value: function put(square, piece) {
      this._asciiBoard.put(square, piece);
      this._renderBoard();
    }

    /**
     * Removes the piece at the given square.
     *
     * @param {string} square - The square. Eg: "a2"
     */

  }, {
    key: 'clear',
    value: function clear(square) {
      this._asciiBoard.clear(square);
      this._renderBoard();
    }

    /**
     * Moves a piece.
     *
     * @param {string} from - The square to move from. Eg: "a2"
     * @param {string} to - The square to move to. Eg: "a3"
     */

  }, {
    key: 'move',
    value: function move(from, to) {
      this._asciiBoard.move(from, to);
      this._renderBoard();
    }

    /**
     * Set the current position.
     *
     * @param {string} fen - a position string as FEN
     */

  }, {
    key: 'fen',
    set: function set(fen) {
      this._asciiBoard.fen = fen;
      this._renderBoard();
    }

    /**
     * Get the current position as FEN.
     */
    ,
    get: function get() {
      return this._asciiBoard.fen;
    }
  }]);

  return ChessBoard;
}(HTMLElement);

window.ChessBoard = document.registerElement('chess-board', ChessBoard);

},{"./templates":5,"fen-chess-board":2,"remove-children":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPieceClone = getPieceClone;
var owner;
if (window.HTMLImports && !window.HTMLImports.useNative) {
  owner = document._currentScript.ownerDocument;
} else {
  owner = document.currentScript.ownerDocument;
}

var emptySquare = exports.emptySquare = owner.querySelector('#emptyTemplate');

var pieces = exports.pieces = {
  P: owner.querySelector('#whitePawnTemplate'), // ♙ white
  N: owner.querySelector('#whiteKnightTemplate'), // ♘
  B: owner.querySelector('#whiteBishopTemplate'), // ♗
  R: owner.querySelector('#whiteRookTemplate'), // ♖
  Q: owner.querySelector('#whiteQueenTemplate'), // ♕
  K: owner.querySelector('#whiteKingTemplate'), // ♔
  p: owner.querySelector('#blackPawnTemplate'), // ♟ black
  n: owner.querySelector('#blackKnightTemplate'), // ♞
  b: owner.querySelector('#blackBishopTemplate'), // ♝
  r: owner.querySelector('#blackRookTemplate'), // ♜
  q: owner.querySelector('#blackQueenTemplate'), // ♛
  k: owner.querySelector('#blackKingTemplate') // ♚
};

var svgPieces = exports.svgPieces = {
  P: owner.querySelector('#whitePawnSvgTemplate'), // ♙ white
  N: owner.querySelector('#whiteKnightSvgTemplate'), // ♘
  B: owner.querySelector('#whiteBishopSvgTemplate'), // ♗
  R: owner.querySelector('#whiteRookSvgTemplate'), // ♖
  Q: owner.querySelector('#whiteQueenSvgTemplate'), // ♕
  K: owner.querySelector('#whiteKingSvgTemplate'), // ♔
  p: owner.querySelector('#blackPawnSvgTemplate'), // ♟ black
  n: owner.querySelector('#blackKnightSvgTemplate'), // ♞
  b: owner.querySelector('#blackBishopSvgTemplate'), // ♝
  r: owner.querySelector('#blackRookSvgTemplate'), // ♜
  q: owner.querySelector('#blackQueenSvgTemplate'), // ♛
  k: owner.querySelector('#blackKingSvgTemplate') // ♚
};

var template = exports.template = owner.querySelector('#chessBoardTemplate');
var frameTemplate = exports.frameTemplate = owner.querySelector('#chessBoardFrameTemplate');

function getPieceClone(piece) {
  var unicode = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

  var clone = void 0;
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
}

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZmVuLWNoZXNzLWJvYXJkL2xpYi9jaGVzcy11dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9mZW4tY2hlc3MtYm9hcmQvbGliL2Zlbi1jaGVzcy1ib2FyZC5qcyIsIm5vZGVfbW9kdWxlcy9yZW1vdmUtY2hpbGRyZW4vaW5kZXguanMiLCJzcmMvY2hlc3MtYm9hcmQuanMiLCJzcmMvdGVtcGxhdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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TixDQUFvQix3QkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHVCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0IsdUJBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQix5QkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHlCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0IsdUJBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQix3QkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHVCQUFwQixDQUFIO0FBWnVCLENBQVo7O0FBZU4sSUFBTSw4QkFBVyxNQUFNLGFBQU4sQ0FBb0IscUJBQXBCLENBQVg7QUFDTixJQUFNLHdDQUFnQixNQUFNLGFBQU4sQ0FBb0IsMEJBQXBCLENBQWhCOztBQUVOLFNBQVMsYUFBVCxDQUF3QixLQUF4QixFQUFnRDtNQUFqQixnRUFBVSxxQkFBTzs7QUFDckQsTUFBSSxjQUFKLENBRHFEO0FBRXJELE1BQUksT0FBTyxLQUFQLENBQUosRUFBbUI7QUFDakIsUUFBSSxDQUFDLE9BQUQsRUFBVTtBQUNaLGNBQVEsVUFBVSxLQUFWLEVBQWlCLE9BQWpCLENBQXlCLFNBQXpCLENBQW1DLElBQW5DLENBQVIsQ0FEWTtLQUFkLE1BRU87QUFDTCxjQUFRLE9BQU8sS0FBUCxFQUFjLE9BQWQsQ0FBc0IsU0FBdEIsQ0FBZ0MsSUFBaEMsQ0FBUixDQURLO0tBRlA7R0FERixNQU1PO0FBQ0wsWUFBUSxZQUFZLE9BQVosQ0FBb0IsU0FBcEIsQ0FBOEIsSUFBOUIsQ0FBUixDQURLO0dBTlA7QUFTQSxTQUFPLEtBQVAsQ0FYcUQ7Q0FBaEQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5nZXRGaWxlUmFuayA9IGdldEZpbGVSYW5rO1xuZXhwb3J0cy5lbXB0eUJvYXJkID0gZW1wdHlCb2FyZDtcbnZhciByYW5rcyA9IGV4cG9ydHMucmFua3MgPSB7IDE6IDcsIDI6IDYsIDM6IDUsIDQ6IDQsIDU6IDMsIDY6IDIsIDc6IDEsIDg6IDAgfTtcbnZhciBmaWxlcyA9IGV4cG9ydHMuZmlsZXMgPSB7IGE6IDAsIGI6IDEsIGM6IDIsIGQ6IDMsIGU6IDQsIGY6IDUsIGc6IDYsIGg6IDcgfTtcblxuLyoqXG4gKiBSZXR1cm5zIGluZGljZXMgZm9yIGEgY2VsbFxuICogKGNhbiBiZSB1c2VkIHRvIGFjY2VzcyBib2FyZCBhcnJheXMpXG4gKlxuICogRXhhbXBsZTpcbiAqICAgZ2V0RmlsZVJhbmsoXCJhMlwiKSA9PiBbMCwgNl1cbiAqXG4gKiAgIDIgPSA2IGJlY2F1c2UgYXJyYXlzIHVzYWxseSBhcmUgZGlzcGxheWVkIHdpdGggMCwwIGluIHRoZSB1cHBlclxuICogICBsZWZ0IGNvcm5lclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBFZzogXCJhMlwiXG4gKi9cbmZ1bmN0aW9uIGdldEZpbGVSYW5rKHNxdWFyZSkge1xuICB2YXIgX3NxdWFyZSA9IF9zbGljZWRUb0FycmF5KHNxdWFyZSwgMik7XG5cbiAgdmFyIGZpbGUgPSBfc3F1YXJlWzBdO1xuICB2YXIgcmFuayA9IF9zcXVhcmVbMV07XG5cbiAgcmV0dXJuIFtmaWxlc1tmaWxlXSwgcmFua3NbcmFua11dO1xufVxuXG5mdW5jdGlvbiBlbXB0eUJvYXJkKCkge1xuICB2YXIgYm9hcmQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBib2FyZFtpXSA9IFtdO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9jaGVzc1V0aWxzID0gcmVxdWlyZSgnLi9jaGVzcy11dGlscycpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRkVOQm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEZFTkJvYXJkKGZlbikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGRU5Cb2FyZCk7XG5cbiAgICB0aGlzLmJvYXJkID0gKDAsIF9jaGVzc1V0aWxzLmVtcHR5Qm9hcmQpKCk7XG4gICAgdGhpcy5mZW4gPSBmZW47XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcGllY2UgYXQgYSBzcXVhcmVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICogQHJldHVybiB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoRkVOQm9hcmQsIFt7XG4gICAga2V5OiAncGllY2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwaWVjZShzcXVhcmUpIHtcbiAgICAgIHZhciBfZ2V0RmlsZVJhbmsgPSAoMCwgX2NoZXNzVXRpbHMuZ2V0RmlsZVJhbmspKHNxdWFyZSk7XG5cbiAgICAgIHZhciBfZ2V0RmlsZVJhbmsyID0gX3NsaWNlZFRvQXJyYXkoX2dldEZpbGVSYW5rLCAyKTtcblxuICAgICAgdmFyIGZpbGUgPSBfZ2V0RmlsZVJhbmsyWzBdO1xuICAgICAgdmFyIHJhbmsgPSBfZ2V0RmlsZVJhbmsyWzFdO1xuXG4gICAgICByZXR1cm4gdGhpcy5fZ2V0UGllY2UoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxhY2VzIGEgcGllY2UgaW4gdGhlIGdpdmVuIHNxdWFyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlIC0gdGhlIGFzY2lpIHJlcHJlc2VudGF0aW9uIG9mIGEgcGllY2UuIEVnOiBcIktcIlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdwdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwdXQoc3F1YXJlLCBwaWVjZSkge1xuICAgICAgdmFyIF9nZXRGaWxlUmFuazMgPSAoMCwgX2NoZXNzVXRpbHMuZ2V0RmlsZVJhbmspKHNxdWFyZSk7XG5cbiAgICAgIHZhciBfZ2V0RmlsZVJhbms0ID0gX3NsaWNlZFRvQXJyYXkoX2dldEZpbGVSYW5rMywgMik7XG5cbiAgICAgIHZhciBmaWxlID0gX2dldEZpbGVSYW5rNFswXTtcbiAgICAgIHZhciByYW5rID0gX2dldEZpbGVSYW5rNFsxXTtcblxuICAgICAgdGhpcy5fc2V0UGllY2UoZmlsZSwgcmFuaywgcGllY2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIHBpZWNlIGF0IHRoZSBnaXZlbiBzcXVhcmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjbGVhcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKHNxdWFyZSkge1xuICAgICAgdGhpcy5wdXQoc3F1YXJlLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgYSBwaWVjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tIC0gVGhlIHNxdWFyZSB0byBtb3ZlIGZyb20uIEVnOiBcImEyXCJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG8gLSBUaGUgc3F1YXJlIHRvIG1vdmUgdG8uIEVnOiBcImEzXCJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmUoZnJvbSwgdG8pIHtcbiAgICAgIHZhciBwaWVjZSA9IHRoaXMucGllY2UoZnJvbSk7XG4gICAgICBpZiAoIXBpZWNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW92ZSBFcnJvcjogdGhlIGZyb20gc3F1YXJlIHdhcyBlbXB0eScpO1xuICAgICAgfVxuICAgICAgdGhpcy5wdXQodG8sIHBpZWNlKTtcbiAgICAgIHRoaXMuY2xlYXIoZnJvbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZlbiAtIGEgcG9zaXRpb24gc3RyaW5nIGFzIEZFTlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0UGllY2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0UGllY2UoZmlsZSwgcmFuaywgZmVuQ2hhcikge1xuICAgICAgdGhpcy5ib2FyZFtmaWxlXVtyYW5rXSA9IGZlbkNoYXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFBpZWNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFBpZWNlKGZpbGUsIHJhbmspIHtcbiAgICAgIHJldHVybiB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZlbicsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZmVuKSB7XG4gICAgICBpZiAoIWZlbikgcmV0dXJuO1xuICAgICAgaWYgKGZlbiA9PT0gJ3N0YXJ0JykgZmVuID0gJ3JuYnFrYm5yL3BwcHBwcHBwLzgvOC84LzgvUFBQUFBQUFAvUk5CUUtCTlInO1xuXG4gICAgICB2YXIgcmFuayA9IDA7XG4gICAgICB2YXIgZmlsZSA9IDA7XG4gICAgICB2YXIgZmVuSW5kZXggPSAwO1xuXG4gICAgICB2YXIgZmVuQ2hhciA9IHZvaWQgMDtcbiAgICAgIHZhciBjb3VudCA9IHZvaWQgMDtcblxuICAgICAgd2hpbGUgKGZlbkluZGV4IDwgZmVuLmxlbmd0aCkge1xuICAgICAgICBmZW5DaGFyID0gZmVuW2ZlbkluZGV4XTtcblxuICAgICAgICBpZiAoZmVuQ2hhciA9PT0gJyAnKSB7XG4gICAgICAgICAgYnJlYWs7IC8vIGlnbm9yZSB0aGUgcmVzdFxuICAgICAgICB9XG4gICAgICAgIGlmIChmZW5DaGFyID09PSAnLycpIHtcbiAgICAgICAgICByYW5rKys7XG4gICAgICAgICAgZmlsZSA9IDA7XG4gICAgICAgICAgZmVuSW5kZXgrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTihwYXJzZUludChmZW5DaGFyLCAxMCkpKSB7XG4gICAgICAgICAgdGhpcy5fc2V0UGllY2UoZmlsZSwgcmFuaywgZmVuQ2hhcik7XG4gICAgICAgICAgZmlsZSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvdW50ID0gcGFyc2VJbnQoZmVuQ2hhciwgMTApO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fc2V0UGllY2UoZmlsZSwgcmFuaywgJycpO1xuICAgICAgICAgICAgZmlsZSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZlbkluZGV4Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uIGFzIEZFTi5cbiAgICAgKi9cbiAgICAsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgZmVuID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICB2YXIgZW1wdHkgPSAwO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgIHZhciBwaWVjZSA9IHRoaXMuX2dldFBpZWNlKGosIGkpO1xuICAgICAgICAgIGlmIChwaWVjZSkge1xuICAgICAgICAgICAgaWYgKGVtcHR5ID4gMCkge1xuICAgICAgICAgICAgICBmZW4ucHVzaChlbXB0eSk7XG4gICAgICAgICAgICAgIGVtcHR5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZlbi5wdXNoKHBpZWNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW1wdHkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVtcHR5ID4gMCkge1xuICAgICAgICAgIGZlbi5wdXNoKGVtcHR5KTtcbiAgICAgICAgfVxuICAgICAgICBmZW4ucHVzaCgnLycpO1xuICAgICAgfVxuICAgICAgZmVuLnBvcCgpO1xuICAgICAgcmV0dXJuIGZlbi5qb2luKCcnKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRkVOQm9hcmQ7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZFTkJvYXJkOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4gKG5vZGUpIHtcbiAgd2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbiAgfVxufVxuIiwiaW1wb3J0IEZFTkJvYXJkIGZyb20gJ2Zlbi1jaGVzcy1ib2FyZCdcbmltcG9ydCB7IHRlbXBsYXRlLCBmcmFtZVRlbXBsYXRlLCBnZXRQaWVjZUNsb25lIH0gZnJvbSAnLi90ZW1wbGF0ZXMnXG5pbXBvcnQgcmVtb3ZlQ2hpbGRyZW4gZnJvbSAncmVtb3ZlLWNoaWxkcmVuJ1xuXG5jbGFzcyBDaGVzc0JvYXJkIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjcmVhdGVkQ2FsbGJhY2sgKCkge1xuICAgIHRoaXMuX2JvYXJkUm9vdCA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpXG5cbiAgICB2YXIgY2xvbmUgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxuICAgIHRoaXMuX2JvYXJkUm9vdC5hcHBlbmRDaGlsZChjbG9uZSlcblxuICAgIHRoaXMuX2FzY2lpQm9hcmQgPSBuZXcgRkVOQm9hcmQodGhpcy5pbm5lckhUTUwudHJpbSgpKVxuICAgIHRoaXMuX2JvYXJkID0gdGhpcy5fYm9hcmRSb290LnF1ZXJ5U2VsZWN0b3IoJy5jaGVzc0JvYXJkJylcblxuICAgIHRoaXMuX2ZyYW1lUm9vdCA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpXG4gICAgdGhpcy5fZnJhbWVSb290LmFwcGVuZENoaWxkKGZyYW1lVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpXG5cbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpXG5cbiAgICAvKlxuICAgICAqIEEgc3Rpbmt5IGZ1Z2x5IHdvcmthcm91bmQgdG8gcmVkcmF3IHRoZSBib2FyZC5cbiAgICAgKlxuICAgICAqIChDaHJvbWUgMzYvMzgpIFRoZSBjaGVzc2JvYXJkIHdpbGwgbm90IHJvdGF0ZSB3aXRoIGNzcyBpZiBJIGRvIG5vdCBmb3JjZVxuICAgICAqIGEgcmVkcmF3IG9mIHRoZSBjb21wb25lbnQuIEl0J3MgZGlmZmljdWx0IHRvIHJlcHJvZHVjZSBhIG1pbmltYWwgZXhhbXBsZVxuICAgICAqIGZvciBidWdyZXBvcnRzLlxuICAgICAqL1xuICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdydW4taW4nXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgfSwgMClcbiAgICAvLyBlbmQgb2Ygc3Rpbmt5IGZ1Z2x5IHdvcmthcm91bmRcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayAoYXR0cmlidXRlLCBvbGRWYWwsIG5ld1ZhbCkge1xuICAgIGlmIChhdHRyaWJ1dGUgPT09ICd1bmljb2RlJykge1xuICAgICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBib2FyZCB3aXRoIGFuIGVtcHR5IG9uZS5cbiAgICovXG4gIGNsZWFyQm9hcmQgKCkge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQgPSBuZXcgRkVOQm9hcmQoKVxuICAgIHRoaXMuX3JlbmRlckJvYXJkKClcbiAgfVxuXG4gIF9yZW5kZXJCb2FyZCAoKSB7XG4gICAgY29uc3QgYXNjaWkgPSB0aGlzLl9hc2NpaUJvYXJkLmJvYXJkXG4gICAgY29uc3QgYm9hcmQgPSB0aGlzLl9ib2FyZFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXNjaWkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGJvYXJkLnJvd3NbaV1cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXNjaWkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbGV0IGNlbGwgPSByb3cuY2VsbHNbal1cbiAgICAgICAgbGV0IGFzY2lpQ2hhciA9IGFzY2lpW2pdW2ldXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNlbGwoY2VsbCwgYXNjaWlDaGFyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVDZWxsIChjZWxsLCBhc2NpaUNoYXIpIHtcbiAgICBjb25zdCBjdXJyZW50UGllY2UgPSBjZWxsLnF1ZXJ5U2VsZWN0b3IoJ1thc2NpaV0nKSB8fCB7YXR0cmlidXRlczoge319XG4gICAgY29uc3QgY3VycmVudEFzY2lpID0gY3VycmVudFBpZWNlLmF0dHJpYnV0ZXMuYXNjaWlcbiAgICBjb25zdCBjdXJyZW50VW5pY29kZSA9ICEhY3VycmVudFBpZWNlLmF0dHJpYnV0ZXMudW5pY29kZVxuICAgIGNvbnN0IHVuaWNvZGUgPSAhIXRoaXMuYXR0cmlidXRlcy51bmljb2RlXG5cbiAgICAvLyBzdXBlcnNpbXBsZSBkaWZmXG4gICAgaWYgKGFzY2lpQ2hhciAhPT0gY3VycmVudEFzY2lpIHx8IHVuaWNvZGUgIT09IGN1cnJlbnRVbmljb2RlKSB7XG4gICAgICByZW1vdmVDaGlsZHJlbihjZWxsKVxuICAgICAgY2VsbC5hcHBlbmRDaGlsZChnZXRQaWVjZUNsb25lKGFzY2lpQ2hhciwgdW5pY29kZSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBpZWNlIGF0IGEgc3F1YXJlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqIEByZXR1cm4ge3N0cmluZ30gcGllY2UgLSB0aGUgYXNjaWkgcmVwcmVzZW50YXRpb24gb2YgYSBwaWVjZS4gRWc6IFwiS1wiXG4gICAqL1xuICBwaWVjZSAoc3F1YXJlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5waWVjZShzcXVhcmUpXG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICB9XG5cbiAgLyoqXG4gICAqIFBsYWNlcyBhIHBpZWNlIGluIHRoZSBnaXZlbiBzcXVhcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICovXG4gIHB1dCAoc3F1YXJlLCBwaWVjZSkge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQucHV0KHNxdWFyZSwgcGllY2UpXG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHBpZWNlIGF0IHRoZSBnaXZlbiBzcXVhcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqL1xuICBjbGVhciAoc3F1YXJlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5jbGVhcihzcXVhcmUpXG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIGEgcGllY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tIC0gVGhlIHNxdWFyZSB0byBtb3ZlIGZyb20uIEVnOiBcImEyXCJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRvIC0gVGhlIHNxdWFyZSB0byBtb3ZlIHRvLiBFZzogXCJhM1wiXG4gICAqL1xuICBtb3ZlIChmcm9tLCB0bykge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQubW92ZShmcm9tLCB0bylcbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpXG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmVuIC0gYSBwb3NpdGlvbiBzdHJpbmcgYXMgRkVOXG4gICAqL1xuICBzZXQgZmVuIChmZW4pIHtcbiAgICB0aGlzLl9hc2NpaUJvYXJkLmZlbiA9IGZlblxuICAgIHRoaXMuX3JlbmRlckJvYXJkKClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gYXMgRkVOLlxuICAgKi9cbiAgZ2V0IGZlbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FzY2lpQm9hcmQuZmVuXG4gIH1cbn1cblxud2luZG93LkNoZXNzQm9hcmQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2NoZXNzLWJvYXJkJywgQ2hlc3NCb2FyZClcbiIsInZhciBvd25lclxuaWYgKHdpbmRvdy5IVE1MSW1wb3J0cyAmJiAhd2luZG93LkhUTUxJbXBvcnRzLnVzZU5hdGl2ZSkge1xuICBvd25lciA9IGRvY3VtZW50Ll9jdXJyZW50U2NyaXB0Lm93bmVyRG9jdW1lbnRcbn0gZWxzZSB7XG4gIG93bmVyID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5vd25lckRvY3VtZW50XG59XG5cbmV4cG9ydCBjb25zdCBlbXB0eVNxdWFyZSA9IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNlbXB0eVRlbXBsYXRlJylcblxuZXhwb3J0IGNvbnN0IHBpZWNlcyA9IHtcbiAgUDogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUGF3blRlbXBsYXRlJyksICAgICAgLy8g4pmZIHdoaXRlXG4gIE46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtuaWdodFRlbXBsYXRlJyksICAgIC8vIOKZmFxuICBCOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVCaXNob3BUZW1wbGF0ZScpLCAgICAvLyDimZdcbiAgUjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUm9va1RlbXBsYXRlJyksICAgICAgLy8g4pmWXG4gIFE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZVF1ZWVuVGVtcGxhdGUnKSwgICAgIC8vIOKZlVxuICBLOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVLaW5nVGVtcGxhdGUnKSwgICAgICAvLyDimZRcbiAgcDogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUGF3blRlbXBsYXRlJyksICAgICAgLy8g4pmfIGJsYWNrXG4gIG46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tuaWdodFRlbXBsYXRlJyksICAgIC8vIOKZnlxuICBiOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tCaXNob3BUZW1wbGF0ZScpLCAgICAvLyDimZ1cbiAgcjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUm9va1RlbXBsYXRlJyksICAgICAgLy8g4pmcXG4gIHE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja1F1ZWVuVGVtcGxhdGUnKSwgICAgIC8vIOKZm1xuICBrOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tLaW5nVGVtcGxhdGUnKSAgICAgICAvLyDimZpcbn1cblxuZXhwb3J0IGNvbnN0IHN2Z1BpZWNlcyA9IHtcbiAgUDogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUGF3blN2Z1RlbXBsYXRlJyksICAgLy8g4pmZIHdoaXRlXG4gIE46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtuaWdodFN2Z1RlbXBsYXRlJyksIC8vIOKZmFxuICBCOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVCaXNob3BTdmdUZW1wbGF0ZScpLCAvLyDimZdcbiAgUjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUm9va1N2Z1RlbXBsYXRlJyksICAgLy8g4pmWXG4gIFE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZVF1ZWVuU3ZnVGVtcGxhdGUnKSwgIC8vIOKZlVxuICBLOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVLaW5nU3ZnVGVtcGxhdGUnKSwgICAvLyDimZRcbiAgcDogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUGF3blN2Z1RlbXBsYXRlJyksICAgLy8g4pmfIGJsYWNrXG4gIG46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tuaWdodFN2Z1RlbXBsYXRlJyksIC8vIOKZnlxuICBiOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tCaXNob3BTdmdUZW1wbGF0ZScpLCAvLyDimZ1cbiAgcjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUm9va1N2Z1RlbXBsYXRlJyksICAgLy8g4pmcXG4gIHE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja1F1ZWVuU3ZnVGVtcGxhdGUnKSwgIC8vIOKZm1xuICBrOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tLaW5nU3ZnVGVtcGxhdGUnKSAgICAvLyDimZpcbn1cblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gb3duZXIucXVlcnlTZWxlY3RvcignI2NoZXNzQm9hcmRUZW1wbGF0ZScpXG5leHBvcnQgY29uc3QgZnJhbWVUZW1wbGF0ZSA9IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNjaGVzc0JvYXJkRnJhbWVUZW1wbGF0ZScpXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQaWVjZUNsb25lIChwaWVjZSwgdW5pY29kZSA9IGZhbHNlKSB7XG4gIGxldCBjbG9uZVxuICBpZiAocGllY2VzW3BpZWNlXSkge1xuICAgIGlmICghdW5pY29kZSkge1xuICAgICAgY2xvbmUgPSBzdmdQaWVjZXNbcGllY2VdLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb25lID0gcGllY2VzW3BpZWNlXS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjbG9uZSA9IGVtcHR5U3F1YXJlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXG4gIH1cbiAgcmV0dXJuIGNsb25lXG59XG4iXX0=
