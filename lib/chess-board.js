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

// ♚
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

// ♚
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZmVuLWNoZXNzLWJvYXJkL2xpYi9jaGVzcy11dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9mZW4tY2hlc3MtYm9hcmQvbGliL2Zlbi1jaGVzcy1ib2FyZC5qcyIsIm5vZGVfbW9kdWxlcy9yZW1vdmUtY2hpbGRyZW4vaW5kZXguanMiLCJzcmMvY2hlc3MtYm9hcmQuanMiLCJzcmMvdGVtcGxhdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QW9CLHVCQUFwQixDQVBvQixFO0FBUXZCLEtBQUcsTUFBTSxhQUFOLENBQW9CLHlCQUFwQixDQVJvQixFO0FBU3ZCLEtBQUcsTUFBTSxhQUFOLENBQW9CLHlCQUFwQixDQVRvQixFO0FBVXZCLEtBQUcsTUFBTSxhQUFOLENBQW9CLHVCQUFwQixDQVZvQixFO0FBV3ZCLEtBQUcsTUFBTSxhQUFOLENBQW9CLHdCQUFwQixDQVhvQixFO0FBWXZCLEtBQUcsTUFBTSxhQUFOLENBQW9CLHVCQUFwQixDQVpvQixFQUFsQjs7O0FBZUEsSUFBTSw4QkFBVyxNQUFNLGFBQU4sQ0FBb0IscUJBQXBCLENBQWpCO0FBQ0EsSUFBTSx3Q0FBZ0IsTUFBTSxhQUFOLENBQW9CLDBCQUFwQixDQUF0Qjs7QUFFQSxTQUFTLGFBQVQsQ0FBdUIsS0FBdkIsRUFBK0M7QUFBQSxNQUFqQixPQUFpQix5REFBUCxLQUFPOztBQUNwRCxNQUFJLGNBQUo7QUFDQSxNQUFJLE9BQU8sS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFFBQUksQ0FBQyxPQUFMLEVBQWM7QUFDWixjQUFRLFVBQVUsS0FBVixFQUFpQixPQUFqQixDQUF5QixTQUF6QixDQUFtQyxJQUFuQyxDQUFSO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsY0FBUSxPQUFPLEtBQVAsRUFBYyxPQUFkLENBQXNCLFNBQXRCLENBQWdDLElBQWhDLENBQVI7QUFDRDtBQUNGLEdBTkQsTUFNTztBQUNMLFlBQVEsWUFBWSxPQUFaLENBQW9CLFNBQXBCLENBQThCLElBQTlCLENBQVI7QUFDRDtBQUNELFNBQU8sS0FBUDtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbmV4cG9ydHMuZ2V0RmlsZVJhbmsgPSBnZXRGaWxlUmFuaztcbmV4cG9ydHMuZW1wdHlCb2FyZCA9IGVtcHR5Qm9hcmQ7XG52YXIgcmFua3MgPSBleHBvcnRzLnJhbmtzID0geyAxOiA3LCAyOiA2LCAzOiA1LCA0OiA0LCA1OiAzLCA2OiAyLCA3OiAxLCA4OiAwIH07XG52YXIgZmlsZXMgPSBleHBvcnRzLmZpbGVzID0geyBhOiAwLCBiOiAxLCBjOiAyLCBkOiAzLCBlOiA0LCBmOiA1LCBnOiA2LCBoOiA3IH07XG5cbi8qKlxuICogUmV0dXJucyBpbmRpY2VzIGZvciBhIGNlbGxcbiAqIChjYW4gYmUgdXNlZCB0byBhY2Nlc3MgYm9hcmQgYXJyYXlzKVxuICpcbiAqIEV4YW1wbGU6XG4gKiAgIGdldEZpbGVSYW5rKFwiYTJcIikgPT4gWzAsIDZdXG4gKlxuICogICAyID0gNiBiZWNhdXNlIGFycmF5cyB1c2FsbHkgYXJlIGRpc3BsYXllZCB3aXRoIDAsMCBpbiB0aGUgdXBwZXJcbiAqICAgbGVmdCBjb3JuZXJcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gRWc6IFwiYTJcIlxuICovXG5mdW5jdGlvbiBnZXRGaWxlUmFuayhzcXVhcmUpIHtcbiAgdmFyIF9zcXVhcmUgPSBfc2xpY2VkVG9BcnJheShzcXVhcmUsIDIpO1xuXG4gIHZhciBmaWxlID0gX3NxdWFyZVswXTtcbiAgdmFyIHJhbmsgPSBfc3F1YXJlWzFdO1xuXG4gIHJldHVybiBbZmlsZXNbZmlsZV0sIHJhbmtzW3JhbmtdXTtcbn1cblxuZnVuY3Rpb24gZW1wdHlCb2FyZCgpIHtcbiAgdmFyIGJvYXJkID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgYm9hcmRbaV0gPSBbXTtcbiAgfVxuICByZXR1cm4gYm9hcmQ7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3NsaWNlZFRvQXJyYXkgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7IHZhciBfYXJyID0gW107IHZhciBfbiA9IHRydWU7IHZhciBfZCA9IGZhbHNlOyB2YXIgX2UgPSB1bmRlZmluZWQ7IHRyeSB7IGZvciAodmFyIF9pID0gYXJyW1N5bWJvbC5pdGVyYXRvcl0oKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHsgX2Fyci5wdXNoKF9zLnZhbHVlKTsgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrOyB9IH0gY2F0Y2ggKGVycikgeyBfZCA9IHRydWU7IF9lID0gZXJyOyB9IGZpbmFsbHkgeyB0cnkgeyBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpOyB9IGZpbmFsbHkgeyBpZiAoX2QpIHRocm93IF9lOyB9IH0gcmV0dXJuIF9hcnI7IH0gcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyByZXR1cm4gYXJyOyB9IGVsc2UgaWYgKFN5bWJvbC5pdGVyYXRvciBpbiBPYmplY3QoYXJyKSkgeyByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpOyB9IGVsc2UgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTsgfSB9OyB9KCk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfY2hlc3NVdGlscyA9IHJlcXVpcmUoJy4vY2hlc3MtdXRpbHMnKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEZFTkJvYXJkID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGRU5Cb2FyZChmZW4pIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRkVOQm9hcmQpO1xuXG4gICAgdGhpcy5ib2FyZCA9ICgwLCBfY2hlc3NVdGlscy5lbXB0eUJvYXJkKSgpO1xuICAgIHRoaXMuZmVuID0gZmVuO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBpZWNlIGF0IGEgc3F1YXJlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqIEByZXR1cm4ge3N0cmluZ30gcGllY2UgLSB0aGUgYXNjaWkgcmVwcmVzZW50YXRpb24gb2YgYSBwaWVjZS4gRWc6IFwiS1wiXG4gICAqL1xuXG5cbiAgX2NyZWF0ZUNsYXNzKEZFTkJvYXJkLCBbe1xuICAgIGtleTogJ3BpZWNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcGllY2Uoc3F1YXJlKSB7XG4gICAgICB2YXIgX2dldEZpbGVSYW5rID0gKDAsIF9jaGVzc1V0aWxzLmdldEZpbGVSYW5rKShzcXVhcmUpO1xuXG4gICAgICB2YXIgX2dldEZpbGVSYW5rMiA9IF9zbGljZWRUb0FycmF5KF9nZXRGaWxlUmFuaywgMik7XG5cbiAgICAgIHZhciBmaWxlID0gX2dldEZpbGVSYW5rMlswXTtcbiAgICAgIHZhciByYW5rID0gX2dldEZpbGVSYW5rMlsxXTtcblxuICAgICAgcmV0dXJuIHRoaXMuX2dldFBpZWNlKGZpbGUsIHJhbmspO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBsYWNlcyBhIHBpZWNlIGluIHRoZSBnaXZlbiBzcXVhcmUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAncHV0JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gcHV0KHNxdWFyZSwgcGllY2UpIHtcbiAgICAgIHZhciBfZ2V0RmlsZVJhbmszID0gKDAsIF9jaGVzc1V0aWxzLmdldEZpbGVSYW5rKShzcXVhcmUpO1xuXG4gICAgICB2YXIgX2dldEZpbGVSYW5rNCA9IF9zbGljZWRUb0FycmF5KF9nZXRGaWxlUmFuazMsIDIpO1xuXG4gICAgICB2YXIgZmlsZSA9IF9nZXRGaWxlUmFuazRbMF07XG4gICAgICB2YXIgcmFuayA9IF9nZXRGaWxlUmFuazRbMV07XG5cbiAgICAgIHRoaXMuX3NldFBpZWNlKGZpbGUsIHJhbmssIHBpZWNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBwaWVjZSBhdCB0aGUgZ2l2ZW4gc3F1YXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnY2xlYXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjbGVhcihzcXVhcmUpIHtcbiAgICAgIHRoaXMucHV0KHNxdWFyZSwgJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1vdmVzIGEgcGllY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbSAtIFRoZSBzcXVhcmUgdG8gbW92ZSBmcm9tLiBFZzogXCJhMlwiXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRvIC0gVGhlIHNxdWFyZSB0byBtb3ZlIHRvLiBFZzogXCJhM1wiXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ21vdmUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBtb3ZlKGZyb20sIHRvKSB7XG4gICAgICB2YXIgcGllY2UgPSB0aGlzLnBpZWNlKGZyb20pO1xuICAgICAgaWYgKCFwaWVjZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vdmUgRXJyb3I6IHRoZSBmcm9tIHNxdWFyZSB3YXMgZW1wdHknKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucHV0KHRvLCBwaWVjZSk7XG4gICAgICB0aGlzLmNsZWFyKGZyb20pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmZW4gLSBhIHBvc2l0aW9uIHN0cmluZyBhcyBGRU5cbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX3NldFBpZWNlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NldFBpZWNlKGZpbGUsIHJhbmssIGZlbkNoYXIpIHtcbiAgICAgIHRoaXMuYm9hcmRbZmlsZV1bcmFua10gPSBmZW5DaGFyO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19nZXRQaWVjZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRQaWVjZShmaWxlLCByYW5rKSB7XG4gICAgICByZXR1cm4gdGhpcy5ib2FyZFtmaWxlXVtyYW5rXTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdmZW4nLFxuICAgIHNldDogZnVuY3Rpb24gc2V0KGZlbikge1xuICAgICAgaWYgKCFmZW4pIHJldHVybjtcbiAgICAgIGlmIChmZW4gPT09ICdzdGFydCcpIGZlbiA9ICdybmJxa2Juci9wcHBwcHBwcC84LzgvOC84L1BQUFBQUFBQL1JOQlFLQk5SJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgICB2YXIgcmFuayA9IDA7XG4gICAgICB2YXIgZmlsZSA9IDA7XG4gICAgICB2YXIgZmVuSW5kZXggPSAwO1xuXG4gICAgICB2YXIgZmVuQ2hhciA9IHZvaWQgMDtcbiAgICAgIHZhciBjb3VudCA9IHZvaWQgMDtcblxuICAgICAgd2hpbGUgKGZlbkluZGV4IDwgZmVuLmxlbmd0aCkge1xuICAgICAgICBmZW5DaGFyID0gZmVuW2ZlbkluZGV4XTtcblxuICAgICAgICBpZiAoZmVuQ2hhciA9PT0gJyAnKSB7XG4gICAgICAgICAgYnJlYWs7IC8vIGlnbm9yZSB0aGUgcmVzdFxuICAgICAgICB9XG4gICAgICAgIGlmIChmZW5DaGFyID09PSAnLycpIHtcbiAgICAgICAgICByYW5rKys7XG4gICAgICAgICAgZmlsZSA9IDA7XG4gICAgICAgICAgZmVuSW5kZXgrKztcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc05hTihwYXJzZUludChmZW5DaGFyLCAxMCkpKSB7XG4gICAgICAgICAgdGhpcy5fc2V0UGllY2UoZmlsZSwgcmFuaywgZmVuQ2hhcik7XG4gICAgICAgICAgZmlsZSsrO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvdW50ID0gcGFyc2VJbnQoZmVuQ2hhciwgMTApO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fc2V0UGllY2UoZmlsZSwgcmFuaywgJycpO1xuICAgICAgICAgICAgZmlsZSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZlbkluZGV4Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uIGFzIEZFTi5cbiAgICAgKi9cbiAgICAsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICB2YXIgZmVuID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICB2YXIgZW1wdHkgPSAwO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDg7IGorKykge1xuICAgICAgICAgIHZhciBwaWVjZSA9IHRoaXMuX2dldFBpZWNlKGosIGkpO1xuICAgICAgICAgIGlmIChwaWVjZSkge1xuICAgICAgICAgICAgaWYgKGVtcHR5ID4gMCkge1xuICAgICAgICAgICAgICBmZW4ucHVzaChlbXB0eSk7XG4gICAgICAgICAgICAgIGVtcHR5ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZlbi5wdXNoKHBpZWNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZW1wdHkrKztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVtcHR5ID4gMCkge1xuICAgICAgICAgIGZlbi5wdXNoKGVtcHR5KTtcbiAgICAgICAgfVxuICAgICAgICBmZW4ucHVzaCgnLycpO1xuICAgICAgfVxuICAgICAgZmVuLnBvcCgpO1xuICAgICAgcmV0dXJuIGZlbi5qb2luKCcnKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRkVOQm9hcmQ7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZFTkJvYXJkOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVtb3ZlQ2hpbGRyZW4gKG5vZGUpIHtcbiAgd2hpbGUgKG5vZGUuZmlyc3RDaGlsZCkge1xuICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcbiAgfVxufVxuIiwiaW1wb3J0IEZFTkJvYXJkIGZyb20gJ2Zlbi1jaGVzcy1ib2FyZCc7XG5pbXBvcnQgeyB0ZW1wbGF0ZSwgZnJhbWVUZW1wbGF0ZSwgZ2V0UGllY2VDbG9uZSB9IGZyb20gJy4vdGVtcGxhdGVzJztcbmltcG9ydCByZW1vdmVDaGlsZHJlbiBmcm9tICdyZW1vdmUtY2hpbGRyZW4nO1xuXG5jbGFzcyBDaGVzc0JvYXJkIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjcmVhdGVkQ2FsbGJhY2soKSB7XG4gICAgdGhpcy5fYm9hcmRSb290ID0gdGhpcy5jcmVhdGVTaGFkb3dSb290KCk7XG5cbiAgICBjb25zdCBjbG9uZSA9IHRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgIHRoaXMuX2JvYXJkUm9vdC5hcHBlbmRDaGlsZChjbG9uZSk7XG5cbiAgICB0aGlzLl9hc2NpaUJvYXJkID0gbmV3IEZFTkJvYXJkKHRoaXMuaW5uZXJIVE1MLnRyaW0oKSk7XG4gICAgdGhpcy5fYm9hcmQgPSB0aGlzLl9ib2FyZFJvb3QucXVlcnlTZWxlY3RvcignLmNoZXNzQm9hcmQnKTtcblxuICAgIHRoaXMuX2ZyYW1lUm9vdCA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpO1xuICAgIHRoaXMuX2ZyYW1lUm9vdC5hcHBlbmRDaGlsZChmcmFtZVRlbXBsYXRlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpKTtcblxuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG5cbiAgICAvKlxuICAgICAqIEEgc3Rpbmt5IGZ1Z2x5IHdvcmthcm91bmQgdG8gcmVkcmF3IHRoZSBib2FyZC5cbiAgICAgKlxuICAgICAqIChDaHJvbWUgMzYvMzgpIFRoZSBjaGVzc2JvYXJkIHdpbGwgbm90IHJvdGF0ZSB3aXRoIGNzcyBpZiBJIGRvIG5vdCBmb3JjZVxuICAgICAqIGEgcmVkcmF3IG9mIHRoZSBjb21wb25lbnQuIEl0J3MgZGlmZmljdWx0IHRvIHJlcHJvZHVjZSBhIG1pbmltYWwgZXhhbXBsZVxuICAgICAqIGZvciBidWdyZXBvcnRzLlxuICAgICAqL1xuICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdydW4taW4nO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICB9LCAwKTtcbiAgICAvLyBlbmQgb2Ygc3Rpbmt5IGZ1Z2x5IHdvcmthcm91bmRcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayhhdHRyaWJ1dGUpIHtcbiAgICBpZiAoYXR0cmlidXRlID09PSAndW5pY29kZScpIHtcbiAgICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSBjdXJyZW50IGJvYXJkIHdpdGggYW4gZW1wdHkgb25lLlxuICAgKi9cbiAgY2xlYXJCb2FyZCgpIHtcbiAgICB0aGlzLl9hc2NpaUJvYXJkID0gbmV3IEZFTkJvYXJkKCk7XG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKTtcbiAgfVxuXG4gIF9yZW5kZXJCb2FyZCgpIHtcbiAgICBjb25zdCBhc2NpaSA9IHRoaXMuX2FzY2lpQm9hcmQuYm9hcmQ7XG4gICAgY29uc3QgYm9hcmQgPSB0aGlzLl9ib2FyZDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFzY2lpLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBib2FyZC5yb3dzW2ldO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhc2NpaS5sZW5ndGg7IGorKykge1xuICAgICAgICBjb25zdCBjZWxsID0gcm93LmNlbGxzW2pdO1xuICAgICAgICBjb25zdCBhc2NpaUNoYXIgPSBhc2NpaVtqXVtpXTtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2VsbChjZWxsLCBhc2NpaUNoYXIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVDZWxsKGNlbGwsIGFzY2lpQ2hhcikge1xuICAgIGNvbnN0IGN1cnJlbnRQaWVjZSA9IGNlbGwucXVlcnlTZWxlY3RvcignW2FzY2lpXScpIHx8IHsgYXR0cmlidXRlczoge30gfTtcbiAgICBjb25zdCBjdXJyZW50QXNjaWkgPSBjdXJyZW50UGllY2UuYXR0cmlidXRlcy5hc2NpaTtcbiAgICBjb25zdCBjdXJyZW50VW5pY29kZSA9ICEhY3VycmVudFBpZWNlLmF0dHJpYnV0ZXMudW5pY29kZTtcbiAgICBjb25zdCB1bmljb2RlID0gISF0aGlzLmF0dHJpYnV0ZXMudW5pY29kZTtcblxuICAgIC8vIHN1cGVyc2ltcGxlIGRpZmZcbiAgICBpZiAoYXNjaWlDaGFyICE9PSBjdXJyZW50QXNjaWkgfHwgdW5pY29kZSAhPT0gY3VycmVudFVuaWNvZGUpIHtcbiAgICAgIHJlbW92ZUNoaWxkcmVuKGNlbGwpO1xuICAgICAgY2VsbC5hcHBlbmRDaGlsZChnZXRQaWVjZUNsb25lKGFzY2lpQ2hhciwgdW5pY29kZSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwaWVjZSBhdCBhIHNxdWFyZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IHBpZWNlIC0gdGhlIGFzY2lpIHJlcHJlc2VudGF0aW9uIG9mIGEgcGllY2UuIEVnOiBcIktcIlxuICAgKi9cbiAgcGllY2Uoc3F1YXJlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5waWVjZShzcXVhcmUpO1xuICAgIHRoaXMuX3JlbmRlckJvYXJkKCk7XG4gIH1cblxuICAvKipcbiAgICogUGxhY2VzIGEgcGllY2UgaW4gdGhlIGdpdmVuIHNxdWFyZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlIC0gdGhlIGFzY2lpIHJlcHJlc2VudGF0aW9uIG9mIGEgcGllY2UuIEVnOiBcIktcIlxuICAgKi9cbiAgcHV0KHNxdWFyZSwgcGllY2UpIHtcbiAgICB0aGlzLl9hc2NpaUJvYXJkLnB1dChzcXVhcmUsIHBpZWNlKTtcbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHBpZWNlIGF0IHRoZSBnaXZlbiBzcXVhcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqL1xuICBjbGVhcihzcXVhcmUpIHtcbiAgICB0aGlzLl9hc2NpaUJvYXJkLmNsZWFyKHNxdWFyZSk7XG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb3ZlcyBhIHBpZWNlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZnJvbSAtIFRoZSBzcXVhcmUgdG8gbW92ZSBmcm9tLiBFZzogXCJhMlwiXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0byAtIFRoZSBzcXVhcmUgdG8gbW92ZSB0by4gRWc6IFwiYTNcIlxuICAgKi9cbiAgbW92ZShmcm9tLCB0bykge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQubW92ZShmcm9tLCB0byk7XG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmZW4gLSBhIHBvc2l0aW9uIHN0cmluZyBhcyBGRU5cbiAgICovXG4gIHNldCBmZW4oZmVuKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5mZW4gPSBmZW47XG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gYXMgRkVOLlxuICAgKi9cbiAgZ2V0IGZlbigpIHtcbiAgICByZXR1cm4gdGhpcy5fYXNjaWlCb2FyZC5mZW47XG4gIH1cbn1cblxud2luZG93LkNoZXNzQm9hcmQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2NoZXNzLWJvYXJkJywgQ2hlc3NCb2FyZCk7XG4iLCJsZXQgb3duZXI7XG5pZiAod2luZG93LkhUTUxJbXBvcnRzICYmICF3aW5kb3cuSFRNTEltcG9ydHMudXNlTmF0aXZlKSB7XG4gIG93bmVyID0gZG9jdW1lbnQuX2N1cnJlbnRTY3JpcHQub3duZXJEb2N1bWVudDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxufSBlbHNlIHtcbiAgb3duZXIgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0Lm93bmVyRG9jdW1lbnQ7XG59XG5cbmV4cG9ydCBjb25zdCBlbXB0eVNxdWFyZSA9IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNlbXB0eVRlbXBsYXRlJyk7XG5cbmV4cG9ydCBjb25zdCBwaWVjZXMgPSB7XG4gIFA6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZVBhd25UZW1wbGF0ZScpLCAgICAgIC8vIOKZmSB3aGl0ZVxuICBOOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVLbmlnaHRUZW1wbGF0ZScpLCAgICAvLyDimZhcbiAgQjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlQmlzaG9wVGVtcGxhdGUnKSwgICAgLy8g4pmXXG4gIFI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZVJvb2tUZW1wbGF0ZScpLCAgICAgIC8vIOKZllxuICBROiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVRdWVlblRlbXBsYXRlJyksICAgICAvLyDimZVcbiAgSzogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlS2luZ1RlbXBsYXRlJyksICAgICAgLy8g4pmUXG4gIHA6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja1Bhd25UZW1wbGF0ZScpLCAgICAgIC8vIOKZnyBibGFja1xuICBuOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tLbmlnaHRUZW1wbGF0ZScpLCAgICAvLyDimZ5cbiAgYjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrQmlzaG9wVGVtcGxhdGUnKSwgICAgLy8g4pmdXG4gIHI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja1Jvb2tUZW1wbGF0ZScpLCAgICAgIC8vIOKZnFxuICBxOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tRdWVlblRlbXBsYXRlJyksICAgICAvLyDimZtcbiAgazogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrS2luZ1RlbXBsYXRlJyksICAgICAgLy8g4pmaXG59O1xuXG5leHBvcnQgY29uc3Qgc3ZnUGllY2VzID0ge1xuICBQOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVQYXduU3ZnVGVtcGxhdGUnKSwgICAvLyDimZkgd2hpdGVcbiAgTjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlS25pZ2h0U3ZnVGVtcGxhdGUnKSwgLy8g4pmYXG4gIEI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUJpc2hvcFN2Z1RlbXBsYXRlJyksIC8vIOKZl1xuICBSOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVSb29rU3ZnVGVtcGxhdGUnKSwgICAvLyDimZZcbiAgUTogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUXVlZW5TdmdUZW1wbGF0ZScpLCAgLy8g4pmVXG4gIEs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtpbmdTdmdUZW1wbGF0ZScpLCAgIC8vIOKZlFxuICBwOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tQYXduU3ZnVGVtcGxhdGUnKSwgICAvLyDimZ8gYmxhY2tcbiAgbjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrS25pZ2h0U3ZnVGVtcGxhdGUnKSwgLy8g4pmeXG4gIGI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0Jpc2hvcFN2Z1RlbXBsYXRlJyksIC8vIOKZnVxuICByOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tSb29rU3ZnVGVtcGxhdGUnKSwgICAvLyDimZxcbiAgcTogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUXVlZW5TdmdUZW1wbGF0ZScpLCAgLy8g4pmbXG4gIGs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tpbmdTdmdUZW1wbGF0ZScpLCAgIC8vIOKZmlxufTtcblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gb3duZXIucXVlcnlTZWxlY3RvcignI2NoZXNzQm9hcmRUZW1wbGF0ZScpO1xuZXhwb3J0IGNvbnN0IGZyYW1lVGVtcGxhdGUgPSBvd25lci5xdWVyeVNlbGVjdG9yKCcjY2hlc3NCb2FyZEZyYW1lVGVtcGxhdGUnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBpZWNlQ2xvbmUocGllY2UsIHVuaWNvZGUgPSBmYWxzZSkge1xuICBsZXQgY2xvbmU7XG4gIGlmIChwaWVjZXNbcGllY2VdKSB7XG4gICAgaWYgKCF1bmljb2RlKSB7XG4gICAgICBjbG9uZSA9IHN2Z1BpZWNlc1twaWVjZV0uY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb25lID0gcGllY2VzW3BpZWNlXS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgY2xvbmUgPSBlbXB0eVNxdWFyZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKTtcbiAgfVxuICByZXR1cm4gY2xvbmU7XG59XG4iXX0=
