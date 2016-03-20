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
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fenChessBoard = require('fen-chess-board');

var _fenChessBoard2 = _interopRequireDefault(_fenChessBoard);

var _templates = require('./templates');

var _domUtils = require('./dom-utils');

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
        (0, _domUtils.removeNodeContent)(cell);
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

},{"./dom-utils":4,"./templates":5,"fen-chess-board":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeNodeContent = removeNodeContent;
function removeNodeContent(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

},{}],5:[function(require,module,exports){
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

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZmVuLWNoZXNzLWJvYXJkL2xpYi9jaGVzcy11dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9mZW4tY2hlc3MtYm9hcmQvbGliL2Zlbi1jaGVzcy1ib2FyZC5qcyIsInNyYy9jaGVzcy1ib2FyZC5qcyIsInNyYy9kb20tdXRpbHMuanMiLCJzcmMvdGVtcGxhdGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3ZMQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7O0lBRU07Ozs7Ozs7Ozs7O3NDQUNlOzs7QUFDakIsV0FBSyxVQUFMLEdBQWtCLEtBQUssZ0JBQUwsRUFBbEIsQ0FEaUI7O0FBR2pCLFVBQUksUUFBUSxvQkFBUyxPQUFULENBQWlCLFNBQWpCLENBQTJCLElBQTNCLENBQVIsQ0FIYTtBQUlqQixXQUFLLFVBQUwsQ0FBZ0IsV0FBaEIsQ0FBNEIsS0FBNUIsRUFKaUI7O0FBTWpCLFdBQUssV0FBTCxHQUFtQiw0QkFBYSxLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQWIsQ0FBbkIsQ0FOaUI7QUFPakIsV0FBSyxNQUFMLEdBQWMsS0FBSyxVQUFMLENBQWdCLGFBQWhCLENBQThCLGFBQTlCLENBQWQsQ0FQaUI7O0FBU2pCLFdBQUssVUFBTCxHQUFrQixLQUFLLGdCQUFMLEVBQWxCLENBVGlCO0FBVWpCLFdBQUssVUFBTCxDQUFnQixXQUFoQixDQUE0Qix5QkFBYyxPQUFkLENBQXNCLFNBQXRCLENBQWdDLElBQWhDLENBQTVCLEVBVmlCOztBQVlqQixXQUFLLFlBQUw7Ozs7Ozs7OztBQVppQixVQXFCakIsQ0FBSyxLQUFMLENBQVcsT0FBWCxHQUFxQixRQUFyQixDQXJCaUI7QUFzQmpCLGlCQUFXLFlBQU07QUFDZixlQUFLLEtBQUwsQ0FBVyxPQUFYLEdBQXFCLE9BQXJCLENBRGU7T0FBTixFQUVSLENBRkg7O0FBdEJpQjs7OzZDQTRCTyxXQUFXLFFBQVEsUUFBUTtBQUNuRCxVQUFJLGNBQWMsU0FBZCxFQUF5QjtBQUMzQixhQUFLLFlBQUwsR0FEMkI7T0FBN0I7Ozs7Ozs7OztpQ0FRWTtBQUNaLFdBQUssV0FBTCxHQUFtQiw2QkFBbkIsQ0FEWTtBQUVaLFdBQUssWUFBTCxHQUZZOzs7O21DQUtFO0FBQ2QsVUFBTSxRQUFRLEtBQUssV0FBTCxDQUFpQixLQUFqQixDQURBO0FBRWQsVUFBTSxRQUFRLEtBQUssTUFBTCxDQUZBO0FBR2QsV0FBSyxJQUFJLElBQUksQ0FBSixFQUFPLElBQUksTUFBTSxNQUFOLEVBQWMsR0FBbEMsRUFBdUM7QUFDckMsWUFBTSxNQUFNLE1BQU0sSUFBTixDQUFXLENBQVgsQ0FBTixDQUQrQjtBQUVyQyxhQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxNQUFNLE1BQU4sRUFBYyxHQUFsQyxFQUF1QztBQUNyQyxjQUFJLE9BQU8sSUFBSSxLQUFKLENBQVUsQ0FBVixDQUFQLENBRGlDO0FBRXJDLGNBQUksWUFBWSxNQUFNLENBQU4sRUFBUyxDQUFULENBQVosQ0FGaUM7QUFHckMsZUFBSyxXQUFMLENBQWlCLElBQWpCLEVBQXVCLFNBQXZCLEVBSHFDO1NBQXZDO09BRkY7Ozs7Z0NBVVcsTUFBTSxXQUFXO0FBQzVCLFVBQU0sZUFBZSxLQUFLLGFBQUwsQ0FBbUIsU0FBbkIsS0FBaUMsRUFBQyxZQUFZLEVBQVosRUFBbEMsQ0FETztBQUU1QixVQUFNLGVBQWUsYUFBYSxVQUFiLENBQXdCLEtBQXhCLENBRk87QUFHNUIsVUFBTSxpQkFBaUIsQ0FBQyxDQUFDLGFBQWEsVUFBYixDQUF3QixPQUF4QixDQUhHO0FBSTVCLFVBQU0sVUFBVSxDQUFDLENBQUMsS0FBSyxVQUFMLENBQWdCLE9BQWhCOzs7QUFKVSxVQU94QixjQUFjLFlBQWQsSUFBOEIsWUFBWSxjQUFaLEVBQTRCO0FBQzVELHlDQUFrQixJQUFsQixFQUQ0RDtBQUU1RCxhQUFLLFdBQUwsQ0FBaUIsOEJBQWMsU0FBZCxFQUF5QixPQUF6QixDQUFqQixFQUY0RDtPQUE5RDs7Ozs7Ozs7Ozs7OzBCQVlLLFFBQVE7QUFDYixXQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsTUFBdkIsRUFEYTtBQUViLFdBQUssWUFBTCxHQUZhOzs7Ozs7Ozs7Ozs7d0JBV1YsUUFBUSxPQUFPO0FBQ2xCLFdBQUssV0FBTCxDQUFpQixHQUFqQixDQUFxQixNQUFyQixFQUE2QixLQUE3QixFQURrQjtBQUVsQixXQUFLLFlBQUwsR0FGa0I7Ozs7Ozs7Ozs7OzBCQVViLFFBQVE7QUFDYixXQUFLLFdBQUwsQ0FBaUIsS0FBakIsQ0FBdUIsTUFBdkIsRUFEYTtBQUViLFdBQUssWUFBTCxHQUZhOzs7Ozs7Ozs7Ozs7eUJBV1QsTUFBTSxJQUFJO0FBQ2QsV0FBSyxXQUFMLENBQWlCLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLEVBQTVCLEVBRGM7QUFFZCxXQUFLLFlBQUwsR0FGYzs7Ozs7Ozs7Ozs7c0JBVVAsS0FBSztBQUNaLFdBQUssV0FBTCxDQUFpQixHQUFqQixHQUF1QixHQUF2QixDQURZO0FBRVosV0FBSyxZQUFMLEdBRlk7Ozs7Ozs7d0JBUUg7QUFDVCxhQUFPLEtBQUssV0FBTCxDQUFpQixHQUFqQixDQURFOzs7O1NBN0hQO0VBQW1COztBQWtJekIsT0FBTyxVQUFQLEdBQW9CLFNBQVMsZUFBVCxDQUF5QixhQUF6QixFQUF3QyxVQUF4QyxDQUFwQjs7Ozs7Ozs7UUN0SWdCO0FBQVQsU0FBUyxpQkFBVCxDQUE0QixJQUE1QixFQUFrQztBQUN2QyxTQUFPLEtBQUssVUFBTCxFQUFpQjtBQUN0QixTQUFLLFdBQUwsQ0FBaUIsS0FBSyxVQUFMLENBQWpCLENBRHNCO0dBQXhCO0NBREs7Ozs7Ozs7O1FDMENTO0FBMUNoQixJQUFJLEtBQUo7QUFDQSxJQUFJLE9BQU8sV0FBUCxJQUFzQixDQUFDLE9BQU8sV0FBUCxDQUFtQixTQUFuQixFQUE4QjtBQUN2RCxVQUFRLFNBQVMsY0FBVCxDQUF3QixhQUF4QixDQUQrQztDQUF6RCxNQUVPO0FBQ0wsVUFBUSxTQUFTLGFBQVQsQ0FBdUIsYUFBdkIsQ0FESDtDQUZQOztBQU1PLElBQU0sb0NBQWMsTUFBTSxhQUFOLENBQW9CLGdCQUFwQixDQUFkOztBQUVOLElBQU0sMEJBQVM7QUFDcEIsS0FBRyxNQUFNLGFBQU4sQ0FBb0Isb0JBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQixzQkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHNCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0Isb0JBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQixxQkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLG9CQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0Isb0JBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQixzQkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHNCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0Isb0JBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQixxQkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLG9CQUFwQixDQUFIO0FBWm9CLENBQVQ7O0FBZU4sSUFBTSxnQ0FBWTtBQUN2QixLQUFHLE1BQU0sYUFBTixDQUFvQix1QkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHlCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0IseUJBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQix1QkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHdCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0IsdUJBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQix1QkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHlCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0IseUJBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQix1QkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHdCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0IsdUJBQXBCLENBQUg7QUFadUIsQ0FBWjs7QUFlTixJQUFNLDhCQUFXLE1BQU0sYUFBTixDQUFvQixxQkFBcEIsQ0FBWDtBQUNOLElBQU0sd0NBQWdCLE1BQU0sYUFBTixDQUFvQiwwQkFBcEIsQ0FBaEI7O0FBRU4sU0FBUyxhQUFULENBQXdCLEtBQXhCLEVBQWdEO01BQWpCLGdFQUFVLHFCQUFPOztBQUNyRCxNQUFJLGNBQUosQ0FEcUQ7QUFFckQsTUFBSSxPQUFPLEtBQVAsQ0FBSixFQUFtQjtBQUNqQixRQUFJLENBQUMsT0FBRCxFQUFVO0FBQ1osY0FBUSxVQUFVLEtBQVYsRUFBaUIsT0FBakIsQ0FBeUIsU0FBekIsQ0FBbUMsSUFBbkMsQ0FBUixDQURZO0tBQWQsTUFFTztBQUNMLGNBQVEsT0FBTyxLQUFQLEVBQWMsT0FBZCxDQUFzQixTQUF0QixDQUFnQyxJQUFoQyxDQUFSLENBREs7S0FGUDtHQURGLE1BTU87QUFDTCxZQUFRLFlBQVksT0FBWixDQUFvQixTQUFwQixDQUE4QixJQUE5QixDQUFSLENBREs7R0FOUDtBQVNBLFNBQU8sS0FBUCxDQVhxRDtDQUFoRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG5leHBvcnRzLmdldEZpbGVSYW5rID0gZ2V0RmlsZVJhbms7XG5leHBvcnRzLmVtcHR5Qm9hcmQgPSBlbXB0eUJvYXJkO1xudmFyIHJhbmtzID0gZXhwb3J0cy5yYW5rcyA9IHsgMTogNywgMjogNiwgMzogNSwgNDogNCwgNTogMywgNjogMiwgNzogMSwgODogMCB9O1xudmFyIGZpbGVzID0gZXhwb3J0cy5maWxlcyA9IHsgYTogMCwgYjogMSwgYzogMiwgZDogMywgZTogNCwgZjogNSwgZzogNiwgaDogNyB9O1xuXG4vKipcbiAqIFJldHVybnMgaW5kaWNlcyBmb3IgYSBjZWxsXG4gKiAoY2FuIGJlIHVzZWQgdG8gYWNjZXNzIGJvYXJkIGFycmF5cylcbiAqXG4gKiBFeGFtcGxlOlxuICogICBnZXRGaWxlUmFuayhcImEyXCIpID0+IFswLCA2XVxuICpcbiAqICAgMiA9IDYgYmVjYXVzZSBhcnJheXMgdXNhbGx5IGFyZSBkaXNwbGF5ZWQgd2l0aCAwLDAgaW4gdGhlIHVwcGVyXG4gKiAgIGxlZnQgY29ybmVyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIEVnOiBcImEyXCJcbiAqL1xuZnVuY3Rpb24gZ2V0RmlsZVJhbmsoc3F1YXJlKSB7XG4gIHZhciBfc3F1YXJlID0gX3NsaWNlZFRvQXJyYXkoc3F1YXJlLCAyKTtcblxuICB2YXIgZmlsZSA9IF9zcXVhcmVbMF07XG4gIHZhciByYW5rID0gX3NxdWFyZVsxXTtcblxuICByZXR1cm4gW2ZpbGVzW2ZpbGVdLCByYW5rc1tyYW5rXV07XG59XG5cbmZ1bmN0aW9uIGVtcHR5Qm9hcmQoKSB7XG4gIHZhciBib2FyZCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGJvYXJkW2ldID0gW107XG4gIH1cbiAgcmV0dXJuIGJvYXJkO1xufSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9zbGljZWRUb0FycmF5ID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkgeyB2YXIgX2FyciA9IFtdOyB2YXIgX24gPSB0cnVlOyB2YXIgX2QgPSBmYWxzZTsgdmFyIF9lID0gdW5kZWZpbmVkOyB0cnkgeyBmb3IgKHZhciBfaSA9IGFycltTeW1ib2wuaXRlcmF0b3JdKCksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7IF9hcnIucHVzaChfcy52YWx1ZSk7IGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhazsgfSB9IGNhdGNoIChlcnIpIHsgX2QgPSB0cnVlOyBfZSA9IGVycjsgfSBmaW5hbGx5IHsgdHJ5IHsgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTsgfSBmaW5hbGx5IHsgaWYgKF9kKSB0aHJvdyBfZTsgfSB9IHJldHVybiBfYXJyOyB9IHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgcmV0dXJuIGFycjsgfSBlbHNlIGlmIChTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpIHsgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTsgfSBlbHNlIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7IH0gfTsgfSgpO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2NoZXNzVXRpbHMgPSByZXF1aXJlKCcuL2NoZXNzLXV0aWxzJyk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBGRU5Cb2FyZCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRkVOQm9hcmQoZmVuKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZFTkJvYXJkKTtcblxuICAgIHRoaXMuYm9hcmQgPSAoMCwgX2NoZXNzVXRpbHMuZW1wdHlCb2FyZCkoKTtcbiAgICB0aGlzLmZlbiA9IGZlbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwaWVjZSBhdCBhIHNxdWFyZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IHBpZWNlIC0gdGhlIGFzY2lpIHJlcHJlc2VudGF0aW9uIG9mIGEgcGllY2UuIEVnOiBcIktcIlxuICAgKi9cblxuXG4gIF9jcmVhdGVDbGFzcyhGRU5Cb2FyZCwgW3tcbiAgICBrZXk6ICdwaWVjZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHBpZWNlKHNxdWFyZSkge1xuICAgICAgdmFyIF9nZXRGaWxlUmFuayA9ICgwLCBfY2hlc3NVdGlscy5nZXRGaWxlUmFuaykoc3F1YXJlKTtcblxuICAgICAgdmFyIF9nZXRGaWxlUmFuazIgPSBfc2xpY2VkVG9BcnJheShfZ2V0RmlsZVJhbmssIDIpO1xuXG4gICAgICB2YXIgZmlsZSA9IF9nZXRGaWxlUmFuazJbMF07XG4gICAgICB2YXIgcmFuayA9IF9nZXRGaWxlUmFuazJbMV07XG5cbiAgICAgIHJldHVybiB0aGlzLl9nZXRQaWVjZShmaWxlLCByYW5rKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGFjZXMgYSBwaWVjZSBpbiB0aGUgZ2l2ZW4gc3F1YXJlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcGllY2UgLSB0aGUgYXNjaWkgcmVwcmVzZW50YXRpb24gb2YgYSBwaWVjZS4gRWc6IFwiS1wiXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ3B1dCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHB1dChzcXVhcmUsIHBpZWNlKSB7XG4gICAgICB2YXIgX2dldEZpbGVSYW5rMyA9ICgwLCBfY2hlc3NVdGlscy5nZXRGaWxlUmFuaykoc3F1YXJlKTtcblxuICAgICAgdmFyIF9nZXRGaWxlUmFuazQgPSBfc2xpY2VkVG9BcnJheShfZ2V0RmlsZVJhbmszLCAyKTtcblxuICAgICAgdmFyIGZpbGUgPSBfZ2V0RmlsZVJhbms0WzBdO1xuICAgICAgdmFyIHJhbmsgPSBfZ2V0RmlsZVJhbms0WzFdO1xuXG4gICAgICB0aGlzLl9zZXRQaWVjZShmaWxlLCByYW5rLCBwaWVjZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgcGllY2UgYXQgdGhlIGdpdmVuIHNxdWFyZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2NsZWFyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2xlYXIoc3F1YXJlKSB7XG4gICAgICB0aGlzLnB1dChzcXVhcmUsICcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNb3ZlcyBhIHBpZWNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZyb20gLSBUaGUgc3F1YXJlIHRvIG1vdmUgZnJvbS4gRWc6IFwiYTJcIlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0byAtIFRoZSBzcXVhcmUgdG8gbW92ZSB0by4gRWc6IFwiYTNcIlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdtb3ZlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gbW92ZShmcm9tLCB0bykge1xuICAgICAgdmFyIHBpZWNlID0gdGhpcy5waWVjZShmcm9tKTtcbiAgICAgIGlmICghcGllY2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNb3ZlIEVycm9yOiB0aGUgZnJvbSBzcXVhcmUgd2FzIGVtcHR5Jyk7XG4gICAgICB9XG4gICAgICB0aGlzLnB1dCh0bywgcGllY2UpO1xuICAgICAgdGhpcy5jbGVhcihmcm9tKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmVuIC0gYSBwb3NpdGlvbiBzdHJpbmcgYXMgRkVOXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ19zZXRQaWVjZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRQaWVjZShmaWxlLCByYW5rLCBmZW5DaGFyKSB7XG4gICAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdID0gZmVuQ2hhcjtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZ2V0UGllY2UnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0UGllY2UoZmlsZSwgcmFuaykge1xuICAgICAgcmV0dXJuIHRoaXMuYm9hcmRbZmlsZV1bcmFua107XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZmVuJyxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChmZW4pIHtcbiAgICAgIGlmICghZmVuKSByZXR1cm47XG4gICAgICBpZiAoZmVuID09PSAnc3RhcnQnKSBmZW4gPSAncm5icWtibnIvcHBwcHBwcHAvOC84LzgvOC9QUFBQUFBQUC9STkJRS0JOUic7XG5cbiAgICAgIHZhciByYW5rID0gMDtcbiAgICAgIHZhciBmaWxlID0gMDtcbiAgICAgIHZhciBmZW5JbmRleCA9IDA7XG5cbiAgICAgIHZhciBmZW5DaGFyID0gdm9pZCAwO1xuICAgICAgdmFyIGNvdW50ID0gdm9pZCAwO1xuXG4gICAgICB3aGlsZSAoZmVuSW5kZXggPCBmZW4ubGVuZ3RoKSB7XG4gICAgICAgIGZlbkNoYXIgPSBmZW5bZmVuSW5kZXhdO1xuXG4gICAgICAgIGlmIChmZW5DaGFyID09PSAnICcpIHtcbiAgICAgICAgICBicmVhazsgLy8gaWdub3JlIHRoZSByZXN0XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZlbkNoYXIgPT09ICcvJykge1xuICAgICAgICAgIHJhbmsrKztcbiAgICAgICAgICBmaWxlID0gMDtcbiAgICAgICAgICBmZW5JbmRleCsrO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzTmFOKHBhcnNlSW50KGZlbkNoYXIsIDEwKSkpIHtcbiAgICAgICAgICB0aGlzLl9zZXRQaWVjZShmaWxlLCByYW5rLCBmZW5DaGFyKTtcbiAgICAgICAgICBmaWxlKys7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY291bnQgPSBwYXJzZUludChmZW5DaGFyLCAxMCk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9zZXRQaWVjZShmaWxlLCByYW5rLCAnJyk7XG4gICAgICAgICAgICBmaWxlKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZmVuSW5kZXgrKztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gYXMgRkVOLlxuICAgICAqL1xuICAgICxcbiAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgIHZhciBmZW4gPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgIHZhciBlbXB0eSA9IDA7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgICAgdmFyIHBpZWNlID0gdGhpcy5fZ2V0UGllY2UoaiwgaSk7XG4gICAgICAgICAgaWYgKHBpZWNlKSB7XG4gICAgICAgICAgICBpZiAoZW1wdHkgPiAwKSB7XG4gICAgICAgICAgICAgIGZlbi5wdXNoKGVtcHR5KTtcbiAgICAgICAgICAgICAgZW1wdHkgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmVuLnB1c2gocGllY2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbXB0eSsrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZW1wdHkgPiAwKSB7XG4gICAgICAgICAgZmVuLnB1c2goZW1wdHkpO1xuICAgICAgICB9XG4gICAgICAgIGZlbi5wdXNoKCcvJyk7XG4gICAgICB9XG4gICAgICBmZW4ucG9wKCk7XG4gICAgICByZXR1cm4gZmVuLmpvaW4oJycpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBGRU5Cb2FyZDtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gRkVOQm9hcmQ7IiwiaW1wb3J0IEZFTkJvYXJkIGZyb20gJ2Zlbi1jaGVzcy1ib2FyZCdcbmltcG9ydCB7IHRlbXBsYXRlLCBmcmFtZVRlbXBsYXRlLCBnZXRQaWVjZUNsb25lIH0gZnJvbSAnLi90ZW1wbGF0ZXMnXG5pbXBvcnQgeyByZW1vdmVOb2RlQ29udGVudCB9IGZyb20gJy4vZG9tLXV0aWxzJ1xuXG5jbGFzcyBDaGVzc0JvYXJkIGV4dGVuZHMgSFRNTEVsZW1lbnQge1xuICBjcmVhdGVkQ2FsbGJhY2sgKCkge1xuICAgIHRoaXMuX2JvYXJkUm9vdCA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpXG5cbiAgICB2YXIgY2xvbmUgPSB0ZW1wbGF0ZS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxuICAgIHRoaXMuX2JvYXJkUm9vdC5hcHBlbmRDaGlsZChjbG9uZSlcblxuICAgIHRoaXMuX2FzY2lpQm9hcmQgPSBuZXcgRkVOQm9hcmQodGhpcy5pbm5lckhUTUwudHJpbSgpKVxuICAgIHRoaXMuX2JvYXJkID0gdGhpcy5fYm9hcmRSb290LnF1ZXJ5U2VsZWN0b3IoJy5jaGVzc0JvYXJkJylcblxuICAgIHRoaXMuX2ZyYW1lUm9vdCA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpXG4gICAgdGhpcy5fZnJhbWVSb290LmFwcGVuZENoaWxkKGZyYW1lVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpXG5cbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpXG5cbiAgICAvKlxuICAgICAqIEEgc3Rpbmt5IGZ1Z2x5IHdvcmthcm91bmQgdG8gcmVkcmF3IHRoZSBib2FyZC5cbiAgICAgKlxuICAgICAqIChDaHJvbWUgMzYvMzgpIFRoZSBjaGVzc2JvYXJkIHdpbGwgbm90IHJvdGF0ZSB3aXRoIGNzcyBpZiBJIGRvIG5vdCBmb3JjZVxuICAgICAqIGEgcmVkcmF3IG9mIHRoZSBjb21wb25lbnQuIEl0J3MgZGlmZmljdWx0IHRvIHJlcHJvZHVjZSBhIG1pbmltYWwgZXhhbXBsZVxuICAgICAqIGZvciBidWdyZXBvcnRzLlxuICAgICAqL1xuICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdydW4taW4nXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgfSwgMClcbiAgICAvLyBlbmQgb2Ygc3Rpbmt5IGZ1Z2x5IHdvcmthcm91bmRcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayAoYXR0cmlidXRlLCBvbGRWYWwsIG5ld1ZhbCkge1xuICAgIGlmIChhdHRyaWJ1dGUgPT09ICd1bmljb2RlJykge1xuICAgICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBib2FyZCB3aXRoIGFuIGVtcHR5IG9uZS5cbiAgICovXG4gIGNsZWFyQm9hcmQgKCkge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQgPSBuZXcgRkVOQm9hcmQoKVxuICAgIHRoaXMuX3JlbmRlckJvYXJkKClcbiAgfVxuXG4gIF9yZW5kZXJCb2FyZCAoKSB7XG4gICAgY29uc3QgYXNjaWkgPSB0aGlzLl9hc2NpaUJvYXJkLmJvYXJkXG4gICAgY29uc3QgYm9hcmQgPSB0aGlzLl9ib2FyZFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXNjaWkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJvdyA9IGJvYXJkLnJvd3NbaV1cbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgYXNjaWkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgbGV0IGNlbGwgPSByb3cuY2VsbHNbal1cbiAgICAgICAgbGV0IGFzY2lpQ2hhciA9IGFzY2lpW2pdW2ldXG4gICAgICAgIHRoaXMuX3VwZGF0ZUNlbGwoY2VsbCwgYXNjaWlDaGFyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVDZWxsIChjZWxsLCBhc2NpaUNoYXIpIHtcbiAgICBjb25zdCBjdXJyZW50UGllY2UgPSBjZWxsLnF1ZXJ5U2VsZWN0b3IoJ1thc2NpaV0nKSB8fCB7YXR0cmlidXRlczoge319XG4gICAgY29uc3QgY3VycmVudEFzY2lpID0gY3VycmVudFBpZWNlLmF0dHJpYnV0ZXMuYXNjaWlcbiAgICBjb25zdCBjdXJyZW50VW5pY29kZSA9ICEhY3VycmVudFBpZWNlLmF0dHJpYnV0ZXMudW5pY29kZVxuICAgIGNvbnN0IHVuaWNvZGUgPSAhIXRoaXMuYXR0cmlidXRlcy51bmljb2RlXG5cbiAgICAvLyBzdXBlcnNpbXBsZSBkaWZmXG4gICAgaWYgKGFzY2lpQ2hhciAhPT0gY3VycmVudEFzY2lpIHx8IHVuaWNvZGUgIT09IGN1cnJlbnRVbmljb2RlKSB7XG4gICAgICByZW1vdmVOb2RlQ29udGVudChjZWxsKVxuICAgICAgY2VsbC5hcHBlbmRDaGlsZChnZXRQaWVjZUNsb25lKGFzY2lpQ2hhciwgdW5pY29kZSkpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBpZWNlIGF0IGEgc3F1YXJlXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqIEByZXR1cm4ge3N0cmluZ30gcGllY2UgLSB0aGUgYXNjaWkgcmVwcmVzZW50YXRpb24gb2YgYSBwaWVjZS4gRWc6IFwiS1wiXG4gICAqL1xuICBwaWVjZSAoc3F1YXJlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5waWVjZShzcXVhcmUpXG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICB9XG5cbiAgLyoqXG4gICAqIFBsYWNlcyBhIHBpZWNlIGluIHRoZSBnaXZlbiBzcXVhcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICovXG4gIHB1dCAoc3F1YXJlLCBwaWVjZSkge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQucHV0KHNxdWFyZSwgcGllY2UpXG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIHBpZWNlIGF0IHRoZSBnaXZlbiBzcXVhcmUuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBUaGUgc3F1YXJlLiBFZzogXCJhMlwiXG4gICAqL1xuICBjbGVhciAoc3F1YXJlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5jbGVhcihzcXVhcmUpXG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIGEgcGllY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tIC0gVGhlIHNxdWFyZSB0byBtb3ZlIGZyb20uIEVnOiBcImEyXCJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRvIC0gVGhlIHNxdWFyZSB0byBtb3ZlIHRvLiBFZzogXCJhM1wiXG4gICAqL1xuICBtb3ZlIChmcm9tLCB0bykge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQubW92ZShmcm9tLCB0bylcbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpXG4gIH1cblxuICAvKipcbiAgICogU2V0IHRoZSBjdXJyZW50IHBvc2l0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZmVuIC0gYSBwb3NpdGlvbiBzdHJpbmcgYXMgRkVOXG4gICAqL1xuICBzZXQgZmVuIChmZW4pIHtcbiAgICB0aGlzLl9hc2NpaUJvYXJkLmZlbiA9IGZlblxuICAgIHRoaXMuX3JlbmRlckJvYXJkKClcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gYXMgRkVOLlxuICAgKi9cbiAgZ2V0IGZlbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FzY2lpQm9hcmQuZmVuXG4gIH1cbn1cblxud2luZG93LkNoZXNzQm9hcmQgPSBkb2N1bWVudC5yZWdpc3RlckVsZW1lbnQoJ2NoZXNzLWJvYXJkJywgQ2hlc3NCb2FyZClcbiIsImV4cG9ydCBmdW5jdGlvbiByZW1vdmVOb2RlQ29udGVudCAobm9kZSkge1xuICB3aGlsZSAobm9kZS5maXJzdENoaWxkKSB7XG4gICAgbm9kZS5yZW1vdmVDaGlsZChub2RlLmZpcnN0Q2hpbGQpXG4gIH1cbn1cbiIsInZhciBvd25lclxuaWYgKHdpbmRvdy5IVE1MSW1wb3J0cyAmJiAhd2luZG93LkhUTUxJbXBvcnRzLnVzZU5hdGl2ZSkge1xuICBvd25lciA9IGRvY3VtZW50Ll9jdXJyZW50U2NyaXB0Lm93bmVyRG9jdW1lbnRcbn0gZWxzZSB7XG4gIG93bmVyID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5vd25lckRvY3VtZW50XG59XG5cbmV4cG9ydCBjb25zdCBlbXB0eVNxdWFyZSA9IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNlbXB0eVRlbXBsYXRlJylcblxuZXhwb3J0IGNvbnN0IHBpZWNlcyA9IHtcbiAgUDogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUGF3blRlbXBsYXRlJyksICAgICAgLy8g4pmZIHdoaXRlXG4gIE46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtuaWdodFRlbXBsYXRlJyksICAgIC8vIOKZmFxuICBCOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVCaXNob3BUZW1wbGF0ZScpLCAgICAvLyDimZdcbiAgUjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUm9va1RlbXBsYXRlJyksICAgICAgLy8g4pmWXG4gIFE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZVF1ZWVuVGVtcGxhdGUnKSwgICAgIC8vIOKZlVxuICBLOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVLaW5nVGVtcGxhdGUnKSwgICAgICAvLyDimZRcbiAgcDogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUGF3blRlbXBsYXRlJyksICAgICAgLy8g4pmfIGJsYWNrXG4gIG46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tuaWdodFRlbXBsYXRlJyksICAgIC8vIOKZnlxuICBiOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tCaXNob3BUZW1wbGF0ZScpLCAgICAvLyDimZ1cbiAgcjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUm9va1RlbXBsYXRlJyksICAgICAgLy8g4pmcXG4gIHE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja1F1ZWVuVGVtcGxhdGUnKSwgICAgIC8vIOKZm1xuICBrOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tLaW5nVGVtcGxhdGUnKSAgICAgICAvLyDimZpcbn1cblxuZXhwb3J0IGNvbnN0IHN2Z1BpZWNlcyA9IHtcbiAgUDogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUGF3blN2Z1RlbXBsYXRlJyksICAgLy8g4pmZIHdoaXRlXG4gIE46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtuaWdodFN2Z1RlbXBsYXRlJyksIC8vIOKZmFxuICBCOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVCaXNob3BTdmdUZW1wbGF0ZScpLCAvLyDimZdcbiAgUjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUm9va1N2Z1RlbXBsYXRlJyksICAgLy8g4pmWXG4gIFE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZVF1ZWVuU3ZnVGVtcGxhdGUnKSwgIC8vIOKZlVxuICBLOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVLaW5nU3ZnVGVtcGxhdGUnKSwgICAvLyDimZRcbiAgcDogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUGF3blN2Z1RlbXBsYXRlJyksICAgLy8g4pmfIGJsYWNrXG4gIG46IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tuaWdodFN2Z1RlbXBsYXRlJyksIC8vIOKZnlxuICBiOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tCaXNob3BTdmdUZW1wbGF0ZScpLCAvLyDimZ1cbiAgcjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUm9va1N2Z1RlbXBsYXRlJyksICAgLy8g4pmcXG4gIHE6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja1F1ZWVuU3ZnVGVtcGxhdGUnKSwgIC8vIOKZm1xuICBrOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tLaW5nU3ZnVGVtcGxhdGUnKSAgICAvLyDimZpcbn1cblxuZXhwb3J0IGNvbnN0IHRlbXBsYXRlID0gb3duZXIucXVlcnlTZWxlY3RvcignI2NoZXNzQm9hcmRUZW1wbGF0ZScpXG5leHBvcnQgY29uc3QgZnJhbWVUZW1wbGF0ZSA9IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNjaGVzc0JvYXJkRnJhbWVUZW1wbGF0ZScpXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQaWVjZUNsb25lIChwaWVjZSwgdW5pY29kZSA9IGZhbHNlKSB7XG4gIGxldCBjbG9uZVxuICBpZiAocGllY2VzW3BpZWNlXSkge1xuICAgIGlmICghdW5pY29kZSkge1xuICAgICAgY2xvbmUgPSBzdmdQaWVjZXNbcGllY2VdLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNsb25lID0gcGllY2VzW3BpZWNlXS5jb250ZW50LmNsb25lTm9kZSh0cnVlKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjbG9uZSA9IGVtcHR5U3F1YXJlLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXG4gIH1cbiAgcmV0dXJuIGNsb25lXG59XG4iXX0=
