(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ASCIIBoard = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chessUtils = require('./chess-utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ASCIIBoard = exports.ASCIIBoard = function () {
  function ASCIIBoard(fen) {
    _classCallCheck(this, ASCIIBoard);

    this.board = (0, _chessUtils.emptyBoard)();
    this.fen = fen;
  }

  /**
   * Gets the piece at a square
   *
   * @param {string} square - The square. Eg: "a2"
   * @return {string} piece - the ascii representation of a piece. Eg: "K"
   */


  _createClass(ASCIIBoard, [{
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
      var piece = this._getPiece(this.piece(from));
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

  return ASCIIBoard;
}();

},{"./chess-utils":3}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _asciiChessBoard = require('./ascii-chess-board');

var _templates = require('./templates');

var _domUtils = require('./dom-utils');

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

      this._asciiBoard = new _asciiChessBoard.ASCIIBoard(this.innerHTML.trim());
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
      this._asciiBoard = new _asciiChessBoard.ASCIIBoard(this.innerHTML.trim());
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

},{"./ascii-chess-board":1,"./dom-utils":4,"./templates":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXNjaWktY2hlc3MtYm9hcmQuanMiLCJzcmMvY2hlc3MtYm9hcmQuanMiLCJzcmMvY2hlc3MtdXRpbHMuanMiLCJzcmMvZG9tLXV0aWxzLmpzIiwic3JjL3RlbXBsYXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7O0FDQUE7Ozs7SUFHYTtBQUNYLFdBRFcsVUFDWCxDQUFhLEdBQWIsRUFBa0I7MEJBRFAsWUFDTzs7QUFDaEIsU0FBSyxLQUFMLEdBQWEsNkJBQWIsQ0FEZ0I7QUFFaEIsU0FBSyxHQUFMLEdBQVcsR0FBWCxDQUZnQjtHQUFsQjs7Ozs7Ozs7OztlQURXOzswQkFZSixRQUFRO3lCQUNRLDZCQUFZLE1BQVosRUFEUjs7OztVQUNOLHdCQURNO1VBQ0Esd0JBREE7O0FBRWIsYUFBTyxLQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLENBQVAsQ0FGYTs7Ozs7Ozs7Ozs7O3dCQVdWLFFBQVEsT0FBTzswQkFDRyw2QkFBWSxNQUFaLEVBREg7Ozs7VUFDWCx3QkFEVztVQUNMLHdCQURLOztBQUVsQixXQUFLLFNBQUwsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLEVBQTJCLEtBQTNCLEVBRmtCOzs7Ozs7Ozs7OzswQkFVYixRQUFRO0FBQ2IsV0FBSyxHQUFMLENBQVMsTUFBVCxFQUFpQixFQUFqQixFQURhOzs7Ozs7Ozs7Ozs7eUJBVVQsTUFBTSxJQUFJO0FBQ2QsVUFBTSxRQUFRLEtBQUssU0FBTCxDQUFlLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZixDQUFSLENBRFE7QUFFZCxVQUFJLENBQUMsS0FBRCxFQUFRO0FBQ1YsY0FBTSxJQUFJLEtBQUosQ0FBVSx1Q0FBVixDQUFOLENBRFU7T0FBWjtBQUdBLFdBQUssR0FBTCxDQUFTLEVBQVQsRUFBYSxLQUFiLEVBTGM7QUFNZCxXQUFLLEtBQUws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QUFOLENBQW9CLHVCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0IseUJBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQix5QkFBcEIsQ0FBSDtBQUNBLEtBQUcsTUFBTSxhQUFOLENBQW9CLHVCQUFwQixDQUFIO0FBQ0EsS0FBRyxNQUFNLGFBQU4sQ0FBb0Isd0JBQXBCLENBQUg7QUFDQSxLQUFHLE1BQU0sYUFBTixDQUFvQix1QkFBcEIsQ0FBSDtBQVp1QixDQUFaOztBQWVOLElBQU0sOEJBQVcsTUFBTSxhQUFOLENBQW9CLHFCQUFwQixDQUFYO0FBQ04sSUFBTSx3Q0FBZ0IsTUFBTSxhQUFOLENBQW9CLDBCQUFwQixDQUFoQjs7QUFFTixTQUFTLGFBQVQsQ0FBd0IsS0FBeEIsRUFBZ0Q7TUFBakIsZ0VBQVUscUJBQU87O0FBQ3JELE1BQUksY0FBSixDQURxRDtBQUVyRCxNQUFJLE9BQU8sS0FBUCxDQUFKLEVBQW1CO0FBQ2pCLFFBQUksQ0FBQyxPQUFELEVBQVU7QUFDWixjQUFRLFVBQVUsS0FBVixFQUFpQixPQUFqQixDQUF5QixTQUF6QixDQUFtQyxJQUFuQyxDQUFSLENBRFk7S0FBZCxNQUVPO0FBQ0wsY0FBUSxPQUFPLEtBQVAsRUFBYyxPQUFkLENBQXNCLFNBQXRCLENBQWdDLElBQWhDLENBQVIsQ0FESztLQUZQO0dBREYsTUFNTztBQUNMLFlBQVEsWUFBWSxPQUFaLENBQW9CLFNBQXBCLENBQThCLElBQTlCLENBQVIsQ0FESztHQU5QO0FBU0EsU0FBTyxLQUFQLENBWHFEO0NBQWhEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IGVtcHR5Qm9hcmQgfSBmcm9tICcuL2NoZXNzLXV0aWxzJ1xuaW1wb3J0IHsgZ2V0RmlsZVJhbmsgfSBmcm9tICcuL2NoZXNzLXV0aWxzJ1xuXG5leHBvcnQgY2xhc3MgQVNDSUlCb2FyZCB7XG4gIGNvbnN0cnVjdG9yIChmZW4pIHtcbiAgICB0aGlzLmJvYXJkID0gZW1wdHlCb2FyZCgpXG4gICAgdGhpcy5mZW4gPSBmZW5cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBwaWVjZSBhdCBhIHNxdWFyZVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IHBpZWNlIC0gdGhlIGFzY2lpIHJlcHJlc2VudGF0aW9uIG9mIGEgcGllY2UuIEVnOiBcIktcIlxuICAgKi9cbiAgcGllY2UgKHNxdWFyZSkge1xuICAgIGNvbnN0IFtmaWxlLCByYW5rXSA9IGdldEZpbGVSYW5rKHNxdWFyZSlcbiAgICByZXR1cm4gdGhpcy5fZ2V0UGllY2UoZmlsZSwgcmFuaylcbiAgfVxuXG4gIC8qKlxuICAgKiBQbGFjZXMgYSBwaWVjZSBpbiB0aGUgZ2l2ZW4gc3F1YXJlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc3F1YXJlIC0gVGhlIHNxdWFyZS4gRWc6IFwiYTJcIlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGllY2UgLSB0aGUgYXNjaWkgcmVwcmVzZW50YXRpb24gb2YgYSBwaWVjZS4gRWc6IFwiS1wiXG4gICAqL1xuICBwdXQgKHNxdWFyZSwgcGllY2UpIHtcbiAgICBjb25zdCBbZmlsZSwgcmFua10gPSBnZXRGaWxlUmFuayhzcXVhcmUpXG4gICAgdGhpcy5fc2V0UGllY2UoZmlsZSwgcmFuaywgcGllY2UpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgcGllY2UgYXQgdGhlIGdpdmVuIHNxdWFyZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICovXG4gIGNsZWFyIChzcXVhcmUpIHtcbiAgICB0aGlzLnB1dChzcXVhcmUsICcnKVxuICB9XG5cbiAgLyoqXG4gICAqIE1vdmVzIGEgcGllY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmcm9tIC0gVGhlIHNxdWFyZSB0byBtb3ZlIGZyb20uIEVnOiBcImEyXCJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRvIC0gVGhlIHNxdWFyZSB0byBtb3ZlIHRvLiBFZzogXCJhM1wiXG4gICAqL1xuICBtb3ZlIChmcm9tLCB0bykge1xuICAgIGNvbnN0IHBpZWNlID0gdGhpcy5fZ2V0UGllY2UodGhpcy5waWVjZShmcm9tKSlcbiAgICBpZiAoIXBpZWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01vdmUgRXJyb3I6IHRoZSBmcm9tIHNxdWFyZSB3YXMgZW1wdHknKVxuICAgIH1cbiAgICB0aGlzLnB1dCh0bywgcGllY2UpXG4gICAgdGhpcy5jbGVhcihmcm9tKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCB0aGUgY3VycmVudCBwb3NpdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZlbiAtIGEgcG9zaXRpb24gc3RyaW5nIGFzIEZFTlxuICAgKi9cbiAgc2V0IGZlbiAoZmVuKSB7XG4gICAgaWYgKCFmZW4pIHJldHVyblxuICAgIGlmIChmZW4gPT09ICdzdGFydCcpIGZlbiA9ICdybmJxa2Juci9wcHBwcHBwcC84LzgvOC84L1BQUFBQUFBQL1JOQlFLQk5SJ1xuXG4gICAgbGV0IHJhbmsgPSAwXG4gICAgbGV0IGZpbGUgPSAwXG4gICAgbGV0IGZlbkluZGV4ID0gMFxuXG4gICAgbGV0IGZlbkNoYXJcbiAgICBsZXQgY291bnRcblxuICAgIHdoaWxlIChmZW5JbmRleCA8IGZlbi5sZW5ndGgpIHtcbiAgICAgIGZlbkNoYXIgPSBmZW5bZmVuSW5kZXhdXG5cbiAgICAgIGlmIChmZW5DaGFyID09PSAnICcpIHtcbiAgICAgICAgYnJlYWsgLy8gaWdub3JlIHRoZSByZXN0XG4gICAgICB9XG4gICAgICBpZiAoZmVuQ2hhciA9PT0gJy8nKSB7XG4gICAgICAgIHJhbmsrK1xuICAgICAgICBmaWxlID0gMFxuICAgICAgICBmZW5JbmRleCsrXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGlmIChpc05hTihwYXJzZUludChmZW5DaGFyLCAxMCkpKSB7XG4gICAgICAgIHRoaXMuX3NldFBpZWNlKGZpbGUsIHJhbmssIGZlbkNoYXIpXG4gICAgICAgIGZpbGUrK1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY291bnQgPSBwYXJzZUludChmZW5DaGFyLCAxMClcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICAgICAgdGhpcy5fc2V0UGllY2UoZmlsZSwgcmFuaywgJycpXG4gICAgICAgICAgZmlsZSsrXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZmVuSW5kZXgrK1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24gYXMgRkVOLlxuICAgKi9cbiAgZ2V0IGZlbiAoKSB7XG4gICAgbGV0IGZlbiA9IFtdXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgIGxldCBlbXB0eSA9IDBcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgODsgaisrKSB7XG4gICAgICAgIGNvbnN0IHBpZWNlID0gdGhpcy5fZ2V0UGllY2UoaiwgaSlcbiAgICAgICAgaWYgKHBpZWNlKSB7XG4gICAgICAgICAgaWYgKGVtcHR5ID4gMCkge1xuICAgICAgICAgICAgZmVuLnB1c2goZW1wdHkpXG4gICAgICAgICAgICBlbXB0eSA9IDBcbiAgICAgICAgICB9XG4gICAgICAgICAgZmVuLnB1c2gocGllY2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW1wdHkrK1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZW1wdHkgPiAwKSB7XG4gICAgICAgIGZlbi5wdXNoKGVtcHR5KVxuICAgICAgfVxuICAgICAgZmVuLnB1c2goJy8nKVxuICAgIH1cbiAgICBmZW4ucG9wKClcbiAgICByZXR1cm4gZmVuLmpvaW4oJycpXG4gIH1cblxuICBfc2V0UGllY2UgKGZpbGUsIHJhbmssIGZlbkNoYXIpIHtcbiAgICB0aGlzLmJvYXJkW2ZpbGVdW3JhbmtdID0gZmVuQ2hhclxuICB9XG5cbiAgX2dldFBpZWNlIChmaWxlLCByYW5rKSB7XG4gICAgcmV0dXJuIHRoaXMuYm9hcmRbZmlsZV1bcmFua11cbiAgfVxufVxuIiwiaW1wb3J0IHsgQVNDSUlCb2FyZCB9IGZyb20gJy4vYXNjaWktY2hlc3MtYm9hcmQnXG5pbXBvcnQgeyB0ZW1wbGF0ZSwgZnJhbWVUZW1wbGF0ZSwgZ2V0UGllY2VDbG9uZSB9IGZyb20gJy4vdGVtcGxhdGVzJ1xuaW1wb3J0IHsgcmVtb3ZlTm9kZUNvbnRlbnQgfSBmcm9tICcuL2RvbS11dGlscydcblxuY2xhc3MgQ2hlc3NCb2FyZCBleHRlbmRzIEhUTUxFbGVtZW50IHtcbiAgY3JlYXRlZENhbGxiYWNrICgpIHtcbiAgICB0aGlzLl9ib2FyZFJvb3QgPSB0aGlzLmNyZWF0ZVNoYWRvd1Jvb3QoKVxuXG4gICAgdmFyIGNsb25lID0gdGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcbiAgICB0aGlzLl9ib2FyZFJvb3QuYXBwZW5kQ2hpbGQoY2xvbmUpXG5cbiAgICB0aGlzLl9hc2NpaUJvYXJkID0gbmV3IEFTQ0lJQm9hcmQodGhpcy5pbm5lckhUTUwudHJpbSgpKVxuICAgIHRoaXMuX2JvYXJkID0gdGhpcy5fYm9hcmRSb290LnF1ZXJ5U2VsZWN0b3IoJy5jaGVzc0JvYXJkJylcblxuICAgIHRoaXMuX2ZyYW1lUm9vdCA9IHRoaXMuY3JlYXRlU2hhZG93Um9vdCgpXG4gICAgdGhpcy5fZnJhbWVSb290LmFwcGVuZENoaWxkKGZyYW1lVGVtcGxhdGUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSkpXG5cbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpXG5cbiAgICAvKlxuICAgICAqIEEgc3Rpbmt5IGZ1Z2x5IHdvcmthcm91bmQgdG8gcmVkcmF3IHRoZSBib2FyZC5cbiAgICAgKlxuICAgICAqIChDaHJvbWUgMzYvMzgpIFRoZSBjaGVzc2JvYXJkIHdpbGwgbm90IHJvdGF0ZSB3aXRoIGNzcyBpZiBJIGRvIG5vdCBmb3JjZVxuICAgICAqIGEgcmVkcmF3IG9mIHRoZSBjb21wb25lbnQuIEl0J3MgZGlmZmljdWx0IHRvIHJlcHJvZHVjZSBhIG1pbmltYWwgZXhhbXBsZVxuICAgICAqIGZvciBidWdyZXBvcnRzLlxuICAgICAqL1xuICAgIHRoaXMuc3R5bGUuZGlzcGxheSA9ICdydW4taW4nXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgfSwgMClcbiAgICAvLyBlbmQgb2Ygc3Rpbmt5IGZ1Z2x5IHdvcmthcm91bmRcbiAgfVxuXG4gIGF0dHJpYnV0ZUNoYW5nZWRDYWxsYmFjayAoYXR0cmlidXRlLCBvbGRWYWwsIG5ld1ZhbCkge1xuICAgIGlmIChhdHRyaWJ1dGUgPT09ICd1bmljb2RlJykge1xuICAgICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgY3VycmVudCBib2FyZCB3aXRoIGFuIGVtcHR5IG9uZS5cbiAgICovXG4gIGNsZWFyQm9hcmQgKCkge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQgPSBuZXcgQVNDSUlCb2FyZCh0aGlzLmlubmVySFRNTC50cmltKCkpXG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICB9XG5cbiAgX3JlbmRlckJvYXJkICgpIHtcbiAgICBjb25zdCBhc2NpaSA9IHRoaXMuX2FzY2lpQm9hcmQuYm9hcmRcbiAgICBjb25zdCBib2FyZCA9IHRoaXMuX2JvYXJkXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhc2NpaS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgcm93ID0gYm9hcmQucm93c1tpXVxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBhc2NpaS5sZW5ndGg7IGorKykge1xuICAgICAgICBsZXQgY2VsbCA9IHJvdy5jZWxsc1tqXVxuICAgICAgICBsZXQgYXNjaWlDaGFyID0gYXNjaWlbal1baV1cbiAgICAgICAgdGhpcy5fdXBkYXRlQ2VsbChjZWxsLCBhc2NpaUNoYXIpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3VwZGF0ZUNlbGwgKGNlbGwsIGFzY2lpQ2hhcikge1xuICAgIGNvbnN0IGN1cnJlbnRQaWVjZSA9IGNlbGwucXVlcnlTZWxlY3RvcignW2FzY2lpXScpIHx8IHthdHRyaWJ1dGVzOiB7fX1cbiAgICBjb25zdCBjdXJyZW50QXNjaWkgPSBjdXJyZW50UGllY2UuYXR0cmlidXRlcy5hc2NpaVxuICAgIGNvbnN0IGN1cnJlbnRVbmljb2RlID0gISFjdXJyZW50UGllY2UuYXR0cmlidXRlcy51bmljb2RlXG4gICAgY29uc3QgdW5pY29kZSA9ICEhdGhpcy5hdHRyaWJ1dGVzLnVuaWNvZGVcblxuICAgIC8vIHN1cGVyc2ltcGxlIGRpZmZcbiAgICBpZiAoYXNjaWlDaGFyICE9PSBjdXJyZW50QXNjaWkgfHwgdW5pY29kZSAhPT0gY3VycmVudFVuaWNvZGUpIHtcbiAgICAgIHJlbW92ZU5vZGVDb250ZW50KGNlbGwpXG4gICAgICBjZWxsLmFwcGVuZENoaWxkKGdldFBpZWNlQ2xvbmUoYXNjaWlDaGFyLCB1bmljb2RlKSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgcGllY2UgYXQgYSBzcXVhcmVcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICogQHJldHVybiB7c3RyaW5nfSBwaWVjZSAtIHRoZSBhc2NpaSByZXByZXNlbnRhdGlvbiBvZiBhIHBpZWNlLiBFZzogXCJLXCJcbiAgICovXG4gIHBpZWNlIChzcXVhcmUpIHtcbiAgICB0aGlzLl9hc2NpaUJvYXJkLnBpZWNlKHNxdWFyZSlcbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpXG4gIH1cblxuICAvKipcbiAgICogUGxhY2VzIGEgcGllY2UgaW4gdGhlIGdpdmVuIHNxdWFyZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICogQHBhcmFtIHtzdHJpbmd9IHBpZWNlIC0gdGhlIGFzY2lpIHJlcHJlc2VudGF0aW9uIG9mIGEgcGllY2UuIEVnOiBcIktcIlxuICAgKi9cbiAgcHV0IChzcXVhcmUsIHBpZWNlKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5wdXQoc3F1YXJlLCBwaWVjZSlcbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyB0aGUgcGllY2UgYXQgdGhlIGdpdmVuIHNxdWFyZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNxdWFyZSAtIFRoZSBzcXVhcmUuIEVnOiBcImEyXCJcbiAgICovXG4gIGNsZWFyIChzcXVhcmUpIHtcbiAgICB0aGlzLl9hc2NpaUJvYXJkLmNsZWFyKHNxdWFyZSlcbiAgICB0aGlzLl9yZW5kZXJCb2FyZCgpXG4gIH1cblxuICAvKipcbiAgICogTW92ZXMgYSBwaWVjZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZyb20gLSBUaGUgc3F1YXJlIHRvIG1vdmUgZnJvbS4gRWc6IFwiYTJcIlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdG8gLSBUaGUgc3F1YXJlIHRvIG1vdmUgdG8uIEVnOiBcImEzXCJcbiAgICovXG4gIG1vdmUgKGZyb20sIHRvKSB7XG4gICAgdGhpcy5fYXNjaWlCb2FyZC5tb3ZlKGZyb20sIHRvKVxuICAgIHRoaXMuX3JlbmRlckJvYXJkKClcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgdGhlIGN1cnJlbnQgcG9zaXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmZW4gLSBhIHBvc2l0aW9uIHN0cmluZyBhcyBGRU5cbiAgICovXG4gIHNldCBmZW4gKGZlbikge1xuICAgIHRoaXMuX2FzY2lpQm9hcmQuZmVuID0gZmVuXG4gICAgdGhpcy5fcmVuZGVyQm9hcmQoKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY3VycmVudCBwb3NpdGlvbiBhcyBGRU4uXG4gICAqL1xuICBnZXQgZmVuICgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXNjaWlCb2FyZC5mZW5cbiAgfVxufVxuXG53aW5kb3cuQ2hlc3NCb2FyZCA9IGRvY3VtZW50LnJlZ2lzdGVyRWxlbWVudCgnY2hlc3MtYm9hcmQnLCBDaGVzc0JvYXJkKVxuIiwiZXhwb3J0IGNvbnN0IHJhbmtzID0gezE6IDcsIDI6IDYsIDM6IDUsIDQ6IDQsIDU6IDMsIDY6IDIsIDc6IDEsIDg6IDB9XG5leHBvcnQgY29uc3QgZmlsZXMgPSB7YTogMCwgYjogMSwgYzogMiwgZDogMywgZTogNCwgZjogNSwgZzogNiwgaDogN31cblxuLyoqXG4gKiBSZXR1cm5zIGluZGljZXMgZm9yIGEgY2VsbFxuICogKGNhbiBiZSB1c2VkIHRvIGFjY2VzcyBib2FyZCBhcnJheXMpXG4gKlxuICogRXhhbXBsZTpcbiAqICAgZ2V0RmlsZVJhbmsoXCJhMlwiKSA9PiBbMCwgNl1cbiAqXG4gKiAgIDIgPSA2IGJlY2F1c2UgYXJyYXlzIHVzYWxseSBhcmUgZGlzcGxheWVkIHdpdGggMCwwIGluIHRoZSB1cHBlclxuICogICBsZWZ0IGNvcm5lclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcXVhcmUgLSBFZzogXCJhMlwiXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRGaWxlUmFuayAoc3F1YXJlKSB7XG4gIGNvbnN0IFtmaWxlLCByYW5rXSA9IHNxdWFyZVxuICByZXR1cm4gW2ZpbGVzW2ZpbGVdLCByYW5rc1tyYW5rXV1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5Qm9hcmQgKCkge1xuICBjb25zdCBib2FyZCA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgYm9hcmRbaV0gPSBbXVxuICB9XG4gIHJldHVybiBib2FyZFxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZU5vZGVDb250ZW50IChub2RlKSB7XG4gIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICBub2RlLnJlbW92ZUNoaWxkKG5vZGUuZmlyc3RDaGlsZClcbiAgfVxufVxuIiwidmFyIG93bmVyXG5pZiAod2luZG93LkhUTUxJbXBvcnRzICYmICF3aW5kb3cuSFRNTEltcG9ydHMudXNlTmF0aXZlKSB7XG4gIG93bmVyID0gZG9jdW1lbnQuX2N1cnJlbnRTY3JpcHQub3duZXJEb2N1bWVudFxufSBlbHNlIHtcbiAgb3duZXIgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0Lm93bmVyRG9jdW1lbnRcbn1cblxuZXhwb3J0IGNvbnN0IGVtcHR5U3F1YXJlID0gb3duZXIucXVlcnlTZWxlY3RvcignI2VtcHR5VGVtcGxhdGUnKVxuXG5leHBvcnQgY29uc3QgcGllY2VzID0ge1xuICBQOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVQYXduVGVtcGxhdGUnKSwgICAgICAvLyDimZkgd2hpdGVcbiAgTjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlS25pZ2h0VGVtcGxhdGUnKSwgICAgLy8g4pmYXG4gIEI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUJpc2hvcFRlbXBsYXRlJyksICAgIC8vIOKZl1xuICBSOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVSb29rVGVtcGxhdGUnKSwgICAgICAvLyDimZZcbiAgUTogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUXVlZW5UZW1wbGF0ZScpLCAgICAgLy8g4pmVXG4gIEs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtpbmdUZW1wbGF0ZScpLCAgICAgIC8vIOKZlFxuICBwOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tQYXduVGVtcGxhdGUnKSwgICAgICAvLyDimZ8gYmxhY2tcbiAgbjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrS25pZ2h0VGVtcGxhdGUnKSwgICAgLy8g4pmeXG4gIGI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0Jpc2hvcFRlbXBsYXRlJyksICAgIC8vIOKZnVxuICByOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tSb29rVGVtcGxhdGUnKSwgICAgICAvLyDimZxcbiAgcTogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUXVlZW5UZW1wbGF0ZScpLCAgICAgLy8g4pmbXG4gIGs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tpbmdUZW1wbGF0ZScpICAgICAgIC8vIOKZmlxufVxuXG5leHBvcnQgY29uc3Qgc3ZnUGllY2VzID0ge1xuICBQOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVQYXduU3ZnVGVtcGxhdGUnKSwgICAvLyDimZkgd2hpdGVcbiAgTjogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlS25pZ2h0U3ZnVGVtcGxhdGUnKSwgLy8g4pmYXG4gIEI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUJpc2hvcFN2Z1RlbXBsYXRlJyksIC8vIOKZl1xuICBSOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjd2hpdGVSb29rU3ZnVGVtcGxhdGUnKSwgICAvLyDimZZcbiAgUTogb3duZXIucXVlcnlTZWxlY3RvcignI3doaXRlUXVlZW5TdmdUZW1wbGF0ZScpLCAgLy8g4pmVXG4gIEs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyN3aGl0ZUtpbmdTdmdUZW1wbGF0ZScpLCAgIC8vIOKZlFxuICBwOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tQYXduU3ZnVGVtcGxhdGUnKSwgICAvLyDimZ8gYmxhY2tcbiAgbjogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrS25pZ2h0U3ZnVGVtcGxhdGUnKSwgLy8g4pmeXG4gIGI6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0Jpc2hvcFN2Z1RlbXBsYXRlJyksIC8vIOKZnVxuICByOiBvd25lci5xdWVyeVNlbGVjdG9yKCcjYmxhY2tSb29rU3ZnVGVtcGxhdGUnKSwgICAvLyDimZxcbiAgcTogb3duZXIucXVlcnlTZWxlY3RvcignI2JsYWNrUXVlZW5TdmdUZW1wbGF0ZScpLCAgLy8g4pmbXG4gIGs6IG93bmVyLnF1ZXJ5U2VsZWN0b3IoJyNibGFja0tpbmdTdmdUZW1wbGF0ZScpICAgIC8vIOKZmlxufVxuXG5leHBvcnQgY29uc3QgdGVtcGxhdGUgPSBvd25lci5xdWVyeVNlbGVjdG9yKCcjY2hlc3NCb2FyZFRlbXBsYXRlJylcbmV4cG9ydCBjb25zdCBmcmFtZVRlbXBsYXRlID0gb3duZXIucXVlcnlTZWxlY3RvcignI2NoZXNzQm9hcmRGcmFtZVRlbXBsYXRlJylcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBpZWNlQ2xvbmUgKHBpZWNlLCB1bmljb2RlID0gZmFsc2UpIHtcbiAgbGV0IGNsb25lXG4gIGlmIChwaWVjZXNbcGllY2VdKSB7XG4gICAgaWYgKCF1bmljb2RlKSB7XG4gICAgICBjbG9uZSA9IHN2Z1BpZWNlc1twaWVjZV0uY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY2xvbmUgPSBwaWVjZXNbcGllY2VdLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNsb25lID0gZW1wdHlTcXVhcmUuY29udGVudC5jbG9uZU5vZGUodHJ1ZSlcbiAgfVxuICByZXR1cm4gY2xvbmVcbn1cbiJdfQ==
