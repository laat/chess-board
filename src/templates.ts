import { Piece, isPiece } from "./fen-chess-board";

const html = String.raw;

export const emptySquare = document.createElement("template");
emptySquare.innerHTML = html`
  <span class="empty" ascii=""></span>
`;

const whitePawnTemplate = document.createElement("template");
whitePawnTemplate.innerHTML = html`
  <span class="piece white pawn" unicode ascii="P">♙</span>
`;
const whitePawnSvgTemplate = document.createElement("template");
whitePawnSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 45 45"
    class="piece white pawn"
    ascii="P"
  >
    <path
      d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
      style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    />
  </svg>
`;

const whiteKnightTemplate = document.createElement("template");
whiteKnightTemplate.innerHTML = html`
  <span class="piece white knight" unicode ascii="N">♘</span>
`;
const whiteKnightSvgTemplate = document.createElement("template");
whiteKnightSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewBox="0 0 45 45"
    class="piece white knight"
    ascii="N"
  >
    <g
      style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <path
        d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
        style="fill:#ffffff; stroke:#000000;"
      />
      <path
        d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
        style="fill:#ffffff; stroke:#000000;"
      />
      <path
        d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
        style="fill:#000000; stroke:#000000;"
      />
      <path
        d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
        transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
        style="fill:#000000; stroke:#000000;"
      />
    </g>
  </svg>
`;

const whiteBishopTemplate = document.createElement("template");
whiteBishopTemplate.innerHTML = html`
  <span class="piece white bishop" unicode ascii="B">♗</span>
`;
const whiteBishopSvgTemplate = document.createElement("template");
whiteBishopSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece white bishop"
    ascii="B"
  >
    <g
      style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <g style="fill:#ffffff; stroke:#000000; stroke-linecap:butt;">
        <path
          d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"
        />
        <path
          d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"
        />
        <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
      </g>
      <path
        d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;"
      />
    </g>
  </svg>
`;

const whiteRookTemplate = document.createElement("template");
whiteRookTemplate.innerHTML = html`
  <span class="piece white rook" unicode ascii="R">♖</span>
`;
const whiteRookSvgTemplate = document.createElement("template");
whiteRookSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece white rook"
    ascii="R"
  >
    <g
      style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <path
        d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
        style="stroke-linecap:butt;"
      />
      <path
        d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
        style="stroke-linecap:butt;"
      />
      <path
        d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14"
        style="stroke-linecap:butt;"
      />
      <path d="M 34,14 L 31,17 L 14,17 L 11,14" />
      <path
        d="M 31,17 L 31,29.5 L 14,29.5 L 14,17"
        style="stroke-linecap:butt; stroke-linejoin:miter;"
      />
      <path d="M 31,29.5 L 32.5,32 L 12.5,32 L 14,29.5" />
      <path
        d="M 11,14 L 34,14"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;"
      />
    </g>
  </svg>
`;

const whiteQueenTemplate = document.createElement("template");
whiteQueenTemplate.innerHTML = html`
  <span class="piece white queen" unicode ascii="Q">♕</span>
`;
const whiteQueenSvgTemplate = document.createElement("template");
whiteQueenSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece white queen"
    ascii="Q"
  >
    <g
      style="opacity:1; fill:#ffffff; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(-1,-1)"
      />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(15.5,-5.5)"
      />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(32,-1)"
      />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(7,-4.5)"
      />
      <path
        d="M 9 13 A 2 2 0 1 1  5,13 A 2 2 0 1 1  9 13 z"
        transform="translate(24,-4)"
      />
      <path
        d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38,14 L 31,25 L 31,11 L 25.5,24.5 L 22.5,9.5 L 19.5,24.5 L 14,10.5 L 14,25 L 7,14 L 9,26 z "
        style="stroke-linecap:butt;"
      />
      <path
        d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z "
        style="stroke-linecap:butt;"
      />
      <path d="M 11.5,30 C 15,29 30,29 33.5,30" style="fill:none;" />
      <path d="M 12,33.5 C 18,32.5 27,32.5 33,33.5" style="fill:none;" />
    </g>
  </svg>
