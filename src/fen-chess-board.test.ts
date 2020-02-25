import test from "tape";
import FENBoard from "./fen-chess-board";

test("setting fen twise resets board", assert => {
  const board = new FENBoard();
  board.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";
  board.fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/";
  assert.equal(
    board.fen,
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/8",
    "should reset when setting fen"
  );
  assert.end();
});
