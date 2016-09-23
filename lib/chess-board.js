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
      // reset board
      this.board.forEach(function (r) {
        r.length = 0;
      }); // eslint-disable-line no-param-reassign

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

      // Observe innerHTML for new FEN-strings;
      var observer = new MutationObserver(function () {
        _this2.fen = _this2.innerHTML.trim();
      });
      observer.observe(this, { subtree: true, characterData: true });

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZmVuLWNoZXNzLWJvYXJkL2xpYi9jaGVzcy11dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9mZW4tY2hlc3MtYm9hcmQvbGliL2Zlbi1jaGVzcy1ib2FyZC5qcyIsIm5vZGVfbW9kdWxlcy9yZW1vdmUtY2hpbGRyZW4vaW5kZXguanMiLCJzcmMvY2hlc3MtYm9hcmQuanMiLCJzcmMvdGVtcGxhdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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Um9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxuZXhwb3J0cy5nZXRGaWxlUmFuayA9IGdldEZpbGVSYW5rO1xuZXhwb3J0cy5lbXB0eUJvYXJkID0gZW1wdHlCb2FyZDtcbnZhciByYW5rcyA9IGV4cG9ydHMucmFua3MgPSB7IDE6IDcsIDI6IDYsIDM6IDUsIDQ6IDQsIDU6IDMsIDY6IDIsIDc6IDEsIDg6IDAgfTtcbnZhciBmaWxlcyA9IGV4cG9ydHMuZmlsZXMgPSB7IGE6IDAsIGI6IDEsIGM6IDIsIGQ6IDMsIGU6IDQsIGY6IDUsIGc6IDYsIGg6IDcgfTtcblxuLyoqXG4gKiBSZXR1cm5zIGluZGljZXMgZm9yIGEgY2VsbFxuICogKGNhbiBiZSB1c2VkIHRvIGFjY2VzcyBib2FyZCBhcnJheXMpXG4gKlxuICogRXhhbXBsZTpcbiAqICAgZ2V0RmlsZVJhbmsoXCJhMlwiKSA9PiBbMCwgNl1cbiAqXG4gKiAgIDIgPSA2IGJlY2F1c2UgYXJyYXlzIHVzYWxseSBhcmUgZGlzcGxheWVkIHdpdGggMCwwIGluIHRoZSB1cHBlclxuICogICBsZWZ0IGNvcm5lclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBFZzogXCJhMlwiXG4gKi9cbmZ1bmN0aW9uIGdldEZpbGVSYW5rKHNxdWFyZSkge1xuICB2YXIgX3NxdWFyZSA9IF9zbGljZWRUb0FycmF5KHNxdWFyZSwgMik7XG5cbiAgdmFyIGZpbGUgPSBfc3F1YXJlWzBdO1xuICB2YXIgcmFuayA9IF9zcXVhcmVbMV07XG5cbiAgcmV0dXJuIFtmaWxlc1tmaWxlXSwgcmFua3NbcmFua11dO1xufVxuXG5mdW5jdGlvbiBlbXB0eUJvYXJkKCkge1xuICB2YXIgYm9hcmQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICBib2FyZFtpXSA9IFtdO1xuICB9XG4gIHJldHVybiBib2FyZDtcbn0iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfc2xpY2VkVG9BcnJheSA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHsgdmFyIF9hcnIgPSBbXTsgdmFyIF9uID0gdHJ1ZTsgdmFyIF9kID0gZmFsc2U7IHZhciBfZSA9IHVuZGVmaW5lZDsgdHJ5IHsgZm9yICh2YXIgX2kgPSBhcnJbU3ltYm9sLml0ZXJhdG9yXSgpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkgeyBfYXJyLnB1c2goX3MudmFsdWUpOyBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7IH0gfSBjYXRjaCAoZXJyKSB7IF9kID0gdHJ1ZTsgX2UgPSBlcnI7IH0gZmluYWxseSB7IHRyeSB7IGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7IH0gZmluYWxseSB7IGlmIChfZCkgdGhyb3cgX2U7IH0gfSByZXR1cm4gX2FycjsgfSByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IHJldHVybiBhcnI7IH0gZWxzZSBpZiAoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKSB7IHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7IH0gZWxzZSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpOyB9IH07IH0oKTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9jaGVzc1V0aWxzID0gcmVxdWlyZSgnLi9jaGVzcy11dGlscycpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRkVOQm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEZFTkJvYXJkKGZlbikge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBGRU5Cb2FyZCk7XG5cbiAgICB0aGlzLmJvYXJkID0gKDAsIF9jaGVzc1V0aWxzLmVtcHR5Qm9hcmQpKCk7XG4gICAgdGhpcy5mZW4gPSBmZW47XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcGllY2UgYXQgYSBzcXVhcmVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICogQHJldHVybiB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoRkVOQm9hcmQsIFt7XG4gICAga2V5OiAncGllY2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwaWVjZShzcXVhcmUpIHtcbiAgICAgIHZhciBfZ2V0RmlsZVJhbmsgPSAoMCwgX2NoZXNzVXRpbHMuZ2V0RmlsZVJhbmspKHNxdWFyZSk7XG5cbiAgICAgIHZhciBfZ2V0RmlsZVJhbmsyID0gX3NsaWNlZFRvQXJyYXkoX2dldEZpbGVSYW5rLCAyKTtcblxuICAgICAgdmFyIGZpbGUgPSBfZ2V0RmlsZVJhbmsyWzBdO1xuICAgICAgdmFyIHJhbmsgPSBfZ2V0RmlsZVJhbmsyWzFdO1xuXG4gICAgICByZXR1cm4gdGhpcy5fZ2V0UGllY2UoZmlsZSwgcmFuayk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGxhY2VzIGEgcGllY2UgaW4gdGhlIGdpdmVuIHNxdWFyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlIC0gdGhlIGFzY2lpIHJlcHJlc2VudGF0aW9uIG9mIGEgcGllY2UuIEVnOiBcIktcIlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdwdXQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBwdXQoc3F1YXJlLCBwaWVjZSkge1xuICAgICAgdmFyIF9nZXRGaWxlUmFuazMgPSAoMCwgX2NoZXNzVXRpbHMuZ2V0RmlsZVJhbmspKHNxdWFyZSk7XG5cbiAgICAgIHZhciBfZ2V0RmlsZVJhbms0ID0gX3NsaWNlZFRvQXJyYXkoX2dldEZpbGVSYW5rMywgMik7XG5cbiAgICAgIHZhciBmaWxlID0gX2dldEZpbGVSYW5rNFswXTtcbiAgICAgIHZhciByYW5rID0gX2dldEZpbGVSYW5rNFsxXTtcblxuICAgICAgdGhpcy5fc2V0UGllY2UoZmlsZSwgcmFuaywgcGllY2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIHBpZWNlIGF0IHRoZSBnaXZlbiBzcXVhcmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdjbGVhcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNsZWFyKHNxdWFyZSkge1xuICAgICAgdGhpcy5wdXQoc3F1YXJlLCAnJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZXMgYSBwaWVjZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tIC0gVGhlIHNxdWFyZSB0byBtb3ZlIGZyb20uIEVnOiBcImEyXCJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdG8gLSBUaGUgc3F1YXJlIHRvIG1vdmUgdG8uIEVnOiBcImEzXCJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnbW92ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG1vdmUoZnJvbSwgdG8pIHtcbiAgICAgIHZhciBwaWVjZSA9IHRoaXMucGllY2UoZnJvbSk7XG4gICAgICBpZiAoIXBpZWNlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTW92ZSBFcnJvcjogdGhlIGZyb20gc3F1YXJlIHdhcyBlbXB0eScpO1xuICAgICAgfVxuICAgICAgdGhpcy5wdXQodG8sIHBpZWNlKTtcbiAgICAgIHRoaXMuY2xlYXIoZnJvbSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZlbiAtIGEgcG9zaXRpb24gc3RyaW5nIGFzIEZFTlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0UGllY2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0UGllY2UoZmlsZSwgcmFuaywgZmVuQ2hhcikge1xuICAgICAgdGhpcy5ib2FyZFtyYW5rXVtmaWxlXSA9IGZlbkNoYXI7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2dldFBpZWNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2dldFBpZWNlKGZpbGUsIHJhbmspIHtcbiAgICAgIHJldHVybiB0aGlzLmJvYXJkW3JhbmtdW2ZpbGVdO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2ZlbicsXG4gICAgc2V0OiBmdW5jdGlvbiBzZXQoZmVuKSB7XG4gICAgICAvLyByZXNldCBib2FyZFxuICAgICAgdGhpcy5ib2FyZC5mb3JFYWNoKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIHIubGVuZ3RoID0gMDtcbiAgICAgIH0pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG5cbiAgICAgIGlmICghZmVuKSByZXR1cm47XG4gICAgICBpZiAoZmVuID09PSAnc3RhcnQnKSBmZW4gPSAncm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgICAgdmFyIHJhbmsgPSAwO1xuICAgICAgdmFyIGZpbGUgPSAwO1xuICAgICAgdmFyIGZlbkluZGV4ID0gMDtcblxuICAgICAgdmFyIGZlbkNoYXIgPSB2b2lkIDA7XG4gICAgICB2YXIgY291bnQgPSB2b2lkIDA7XG5cbiAgICAgIHdoaWxlIChmZW5JbmRleCA8IGZlbi5sZW5ndGgpIHtcbiAgICAgICAgZmVuQ2hhciA9IGZlbltmZW5JbmRleF07XG5cbiAgICAgICAgaWYgKGZlbkNoYXIgPT09ICcgJykge1xuICAgICAgICAgIGJyZWFrOyAvLyBpZ25vcmUgdGhlIHJlc3RcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmVuQ2hhciA9PT0gJy8nKSB7XG4gICAgICAgICAgcmFuaysrO1xuICAgICAgICAgIGZpbGUgPSAwO1xuICAgICAgICAgIGZlbkluZGV4Kys7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNOYU4ocGFyc2VJbnQoZmVuQ2hhciwgMTApKSkge1xuICAgICAgICAgIHRoaXMuX3NldFBpZWNlKGZpbGUsIHJhbmssIGZlbkNoYXIpO1xuICAgICAgICAgIGZpbGUrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3VudCA9IHBhcnNlSW50KGZlbkNoYXIsIDEwKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX3NldFBpZWNlKGZpbGUsIHJhbmssICcnKTtcbiAgICAgICAgICAgIGZpbGUrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmZW5JbmRleCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgY3VycmVudCBwb3NpdGlvbiBhcyBGRU4uXG4gICAgICovXG4gICAgLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgdmFyIGZlbiA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgdmFyIGVtcHR5ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA4OyBqKyspIHtcbiAgICAgICAgICB2YXIgcGllY2UgPSB0aGlzLl9nZXRQaWVjZShqLCBpKTtcbiAgICAgICAgICBpZiAocGllY2UpIHtcbiAgICAgICAgICAgIGlmIChlbXB0eSA+IDApIHtcbiAgICAgICAgICAgICAgZmVuLnB1c2goZW1wdHkpO1xuICAgICAgICAgICAgICBlbXB0eSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmZW4ucHVzaChwaWVjZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVtcHR5Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChlbXB0eSA+IDApIHtcbiAgICAgICAgICBmZW4ucHVzaChlbXB0eSk7XG4gICAgICAgIH1cbiAgICAgICAgZmVuLnB1c2goJy8nKTtcbiAgICAgIH1cbiAgICAgIGZlbi5wb3AoKTtcbiAgICAgIHJldHVybiBmZW4uam9pbignJyk7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEZFTkJvYXJkO1xufSgpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBGRU5Cb2FyZDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlbW92ZUNoaWxkcmVuIChub2RlKSB7XG4gIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gIH1cbn1cbiIsImltcG9ydCBGRU5Cb2FyZCBmcm9tICdmZW4tY2hlc3MtYm9hcmQnO1xuaW1wb3J0IHJlbW92ZUNoaWxkcmVuIGZyb20gJ3JlbW92ZS1jaGlsZHJlbic7XG5pbXBvcnQgeyB0ZW1wbGF0ZSwgZ2V0UGllY2VDbG9uZSB9IGZyb20gJy4vdGVtcGxhdGVzJztcblxuY2xhc3MgQ2hlc3NCb2FyZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY3JlYXRlZENhbGxiYWNrKCkge1xuICAgIHRoaXMuX2JvYXJkUm9vdCA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpO1xuXG4gICAgY29uc3QgY2xvbmUgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICB0aGlzLl9ib2FyZFJvb3QuYXBwZW5kQ2hpbGQoY2xvbmUpO1xuXG4gICAgdGhpcy5fYXNjaWlCb2FyZCA9IG5ldyBGRU5Cb2FyZCh0aGlzLmlubmVySFRNTC50cmltKCkpO1xuICAgIHRoaXMuX2JvYXJkID0gdGhpcy5fYm9hcmRSb290LnF1ZXJ5U2VsZWN0b3IoJy5jaGVzc0JvYXJkJyk7XG5cbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpO1xuXG4gICAgLy8gT2JzZXJ2ZSBpbm5lckhUTUwgZm9yIG5ldyBGRU4tc3RyaW5ncztcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgIHRoaXMuZmVuID0gdGhpcy5pbm5lckhUTUwudHJpbSgpO1xuICAgIH0pO1xuICAgIG9ic2VydmVyLm9ic2VydmUodGhpcywgeyBzdWJ0cmVlOiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlIH0pO1xuXG4gICAgLypcbiAgICAgKiBBIHN0aW5reSBmdWdseSB3b3JrYXJvdW5kIHRvIHJlZHJhdyB0aGUgYm9hcmQuXG4gICAgICpcbiAgICAgKiAoQ2hyb21lIDM2LzM4KSBUaGUgY2hlc3Nib2FyZCB3aWxsIG5vdCByb3RhdGUgd2l0aCBjc3MgaWYgSSBkbyBub3QgZm9yY2VcbiAgICAgKiBhIHJlZHJhdyBvZiB0aGUgY29tcG9uZW50LiBJdCdzIGRpZmZpY3VsdCB0byByZXByb2R1Y2UgYSBtaW5pbWFsIGV4YW1wbGVcbiAgICAgKiBmb3IgYnVncmVwb3J0cy5cbiAgICAgKi9cbiAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAncnVuLWluJztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSwgMCk7XG4gICAgLy8gZW5kIG9mIHN0aW5reSBmdWdseSB3b3JrYXJvdW5kXG4gIH1cblxuICBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2soYXR0cmlidXRlKSB7XG4gICAgaWYgKGF0dHJpYnV0ZSA9PT0gJ3VuaWNvZGUnKSB7XG4gICAgICB0aGlzLl9yZW5kZXJCb2FyZCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBib2FyZCB3aXRoIGFuIGVtcHR5IG9uZS5cbiAgICovXG4gIGNsZWFyQm9hcmQoKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZCA9IG5ldyBGRU5Cb2FyZCgpO1xuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gIH1cblxuICBfcmVuZGVyQm9hcmQoKSB7XG4gICAgY29uc3QgYXNjaWkgPSB0aGlzLl9hc2NpaUJvYXJkLmJvYXJkO1xuICAgIGNvbnN0IGJvYXJkID0gdGhpcy5fYm9hcmQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhc2NpaS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gYm9hcmQucm93c1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXNjaWkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHJvdy5jZWxsc1tqXTtcbiAgICAgICAgY29uc3QgYXNjaWlDaGFyID0gYXNjaWlbaV1bal07XG4gICAgICAgIHRoaXMuX3VwZGF0ZUNlbGwoY2VsbCwgYXNjaWlDaGFyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfdXBkYXRlQ2VsbChjZWxsLCBhc2NpaUNoYXIpIHtcbiAgICBjb25zdCBjdXJyZW50UGllY2UgPSBjZWxsLnF1ZXJ5U2VsZWN0b3IoJ1thc2NpaV0nKSB8fCB7IGF0dHJpYnV0ZXM6IHt9IH07XG4gICAgY29uc3QgY3VycmVudEFzY2lpID0gY3VycmVudFBpZWNlLmF0dHJpYnV0ZXMuYXNjaWk7XG4gICAgY29uc3QgY3VycmVudFVuaWNvZGUgPSAhIWN1cnJlbnRQaWVjZS5hdHRyaWJ1dGVzLnVuaWNvZGU7XG4gICAgY29uc3QgdW5pY29kZSA9ICEhdGhpcy5hdHRyaWJ1dGVzLnVuaWNvZGU7XG5cbiAgICAvLyBzdXBlcnNpbXBsZSBkaWZmXG4gICAgaWYgKGFzY2lpQ2hhciAhPT0gY3VycmVudEFzY2lpIHx8IHVuaWNvZGUgIT09IGN1cnJlbnRVbmljb2RlKSB7XG4gICAgICByZW1vdmVDaGlsZHJlbihjZWxsKTtcbiAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoZ2V0UGllY2VDbG9uZShhc2NpaUNoYXIsIHVuaWNvZGUpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcGllY2UgYXQgYSBzcXVhcmVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICogQHJldHVybiB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICovXG4gIHBpZWNlKHNxdWFyZSkge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQucGllY2Uoc3F1YXJlKTtcbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBsYWNlcyBhIHBpZWNlIGluIHRoZSBnaXZlbiBzcXVhcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICovXG4gIHB1dChzcXVhcmUsIHBpZWNlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5wdXQoc3F1YXJlLCBwaWVjZSk7XG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBwaWVjZSBhdCB0aGUgZ2l2ZW4gc3F1YXJlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgKi9cbiAgY2xlYXIoc3F1YXJlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5jbGVhcihzcXVhcmUpO1xuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgYSBwaWVjZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZyb20gLSBUaGUgc3F1YXJlIHRvIG1vdmUgZnJvbS4gRWc6IFwiYTJcIlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG8gLSBUaGUgc3F1YXJlIHRvIG1vdmUgdG8uIEVnOiBcImEzXCJcbiAgICovXG4gIG1vdmUoZnJvbSwgdG8pIHtcbiAgICB0aGlzLl9hc2NpaUJvYXJkLm1vdmUoZnJvbSwgdG8pO1xuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmVuIC0gYSBwb3NpdGlvbiBzdHJpbmcgYXMgRkVOXG4gICAqL1xuICBzZXQgZmVuKGZlbikge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQuZmVuID0gZmVuO1xuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uIGFzIEZFTi5cbiAgICovXG4gIGdldCBmZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FzY2lpQm9hcmQuZmVuO1xuICB9XG59XG5cbndpbmRvdy5DaGVzc0JvYXJkID0gZG9jdW1lbnQucmVnaXN0ZXJFbGVtZW50KCdjaGVzcy1ib2FyZCcsIENoZXNzQm9hcmQpO1xuIiwibGV0IG93bmVyO1xuaWYgKHdpbmRvdy5IVE1MSW1wb3J0cyAmJiAhd2luZG93LkhUTUxJbXBvcnRzLnVzZU5hdGl2ZSkge1xuICBvd25lciA9IGRvY3VtZW50Ll9jdXJyZW50U2NyaXB0Lm93bmVyRG9jdW1lbnQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbn0gZWxzZSB7XG4gIG93bmVyID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5vd25lckRvY3VtZW50O1xufVxuXG5leHBvcnQgY29uc3QgZW1wdHlTcXVhcmUgPSBvd25lci5xdWVyeVNlbGVjdG9yKCcjZW1wdHlUZW1wbGF0ZScpO1xuXG5leHBvcnQgY29uc3QgcGllY2VzID0ge1xuICBQOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVQYXduVGVtcGxhdGUnKSwgICAgICAvLyDimZkgd2hpdGVcbiAgTjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlS25pZ2h0VGVtcGxhdGUnKSwgICAgLy8g4pmYXG4gIEI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUJpc2hvcFRlbXBsYXRlJyksICAgIC8vIOKZl1xuICBSOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVSb29rVGVtcGxhdGUnKSwgICAgICAvLyDimZZcbiAgUTogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUXVlZW5UZW1wbGF0ZScpLCAgICAgLy8g4pmVXG4gIEs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtpbmdUZW1wbGF0ZScpLCAgICAgIC8vIOKZlFxuICBwOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tQYXduVGVtcGxhdGUnKSwgICAgICAvLyDimZ8gYmxhY2tcbiAgbjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrS25pZ2h0VGVtcGxhdGUnKSwgICAgLy8g4pmeXG4gIGI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0Jpc2hvcFRlbXBsYXRlJyksICAgIC8vIOKZnVxuICByOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tSb29rVGVtcGxhdGUnKSwgICAgICAvLyDimZxcbiAgcTogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUXVlZW5UZW1wbGF0ZScpLCAgICAgLy8g4pmbXG4gIGs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tpbmdUZW1wbGF0ZScpLCAgICAgIC8vIOKZmlxufTtcblxuZXhwb3J0IGNvbnN0IHN2Z1BpZWNlcyA9IHtcbiAgUDogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUGF3blN2Z1RlbXBsYXRlJyksICAgLy8g4pmZIHdoaXRlXG4gIE46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtuaWdodFN2Z1RlbXBsYXRlJyksIC8vIOKZmFxuICBCOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVCaXNob3BTdmdUZW1wbGF0ZScpLCAvLyDimZdcbiAgUjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUm9va1N2Z1RlbXBsYXRlJyksICAgLy8g4pmWXG4gIFE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZVF1ZWVuU3ZnVGVtcGxhdGUnKSwgIC8vIOKZlVxuICBLOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVLaW5nU3ZnVGVtcGxhdGUnKSwgICAvLyDimZRcbiAgcDogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUGF3blN2Z1RlbXBsYXRlJyksICAgLy8g4pmfIGJsYWNrXG4gIG46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tuaWdodFN2Z1RlbXBsYXRlJyksIC8vIOKZnlxuICBiOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tCaXNob3BTdmdUZW1wbGF0ZScpLCAvLyDimZ1cbiAgcjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUm9va1N2Z1RlbXBsYXRlJyksICAgLy8g4pmcXG4gIHE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja1F1ZWVuU3ZnVGVtcGxhdGUnKSwgIC8vIOKZm1xuICBrOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tLaW5nU3ZnVGVtcGxhdGUnKSwgICAvLyDimZpcbn07XG5cbmV4cG9ydCBjb25zdCB0ZW1wbGF0ZSA9IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNjaGVzc0JvYXJkVGVtcGxhdGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBpZWNlQ2xvbmUocGllY2UsIHVuaWNvZGUgPSBmYWxzZSkge1xuICBsZXQgY2xvbmU7XG4gIGlmIChwaWVjZXNbcGllY2VdKSB7XG4gICAgaWYgKCF1bmljb2RlKSB7XG4gICAgICBjbG9uZSA9IHN2Z1BpZWNlc1twaWVjZV0uY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb25lID0gcGllY2VzW3BpZWNlXS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY2xvbmUgPSBlbXB0eVNxdWFyZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICByZXR1cm4gY2xvbmU7XG59XG4iXX0=