`;

const whiteKingTemplate = document.createElement("template");
whiteKingTemplate.innerHTML = html`
  <span class="piece white king" unicode ascii="K">♔</span>
`;

const whiteKingSvgTemplate = document.createElement("template");
whiteKingSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece white king"
    ascii="K"
  >
    <g
      style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <path
        d="M 22.5,11.63 L 22.5,6"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;"
      />
      <path
        d="M 20,8 L 25,8"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;"
      />
      <path
        d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
        style="fill:#ffffff; stroke:#000000; stroke-linecap:butt; stroke-linejoin:miter;"
      />
      <path
        d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
        style="fill:#ffffff; stroke:#000000;"
      />
      <path
        d="M 11.5,30 C 17,27 27,27 32.5,30"
        style="fill:none; stroke:#000000;"
      />
      <path
        d="M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5"
        style="fill:none; stroke:#000000;"
      />
      <path
        d="M 11.5,37 C 17,34 27,34 32.5,37"
        style="fill:none; stroke:#000000;"
      />
    </g>
  </svg>
`;
const blackPawnTemplate = document.createElement("template");
blackPawnTemplate.innerHTML = html`
  <span class="piece black pawn" unicode ascii="p">♟</span>
`;

const blackPawnSvgTemplate = document.createElement("template");
blackPawnSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece black pawn"
    ascii="p"
  >
    <path
      d="M 22,9 C 19.79,9 18,10.79 18,13 C 18,13.89 18.29,14.71 18.78,15.38 C 16.83,16.5 15.5,18.59 15.5,21 C 15.5,23.03 16.44,24.84 17.91,26.03 C 14.91,27.09 10.5,31.58 10.5,39.5 L 33.5,39.5 C 33.5,31.58 29.09,27.09 26.09,26.03 C 27.56,24.84 28.5,23.03 28.5,21 C 28.5,18.59 27.17,16.5 25.22,15.38 C 25.71,14.71 26,13.89 26,13 C 26,10.79 24.21,9 22,9 z "
      style="opacity:1; fill:#000000; fill-opacity:1; fill-rule:nonzero; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:miter; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    />
  </svg>
`;

const blackKnightTemplate = document.createElement("template");
blackKnightTemplate.innerHTML = html`
  <span class="piece black knight" unicode ascii="n">♞</span>
`;
const blackKnightSvgTemplate = document.createElement("template");
blackKnightSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece black knight"
    ascii="n"
  >
    <g
      style="opacity:1; fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <path
        d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18"
        style="fill:#000000; stroke:#000000;"
      />
      <path
        d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10"
        style="fill:#000000; stroke:#000000;"
      />
      <path
        d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z"
        style="fill:#ffffff; stroke:#ffffff;"
      />
      <path
        d="M 15 15.5 A 0.5 1.5 0 1 1  14,15.5 A 0.5 1.5 0 1 1  15 15.5 z"
        transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)"
        style="fill:#ffffff; stroke:#ffffff;"
      />
      <path
        d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5 L 37.45,39.5 L 37.5,39 C 38,28.94 36.62,22.15 34.25,17.66 C 31.88,13.17 28.46,11.02 25.06,10.5 L 24.55,10.4 z "
        style="fill:#ffffff; stroke:none;"
      />
    </g>
  </svg>
`;

