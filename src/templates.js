var owner
if (window.HTMLImports && !window.HTMLImports.useNative) {
  owner = document._currentScript.ownerDocument
} else {
  owner = document.currentScript.ownerDocument
}

export const emptySquare = owner.querySelector('#emptyTemplate')

export const pieces = {
  P: owner.querySelector('#whitePawnTemplate'),      // ♙ white
  N: owner.querySelector('#whiteKnightTemplate'),    // ♘
  B: owner.querySelector('#whiteBishopTemplate'),    // ♗
  R: owner.querySelector('#whiteRookTemplate'),      // ♖
  Q: owner.querySelector('#whiteQueenTemplate'),     // ♕
  K: owner.querySelector('#whiteKingTemplate'),      // ♔
  p: owner.querySelector('#blackPawnTemplate'),      // ♟ black
  n: owner.querySelector('#blackKnightTemplate'),    // ♞
  b: owner.querySelector('#blackBishopTemplate'),    // ♝
  r: owner.querySelector('#blackRookTemplate'),      // ♜
  q: owner.querySelector('#blackQueenTemplate'),     // ♛
  k: owner.querySelector('#blackKingTemplate')       // ♚
}

export const svgPieces = {
  P: owner.querySelector('#whitePawnSvgTemplate'),   // ♙ white
  N: owner.querySelector('#whiteKnightSvgTemplate'), // ♘
  B: owner.querySelector('#whiteBishopSvgTemplate'), // ♗
  R: owner.querySelector('#whiteRookSvgTemplate'),   // ♖
  Q: owner.querySelector('#whiteQueenSvgTemplate'),  // ♕
  K: owner.querySelector('#whiteKingSvgTemplate'),   // ♔
  p: owner.querySelector('#blackPawnSvgTemplate'),   // ♟ black
  n: owner.querySelector('#blackKnightSvgTemplate'), // ♞
  b: owner.querySelector('#blackBishopSvgTemplate'), // ♝
  r: owner.querySelector('#blackRookSvgTemplate'),   // ♜
  q: owner.querySelector('#blackQueenSvgTemplate'),  // ♛
  k: owner.querySelector('#blackKingSvgTemplate')    // ♚
}

export const template = owner.querySelector('#chessBoardTemplate')
export const frameTemplate = owner.querySelector('#chessBoardFrameTemplate')

export function getPieceClone (piece, unicode = false) {
  let clone
  if (pieces[piece]) {
    if (!unicode) {
      clone = svgPieces[piece].content.cloneNode(true)
    } else {
      clone = pieces[piece].content.cloneNode(true)
    }
  } else {
    clone = emptySquare.content.cloneNode(true)
  }
  return clone
}
