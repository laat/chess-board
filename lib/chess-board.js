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
      this.board[rank][file] = fenChar;
    }
  }, {
    key: '_getPiece',
    value: function _getPiece(file, rank) {
      return this.board[rank][file];
    }
  }, {
    key: 'fen',
    set: function set(fen) {
      if (!fen) return;
      if (fen === 'start') fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'; // eslint-disable-line

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

var _removeChildren = require('remove-children');

var _removeChildren2 = _interopRequireDefault(_removeChildren);

var _templates = require('./templates');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChessBoard = function (_HTMLElement) {
  _inherits(ChessBoard, _HTMLElement);

  function ChessBoard() {
    _classCallCheck(this, ChessBoard);

    return _possibleConstructorReturn(this, (ChessBoard.__proto__ || Object.getPrototypeOf(ChessBoard)).apply(this, arguments));
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
    value: function attributeChangedCallback(attribute) {
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
          var asciiChar = ascii[i][j];
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
var owner = void 0;
if (window.HTMLImports && !window.HTMLImports.useNative) {
  owner = document._currentScript.ownerDocument; // eslint-disable-line
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
  k: owner.querySelector('#blackKingTemplate') };

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
  k: owner.querySelector('#blackKingSvgTemplate') };

var template = exports.template = owner.querySelector('#chessBoardTemplate');

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZmVuLWNoZXNzLWJvYXJkL2xpYi9jaGVzcy11dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9mZW4tY2hlc3MtYm9hcmQvbGliL2Zlbi1jaGVzcy1ib2FyZC5qcyIsIm5vZGVfbW9kdWxlcy9yZW1vdmUtY2hpbGRyZW4vaW5kZXguanMiLCJzcmMvY2hlc3MtYm9hcmQuanMiLCJzcmMvdGVtcGxhdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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TixDQUFvQix1QkFBcEIsQ0FQb0IsRUFPNEI7QUFDbkQsS0FBRyxNQUFNLGFBQU4sQ0FBb0IseUJBQXBCLENBUm9CLEVBUTRCO0FBQ25ELEtBQUcsTUFBTSxhQUFOLENBQW9CLHlCQUFwQixDQVRvQixFQVM0QjtBQUNuRCxLQUFHLE1BQU0sYUFBTixDQUFvQix1QkFBcEIsQ0FWb0IsRUFVNEI7QUFDbkQsS0FBRyxNQUFNLGFBQU4sQ0FBb0Isd0JBQXBCLENBWG9CLEVBVzRCO0FBQ25ELEtBQUcsTUFBTSxhQUFOLENBQW9CLHVCQUFwQixDQVpvQixFQUFsQjs7QUFlQSxJQUFNLDhCQUFXLE1BQU0sYUFBTixDQUFvQixxQkFBcEIsQ0FBakI7O0FBRUEsU0FBUyxhQUFULENBQXVCLEtBQXZCLEVBQStDO0FBQUEsTUFBakIsT0FBaUIseURBQVAsS0FBTzs7QUFDcEQsTUFBSSxjQUFKO0FBQ0EsTUFBSSxPQUFPLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixRQUFJLENBQUMsT0FBTCxFQUFjO0FBQ1osY0FBUSxVQUFVLEtBQVYsRUFBaUIsT0FBakIsQ0FBeUIsU0FBekIsQ0FBbUMsSUFBbkMsQ0FBUjtBQUNELEtBRkQsTUFFTztBQUNMLGNBQVEsT0FBTyxLQUFQLEVBQWMsT0FBZCxDQUFzQixTQUF0QixDQUFnQyxJQUFoQyxDQUFSO0FBQ0Q7QUFDRixHQU5ELE1BTU87QUFDTCxZQUFRLFlBQVksT0FBWixDQUFvQixTQUFwQixDQUE4QixJQUE5QixDQUFSO0FBQ0Q7QUFDRCxTQUFPLEtBQVA7QUFDRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmdldEZpbGVSYW5rID0gZ2V0RmlsZVJhbms7XG5leHBvcnRzLmVtcHR5Qm9hcmQgPSBlbXB0eUJvYXJkO1xudmFyIHJhbmtzID0gZXhwb3J0cy5yYW5rcyA9IHsgMTogNywgMjogNiwgMzogNSwgNDogNCwgNTogMywgNjogMiwgNzogMSwgODogMCB9O1xudmFyIGZpbGVzID0gZXhwb3J0cy5maWxlcyA9IHsgYTogMCwgYjogMSwgYzogMiwgZDogMywgZTogNCwgZjogNSwgZzogNiwgaDogNyB9O1xuXG4vKipcbiAqIFJldHVybnMgaW5kaWNlcyBmb3IgYSBjZWxsXG4gKiAoY2FuIGJlIHVzZWQgdG8gYWNjZXNzIGJvYXJkIGFycmF5cylcbiAqXG4gKiBFeGFtcGxlOlxuICogICBnZXRGaWxlUmFuayhcImEyXCIpID0+IFswLCA2XVxuICpcbiAqICAgMiA9IDYgYmVjYXVzZSBhcnJheXMgdXNhbGx5IGFyZSBkaXNwbGF5ZWQgd2l0aCAwLDAgaW4gdGhlIHVwcGVyXG4gKiAgIGxlZnQgY29ybmVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIEVnOiBcImEyXCJcbiAqL1xuZnVuY3Rpb24gZ2V0RmlsZVJhbmsoc3F1YXJlKSB7XG4gIHZhciBfc3F1YXJlID0gX3NsaWNlZFRvQXJyYXkoc3F1YXJlLCAyKTtcblxuICB2YXIgZmlsZSA9IF9zcXVhcmVbMF07XG4gIHZhciByYW5rID0gX3NxdWFyZVsxXTtcblxuICByZXR1cm4gW2ZpbGVzW2ZpbGVdLCByYW5rc1tyYW5rXV07XG59XG5cbmZ1bmN0aW9uIGVtcHR5Qm9hcmQoKSB7XG4gIHZhciBib2FyZCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGJvYXJkW2ldID0gW107XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2NoZXNzVXRpbHMgPSByZXF1aXJlKCcuL2NoZXNzLXV0aWxzJyk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBGRU5Cb2FyZCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRkVOQm9hcmQoZmVuKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZFTkJvYXJkKTtcblxuICAgIHRoaXMuYm9hcmQgPSAoMCwgX2NoZXNzVXRpbHMuZW1wdHlCb2FyZCkoKTtcbiAgICB0aGlzLmZlbiA9IGZlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwaWVjZSBhdCBhIHNxdWFyZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IHBpZWNlIC0gdGhlIGFzY2lpIHJlcHJlc2VudGF0aW9uIG9mIGEgcGllY2UuIEVnOiBcIktcIlxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhGRU5Cb2FyZCwgW3tcbiAgICBrZXk6ICdwaWVjZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBpZWNlKHNxdWFyZSkge1xuICAgICAgdmFyIF9nZXRGaWxlUmFuayA9ICgwLCBfY2hlc3NVdGlscy5nZXRGaWxlUmFuaykoc3F1YXJlKTtcblxuICAgICAgdmFyIF9nZXRGaWxlUmFuazIgPSBfc2xpY2VkVG9BcnJheShfZ2V0RmlsZVJhbmssIDIpO1xuXG4gICAgICB2YXIgZmlsZSA9IF9nZXRGaWxlUmFuazJbMF07XG4gICAgICB2YXIgcmFuayA9IF9nZXRGaWxlUmFuazJbMV07XG5cbiAgICAgIHJldHVybiB0aGlzLl9nZXRQaWVjZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZXMgYSBwaWVjZSBpbiB0aGUgZ2l2ZW4gc3F1YXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGllY2UgLSB0aGUgYXNjaWkgcmVwcmVzZW50YXRpb24gb2YgYSBwaWVjZS4gRWc6IFwiS1wiXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3B1dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHB1dChzcXVhcmUsIHBpZWNlKSB7XG4gICAgICB2YXIgX2dldEZpbGVSYW5rMyA9ICgwLCBfY2hlc3NVdGlscy5nZXRGaWxlUmFuaykoc3F1YXJlKTtcblxuICAgICAgdmFyIF9nZXRGaWxlUmFuazQgPSBfc2xpY2VkVG9BcnJheShfZ2V0RmlsZVJhbmszLCAyKTtcblxuICAgICAgdmFyIGZpbGUgPSBfZ2V0RmlsZVJhbms0WzBdO1xuICAgICAgdmFyIHJhbmsgPSBfZ2V0RmlsZVJhbms0WzFdO1xuXG4gICAgICB0aGlzLl9zZXRQaWVjZShmaWxlLCByYW5rLCBwaWVjZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgcGllY2UgYXQgdGhlIGdpdmVuIHNxdWFyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NsZWFyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoc3F1YXJlKSB7XG4gICAgICB0aGlzLnB1dChzcXVhcmUsICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBhIHBpZWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb20gLSBUaGUgc3F1YXJlIHRvIG1vdmUgZnJvbS4gRWc6IFwiYTJcIlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0byAtIFRoZSBzcXVhcmUgdG8gbW92ZSB0by4gRWc6IFwiYTNcIlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdtb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZShmcm9tLCB0bykge1xuICAgICAgdmFyIHBpZWNlID0gdGhpcy5waWVjZShmcm9tKTtcbiAgICAgIGlmICghcGllY2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb3ZlIEVycm9yOiB0aGUgZnJvbSBzcXVhcmUgd2FzIGVtcHR5Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLnB1dCh0bywgcGllY2UpO1xuICAgICAgdGhpcy5jbGVhcihmcm9tKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmVuIC0gYSBwb3NpdGlvbiBzdHJpbmcgYXMgRkVOXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19zZXRQaWVjZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRQaWVjZShmaWxlLCByYW5rLCBmZW5DaGFyKSB7XG4gICAgICB0aGlzLmJvYXJkW3JhbmtdW2ZpbGVdID0gZmVuQ2hhcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0UGllY2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0UGllY2UoZmlsZSwgcmFuaykge1xuICAgICAgcmV0dXJuIHRoaXMuYm9hcmRbcmFua11bZmlsZV07XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZmVuJyxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChmZW4pIHtcbiAgICAgIGlmICghZmVuKSByZXR1cm47XG4gICAgICBpZiAoZmVuID09PSAnc3RhcnQnKSBmZW4gPSAncm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgdmFyIHJhbmsgPSAwO1xuICAgICAgdmFyIGZpbGUgPSAwO1xuICAgICAgdmFyIGZlbkluZGV4ID0gMDtcblxuICAgICAgdmFyIGZlbkNoYXIgPSB2b2lkIDA7XG4gICAgICB2YXIgY291bnQgPSB2b2lkIDA7XG5cbiAgICAgIHdoaWxlIChmZW5JbmRleCA8IGZlbi5sZW5ndGgpIHtcbiAgICAgICAgZmVuQ2hhciA9IGZlbltmZW5JbmRleF07XG5cbiAgICAgICAgaWYgKGZlbkNoYXIgPT09ICcgJykge1xuICAgICAgICAgIGJyZWFrOyAvLyBpZ25vcmUgdGhlIHJlc3RcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmVuQ2hhciA9PT0gJy8nKSB7XG4gICAgICAgICAgcmFuaysrO1xuICAgICAgICAgIGZpbGUgPSAwO1xuICAgICAgICAgIGZlbkluZGV4Kys7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4ocGFyc2VJbnQoZmVuQ2hhciwgMTApKSkge1xuICAgICAgICAgIHRoaXMuX3NldFBpZWNlKGZpbGUsIHJhbmssIGZlbkNoYXIpO1xuICAgICAgICAgIGZpbGUrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3VudCA9IHBhcnNlSW50KGZlbkNoYXIsIDEwKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFBpZWNlKGZpbGUsIHJhbmssICcnKTtcbiAgICAgICAgICAgIGZpbGUrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmZW5JbmRleCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBwb3NpdGlvbiBhcyBGRU4uXG4gICAgICovXG4gICAgLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIGZlbiA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgdmFyIGVtcHR5ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICB2YXIgcGllY2UgPSB0aGlzLl9nZXRQaWVjZShqLCBpKTtcbiAgICAgICAgICBpZiAocGllY2UpIHtcbiAgICAgICAgICAgIGlmIChlbXB0eSA+IDApIHtcbiAgICAgICAgICAgICAgZmVuLnB1c2goZW1wdHkpO1xuICAgICAgICAgICAgICBlbXB0eSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmZW4ucHVzaChwaWVjZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVtcHR5Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbXB0eSA+IDApIHtcbiAgICAgICAgICBmZW4ucHVzaChlbXB0eSk7XG4gICAgICAgIH1cbiAgICAgICAgZmVuLnB1c2goJy8nKTtcbiAgICAgIH1cbiAgICAgIGZlbi5wb3AoKTtcbiAgICAgIHJldHVybiBmZW4uam9pbignJyk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZFTkJvYXJkO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGRU5Cb2FyZDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuIChub2RlKSB7XG4gIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gIH1cbn1cbiIsImltcG9ydCBGRU5Cb2FyZCBmcm9tICdmZW4tY2hlc3MtYm9hcmQnO1xuaW1wb3J0IHJlbW92ZUNoaWxkcmVuIGZyb20gJ3JlbW92ZS1jaGlsZHJlbic7XG5pbXBvcnQgeyB0ZW1wbGF0ZSwgZ2V0UGllY2VDbG9uZSB9IGZyb20gJy4vdGVtcGxhdGVzJztcblxuY2xhc3MgQ2hlc3NCb2FyZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX2JvYXJkUm9vdCA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpO1xuXG4gICAgY29uc3QgY2xvbmUgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLl9ib2FyZFJvb3QuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuXG4gICAgdGhpcy5fYXNjaWlCb2FyZCA9IG5ldyBGRU5Cb2FyZCh0aGlzLmlubmVySFRNTC50cmltKCkpO1xuICAgIHRoaXMuX2JvYXJkID0gdGhpcy5fYm9hcmRSb290LnF1ZXJ5U2VsZWN0b3IoJy5jaGVzc0JvYXJkJyk7XG5cbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpO1xuXG4gICAgLypcbiAgICAgKiBBIHN0aW5reSBmdWdseSB3b3JrYXJvdW5kIHRvIHJlZHJhdyB0aGUgYm9hcmQuXG4gICAgICpcbiAgICAgKiAoQ2hyb21lIDM2LzM4KSBUaGUgY2hlc3Nib2FyZCB3aWxsIG5vdCByb3RhdGUgd2l0aCBjc3MgaWYgSSBkbyBub3QgZm9yY2VcbiAgICAgKiBhIHJlZHJhdyBvZiB0aGUgY29tcG9uZW50LiBJdCdzIGRpZmZpY3VsdCB0byByZXByb2R1Y2UgYSBtaW5pbWFsIGV4YW1wbGVcbiAgICAgKiBmb3IgYnVncmVwb3J0cy5cbiAgICAgKi9cbiAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAncnVuLWluJztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSwgMCk7XG4gICAgLy8gZW5kIG9mIHN0aW5reSBmdWdseSB3b3JrYXJvdW5kXG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlKSB7XG4gICAgaWYgKGF0dHJpYnV0ZSA9PT0gJ3VuaWNvZGUnKSB7XG4gICAgICB0aGlzLl9yZW5kZXJCb2FyZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBib2FyZCB3aXRoIGFuIGVtcHR5IG9uZS5cbiAgICovXG4gIGNsZWFyQm9hcmQoKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZCA9IG5ldyBGRU5Cb2FyZCgpO1xuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gIH1cblxuICBfcmVuZGVyQm9hcmQoKSB7XG4gICAgY29uc3QgYXNjaWkgPSB0aGlzLl9hc2NpaUJvYXJkLmJvYXJkO1xuICAgIGNvbnN0IGJvYXJkID0gdGhpcy5fYm9hcmQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhc2NpaS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gYm9hcmQucm93c1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXNjaWkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHJvdy5jZWxsc1tqXTtcbiAgICAgICAgY29uc3QgYXNjaWlDaGFyID0gYXNjaWlbaV1bal07XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNlbGwoY2VsbCwgYXNjaWlDaGFyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfdXBkYXRlQ2VsbChjZWxsLCBhc2NpaUNoYXIpIHtcbiAgICBjb25zdCBjdXJyZW50UGllY2UgPSBjZWxsLnF1ZXJ5U2VsZWN0b3IoJ1thc2NpaV0nKSB8fCB7IGF0dHJpYnV0ZXM6IHt9IH07XG4gICAgY29uc3QgY3VycmVudEFzY2lpID0gY3VycmVudFBpZWNlLmF0dHJpYnV0ZXMuYXNjaWk7XG4gICAgY29uc3QgY3VycmVudFVuaWNvZGUgPSAhIWN1cnJlbnRQaWVjZS5hdHRyaWJ1dGVzLnVuaWNvZGU7XG4gICAgY29uc3QgdW5pY29kZSA9ICEhdGhpcy5hdHRyaWJ1dGVzLnVuaWNvZGU7XG5cbiAgICAvLyBzdXBlcnNpbXBsZSBkaWZmXG4gICAgaWYgKGFzY2lpQ2hhciAhPT0gY3VycmVudEFzY2lpIHx8IHVuaWNvZGUgIT09IGN1cnJlbnRVbmljb2RlKSB7XG4gICAgICByZW1vdmVDaGlsZHJlbihjZWxsKTtcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZ2V0UGllY2VDbG9uZShhc2NpaUNoYXIsIHVuaWNvZGUpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcGllY2UgYXQgYSBzcXVhcmVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICogQHJldHVybiB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICovXG4gIHBpZWNlKHNxdWFyZSkge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQucGllY2Uoc3F1YXJlKTtcbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYWNlcyBhIHBpZWNlIGluIHRoZSBnaXZlbiBzcXVhcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICovXG4gIHB1dChzcXVhcmUsIHBpZWNlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5wdXQoc3F1YXJlLCBwaWVjZSk7XG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBwaWVjZSBhdCB0aGUgZ2l2ZW4gc3F1YXJlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgKi9cbiAgY2xlYXIoc3F1YXJlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5jbGVhcihzcXVhcmUpO1xuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgYSBwaWVjZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZyb20gLSBUaGUgc3F1YXJlIHRvIG1vdmUgZnJvbS4gRWc6IFwiYTJcIlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG8gLSBUaGUgc3F1YXJlIHRvIG1vdmUgdG8uIEVnOiBcImEzXCJcbiAgICovXG4gIG1vdmUoZnJvbSwgdG8pIHtcbiAgICB0aGlzLl9hc2NpaUJvYXJkLm1vdmUoZnJvbSwgdG8pO1xuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmVuIC0gYSBwb3NpdGlvbiBzdHJpbmcgYXMgRkVOXG4gICAqL1xuICBzZXQgZmVuKGZlbikge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQuZmVuID0gZmVuO1xuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uIGFzIEZFTi5cbiAgICovXG4gIGdldCBmZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FzY2lpQm9hcmQuZmVuO1xuICB9XG59XG5cbndpbmRvdy5DaGVzc0JvYXJkID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdjaGVzcy1ib2FyZCcsIENoZXNzQm9hcmQpO1xuIiwibGV0IG93bmVyO1xuaWYgKHdpbmRvdy5IVE1MSW1wb3J0cyAmJiAhd2luZG93LkhUTUxJbXBvcnRzLnVzZU5hdGl2ZSkge1xuICBvd25lciA9IGRvY3VtZW50Ll9jdXJyZW50U2NyaXB0Lm93bmVyRG9jdW1lbnQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbn0gZWxzZSB7XG4gIG93bmVyID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5vd25lckRvY3VtZW50O1xufVxuXG5leHBvcnQgY29uc3QgZW1wdHlTcXVhcmUgPSBvd25lci5xdWVyeVNlbGVjdG9yKCcjZW1wdHlUZW1wbGF0ZScpO1xuXG5leHBvcnQgY29uc3QgcGllY2VzID0ge1xuICBQOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVQYXduVGVtcGxhdGUnKSwgICAgICAvLyDimZkgd2hpdGVcbiAgTjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlS25pZ2h0VGVtcGxhdGUnKSwgICAgLy8g4pmYXG4gIEI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUJpc2hvcFRlbXBsYXRlJyksICAgIC8vIOKZl1xuICBSOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVSb29rVGVtcGxhdGUnKSwgICAgICAvLyDimZZcbiAgUTogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUXVlZW5UZW1wbGF0ZScpLCAgICAgLy8g4pmVXG4gIEs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtpbmdUZW1wbGF0ZScpLCAgICAgIC8vIOKZlFxuICBwOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tQYXduVGVtcGxhdGUnKSwgICAgICAvLyDimZ8gYmxhY2tcbiAgbjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrS25pZ2h0VGVtcGxhdGUnKSwgICAgLy8g4pmeXG4gIGI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0Jpc2hvcFRlbXBsYXRlJyksICAgIC8vIOKZnVxuICByOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tSb29rVGVtcGxhdGUnKSwgICAgICAvLyDimZxcbiAgcTogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUXVlZW5UZW1wbGF0ZScpLCAgICAgLy8g4pmbXG4gIGs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tpbmdUZW1wbGF0ZScpLCAgICAgIC8vIOKZmlxufTtcblxuZXhwb3J0IGNvbnN0IHN2Z1BpZWNlcyA9IHtcbiAgUDogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUGF3blN2Z1RlbXBsYXRlJyksICAgLy8g4pmZIHdoaXRlXG4gIE46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtuaWdodFN2Z1RlbXBsYXRlJyksIC8vIOKZmFxuICBCOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVCaXNob3BTdmdUZW1wbGF0ZScpLCAvLyDimZdcbiAgUjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUm9va1N2Z1RlbXBsYXRlJyksICAgLy8g4pmWXG4gIFE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZVF1ZWVuU3ZnVGVtcGxhdGUnKSwgIC8vIOKZlVxuICBLOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVLaW5nU3ZnVGVtcGxhdGUnKSwgICAvLyDimZRcbiAgcDogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUGF3blN2Z1RlbXBsYXRlJyksICAgLy8g4pmfIGJsYWNrXG4gIG46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tuaWdodFN2Z1RlbXBsYXRlJyksIC8vIOKZnlxuICBiOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tCaXNob3BTdmdUZW1wbGF0ZScpLCAvLyDimZ1cbiAgcjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUm9va1N2Z1RlbXBsYXRlJyksICAgLy8g4pmcXG4gIHE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja1F1ZWVuU3ZnVGVtcGxhdGUnKSwgIC8vIOKZm1xuICBrOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tLaW5nU3ZnVGVtcGxhdGUnKSwgICAvLyDimZpcbn07XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNjaGVzc0JvYXJkVGVtcGxhdGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBpZWNlQ2xvbmUocGllY2UsIHVuaWNvZGUgPSBmYWxzZSkge1xuICBsZXQgY2xvbmU7XG4gIGlmIChwaWVjZXNbcGllY2VdKSB7XG4gICAgaWYgKCF1bmljb2RlKSB7XG4gICAgICBjbG9uZSA9IHN2Z1BpZWNlc1twaWVjZV0uY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb25lID0gcGllY2VzW3BpZWNlXS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY2xvbmUgPSBlbXB0eVNxdWFyZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICByZXR1cm4gY2xvbmU7XG59XG4iXX0=