const blackBishopTemplate = document.createElement("template");
blackBishopTemplate.innerHTML = html`
  <span class="piece black bishop" unicode ascii="b">♝</span>
`;
const blackBishopSvgTemplate = document.createElement("template");
blackBishopSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece black bishop"
    ascii="b"
  >
    <g
      style="opacity:1; fill:none; fill-rule:evenodd; fill-opacity:1; stroke:#000000; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <g style="fill:#000000; stroke:#000000; stroke-linecap:butt;">
        <path
          d="M 9,36 C 12.39,35.03 19.11,36.43 22.5,34 C 25.89,36.43 32.61,35.03 36,36 C 36,36 37.65,36.54 39,38 C 38.32,38.97 37.35,38.99 36,38.5 C 32.61,37.53 25.89,38.96 22.5,37.5 C 19.11,38.96 12.39,37.53 9,38.5 C 7.646,38.99 6.677,38.97 6,38 C 7.354,36.06 9,36 9,36 z"
        />
        <path
          d="M 15,32 C 17.5,34.5 27.5,34.5 30,32 C 30.5,30.5 30,30 30,30 C 30,27.5 27.5,26 27.5,26 C 33,24.5 33.5,14.5 22.5,10.5 C 11.5,14.5 12,24.5 17.5,26 C 17.5,26 15,27.5 15,30 C 15,30 14.5,30.5 15,32 z"
        />
        <path d="M 25 8 A 2.5 2.5 0 1 1  20,8 A 2.5 2.5 0 1 1  25 8 z" />
      </g>
      <path
        d="M 17.5,26 L 27.5,26 M 15,30 L 30,30 M 22.5,15.5 L 22.5,20.5 M 20,18 L 25,18"
        style="fill:none; stroke:#ffffff; stroke-linejoin:miter;"
      />
    </g>
  </svg>
`;

const blackRookTemplate = document.createElement("template");
blackRookTemplate.innerHTML = html`
  <span class="piece black rook" unicode ascii="r">♜</span>
`;
const blackRookSvgTemplate = document.createElement("template");
blackRookSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece black rook"
    ascii="r"
  >
    <g
      style="opacity:1; fill:000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <path
        d="M 9,39 L 36,39 L 36,36 L 9,36 L 9,39 z "
        style="stroke-linecap:butt;"
      />
      <path
        d="M 12.5,32 L 14,29.5 L 31,29.5 L 32.5,32 L 12.5,32 z "
        style="stroke-linecap:butt;"
      />
      <path
        d="M 12,36 L 12,32 L 33,32 L 33,36 L 12,36 z "
        style="stroke-linecap:butt;"
      />
      <path
        d="M 14,29.5 L 14,16.5 L 31,16.5 L 31,29.5 L 14,29.5 z "
        style="stroke-linecap:butt;stroke-linejoin:miter;"
      />
      <path
        d="M 14,16.5 L 11,14 L 34,14 L 31,16.5 L 14,16.5 z "
        style="stroke-linecap:butt;"
      />
      <path
        d="M 11,14 L 11,9 L 15,9 L 15,11 L 20,11 L 20,9 L 25,9 L 25,11 L 30,11 L 30,9 L 34,9 L 34,14 L 11,14 z "
        style="stroke-linecap:butt;"
      />
      <path
        d="M 12,35.5 L 33,35.5 L 33,35.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
      />
      <path
        d="M 13,31.5 L 32,31.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
      />
      <path
        d="M 14,29.5 L 31,29.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
      />
      <path
        d="M 14,16.5 L 31,16.5"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
      />
      <path
        d="M 11,14 L 34,14"
        style="fill:none; stroke:#ffffff; stroke-width:1; stroke-linejoin:miter;"
      />
    </g>
  </svg>
`;

const blackQueenTemplate = document.createElement("template");
blackQueenTemplate.innerHTML = html`
  <span class="piece black queen" unicode ascii="q">♛</span>
`;
const blackQueenSvgTemplate = document.createElement("template");
blackQueenSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece black queen"
    ascii="q"
  >
    <g
      style="opacity:1; fill:000000; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <g style="fill:#000000; stroke:none;">
        <circle cx="6" cy="12" r="2.75" />
        <circle cx="14" cy="9" r="2.75" />
        <circle cx="22.5" cy="8" r="2.75" />
        <circle cx="31" cy="9" r="2.75" />
        <circle cx="39" cy="12" r="2.75" />
      </g>
      <path
        d="M 9,26 C 17.5,24.5 30,24.5 36,26 L 38.5,13.5 L 31,25 L 30.7,10.9 L 25.5,24.5 L 22.5,10 L 19.5,24.5 L 14.3,10.9 L 14,25 L 6.5,13.5 L 9,26 z"
        style="stroke-linecap:butt; stroke:#000000;"
      />
      <path
        d="M 9,26 C 9,28 10.5,28 11.5,30 C 12.5,31.5 12.5,31 12,33.5 C 10.5,34.5 10.5,36 10.5,36 C 9,37.5 11,38.5 11,38.5 C 17.5,39.5 27.5,39.5 34,38.5 C 34,38.5 35.5,37.5 34,36 C 34,36 34.5,34.5 33,33.5 C 32.5,31 32.5,31.5 33.5,30 C 34.5,28 36,28 36,26 C 27.5,24.5 17.5,24.5 9,26 z"
        style="stroke-linecap:butt;"
      />
      <path
        d="M 11,38.5 A 35,35 1 0 0 34,38.5"
        style="fill:none; stroke:#000000; stroke-linecap:butt;"
      />
      <path
        d="M 11,29 A 35,35 1 0 1 34,29"
        style="fill:none; stroke:#ffffff;"
      />
      <path d="M 12.5,31.5 L 32.5,31.5" style="fill:none; stroke:#ffffff;" />
      <path
        d="M 11.5,34.5 A 35,35 1 0 0 33.5,34.5"
        style="fill:none; stroke:#ffffff;"
      />
      <path
        d="M 10.5,37.5 A 35,35 1 0 0 34.5,37.5"
        style="fill:none; stroke:#ffffff;"
      />
    </g>
  </svg>
`;

const blackKingTemplate = document.createElement("template");
blackKingTemplate.innerHTML = html`
  <span class="piece black king" unicode ascii="k">♚</span>
`;

const blackKingSvgTemplate = document.createElement("template");
blackKingSvgTemplate.innerHTML = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    viewbox="0 0 45 45"
    class="piece black king"
    ascii="k"
  >
    <g
      style="fill:none; fill-opacity:1; fill-rule:evenodd; stroke:#000000; stroke-width:1.5; stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4; stroke-dasharray:none; stroke-opacity:1;"
    >
      <path
        d="M 22.5,11.63 L 22.5,6"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;"
        id="path6570"
      />
      <path
        d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25"
        style="fill:#000000;fill-opacity:1; stroke-linecap:butt; stroke-linejoin:miter;"
      />
      <path
        d="M 11.5,37 C 17,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 19,16 9.5,13 6.5,19.5 C 3.5,25.5 11.5,29.5 11.5,29.5 L 11.5,37 z "
        style="fill:#000000; stroke:#000000;"
      />
      <path
        d="M 20,8 L 25,8"
        style="fill:none; stroke:#000000; stroke-linejoin:miter;"
      />
      <path
        d="M 32,29.5 C 32,29.5 40.5,25.5 38.03,19.85 C 34.15,14 25,18 22.5,24.5 L 22.51,26.6 L 22.5,24.5 C 20,18 9.906,14 6.997,19.85 C 4.5,25.5 11.85,28.85 11.85,28.85"
        style="fill:none; stroke:#ffffff;"
      />
      <path
        d="M 11.5,30 C 17,27 27,27 32.5,30 M 11.5,33.5 C 17,30.5 27,30.5 32.5,33.5 M 11.5,37 C 17,34 27,34 32.5,37"
        style="fill:none; stroke:#ffffff;"
      />
    </g>
  </svg>
`;

export const pieces: { [key in Piece]: HTMLTemplateElement } = {
  P: whitePawnTemplate,
  N: whiteKnightTemplate,
  B: whiteBishopTemplate,
  R: whiteRookTemplate,
  Q: whiteQueenTemplate,
  K: whiteKingTemplate,
  p: blackPawnTemplate,
  n: blackKnightTemplate,
  r: blackRookTemplate,
  b: blackBishopTemplate,
  q: blackQueenTemplate,
  k: blackKingTemplate
};

export const svgPieces: { [key in Piece]: HTMLTemplateElement } = {
  P: whitePawnSvgTemplate,
  N: whiteKnightSvgTemplate,
  B: whiteBishopSvgTemplate,
  R: whiteRookSvgTemplate,
  Q: whiteQueenSvgTemplate,
  K: whiteKingSvgTemplate,
  p: blackPawnSvgTemplate,
  n: blackKnightSvgTemplate,
  r: blackRookSvgTemplate,
  b: blackBishopSvgTemplate,
  q: blackQueenSvgTemplate,
  k: blackKingSvgTemplate
};

export const template = document.createElement("template");
template.innerHTML = html`
  <style>
    /* the frame */
    .frame {
      display: none;
    }

    :host([frame]) .frame {
      width: 1em;
      height: 1em;
      display: table-cell;
      font-size: 40%;
    }
    :host([frame]) .frame.left,
    :host([frame]) .frame.right {
      vertical-align: middle;
      padding: 0.2em;
    }
    :host([frame]) .frame.top,
    :host([frame]) .frame.bottom {
      text-align: center;
    }

    :host([reverse]) .boardFrame {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
    :host([reverse]) .frame {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }

    /* the board */
    :host {
      display: inline-block;
    }
    .chessBoard {
      border: 1px solid black;
    }
    .light {
      background: #ffce9e;
    }
    .dark {
      background: #d18b47;
    }
    td {
      width: 1em;
      height: 1em;
      text-align: center;
    }
    .piece,
    .empty {
      width: 1em;
      height: 1em;
      display: block;
    }

    :host([unicode]) .piece {
      line-height: 1em;
      font-family: "Arial Unicode MS", sans-serif;
    }

    :host([reverse]) .piece {
      transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      -webkit-transform: rotate(180deg);
    }
  </style>
  <table class="boardFrame" cellpadding="0" cellspacing="0">
    <tr>
      <td class="frame top left"></td>
      <td class="frame top">a</td>
      <td class="frame top">b</td>
      <td class="frame top">c</td>
      <td class="frame top">d</td>
      <td class="frame top">e</td>
      <td class="frame top">f</td>
      <td class="frame top">g</td>
      <td class="frame top">h</td>
      <td class="frame top right"></td>
    </tr>
    <tr>
      <td class="frame left">8</td>
      <td colspan="8" rowspan="8" class="boardWrap">
        <table class="chessBoard" cellpadding="0" cellspacing="0">
          <tr>
            <td class="a8 light"><span class="empty"></span></td>
            <td class="b8 dark"><span class="empty"></span></td>
            <td class="c8 light"><span class="empty"></span></td>
            <td class="d8 dark"><span class="empty"></span></td>
            <td class="e8 light"><span class="empty"></span></td>
            <td class="f8 dark"><span class="empty"></span></td>
            <td class="g8 light"><span class="empty"></span></td>
            <td class="h8 dark"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a7 dark"><span class="empty"></span></td>
            <td class="b7 light"><span class="empty"></span></td>
            <td class="c7 dark"><span class="empty"></span></td>
            <td class="d7 light"><span class="empty"></span></td>
            <td class="e7 dark"><span class="empty"></span></td>
            <td class="f7 light"><span class="empty"></span></td>
            <td class="g7 dark"><span class="empty"></span></td>
            <td class="h7 light"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a6 light"><span class="empty"></span></td>
            <td class="b6 dark"><span class="empty"></span></td>
            <td class="c6 light"><span class="empty"></span></td>
            <td class="d6 dark"><span class="empty"></span></td>
            <td class="e6 light"><span class="empty"></span></td>
            <td class="f6 dark"><span class="empty"></span></td>
            <td class="g6 light"><span class="empty"></span></td>
            <td class="h6 dark"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a5 dark"><span class="empty"></span></td>
            <td class="b5 light"><span class="empty"></span></td>
            <td class="c5 dark"><span class="empty"></span></td>
            <td class="d5 light"><span class="empty"></span></td>
            <td class="e5 dark"><span class="empty"></span></td>
            <td class="f5 light"><span class="empty"></span></td>
            <td class="g5 dark"><span class="empty"></span></td>
            <td class="h5 light"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a4 light"><span class="empty"></span></td>
            <td class="b4 dark"><span class="empty"></span></td>
            <td class="c4 light"><span class="empty"></span></td>
            <td class="d4 dark"><span class="empty"></span></td>
            <td class="e4 light"><span class="empty"></span></td>
            <td class="f4 dark"><span class="empty"></span></td>
            <td class="g4 light"><span class="empty"></span></td>
            <td class="h4 dark"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a3 dark"><span class="empty"></span></td>
            <td class="b3 light"><span class="empty"></span></td>
            <td class="c3 dark"><span class="empty"></span></td>
            <td class="d3 light"><span class="empty"></span></td>
            <td class="e3 dark"><span class="empty"></span></td>
            <td class="f3 light"><span class="empty"></span></td>
            <td class="g3 dark"><span class="empty"></span></td>
            <td class="h3 light"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a2 light"><span class="empty"></span></td>
            <td class="b2 dark"><span class="empty"></span></td>
            <td class="c2 light"><span class="empty"></span></td>
            <td class="d2 dark"><span class="empty"></span></td>
            <td class="e2 light"><span class="empty"></span></td>
            <td class="f2 dark"><span class="empty"></span></td>
            <td class="g2 light"><span class="empty"></span></td>
            <td class="h2 dark"><span class="empty"></span></td>
          </tr>
          <tr>
            <td class="a1 dark"><span class="empty"></span></td>
            <td class="b1 light"><span class="empty"></span></td>
            <td class="c1 dark"><span class="empty"></span></td>
            <td class="d1 light"><span class="empty"></span></td>
            <td class="e1 dark"><span class="empty"></span></td>
            <td class="f1 light"><span class="empty"></span></td>
            <td class="g1 dark"><span class="empty"></span></td>
            <td class="h1 light"><span class="empty"></span></td>
          </tr>
        </table>
      </td>
      <td class="frame right">8</td>
    </tr>
    <tr>
      <td class="frame left">7</td>
      <td class="frame right">7</td>
    </tr>
    <tr>
      <td class="frame left">6</td>
      <td class="frame right">6</td>
    </tr>
    <tr>
      <td class="frame left">5</td>
      <td class="frame right">5</td>
    </tr>
    <tr>
      <td class="frame left">4</td>
      <td class="frame right">4</td>
    </tr>
    <tr>
      <td class="frame left">3</td>
      <td class="frame right">3</td>
    </tr>
    <tr>
      <td class="frame left">2</td>
      <td class="frame right">2</td>
    </tr>
    <tr>
      <td class="frame left">1</td>
      <td class="frame right">1</td>
    </tr>
    <tr>
      <td class="frame bottom left"></td>
      <td class="frame bottom">a</td>
      <td class="frame bottom">b</td>
      <td class="frame bottom">c</td>
      <td class="frame bottom">d</td>
      <td class="frame bottom">e</td>
      <td class="frame bottom">f</td>
      <td class="frame bottom">g</td>
      <td class="frame bottom">h</td>
      <td class="frame bottom right"></td>
    </tr>
  </table>
`;

export function getPieceClone(piece: string, unicode = false) {
  if (!isPiece(piece)) {
    return emptySquare.content.cloneNode(true);
  } else if (unicode) {
    return pieces[piece].content.cloneNode(true);
  } else {
    return svgPieces[piece].content.cloneNode(true);
  }
}