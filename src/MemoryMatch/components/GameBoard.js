import React from "react";
import PropTypes from "prop-types";

const GameBoard = ({
  boardWidth,
  gameStatus,
  markedCells,
  correctGuesses,
  incorrectGuesses,
  evaluateGuess,
}) => {
  return (
    <div
      className="game-board"
      style={{
        gridTemplateColumns: `repeat(${boardWidth}, 1fr)`,
        gridTemplateRows: `repeat(${boardWidth}, 1fr)`,
      }}
    >
      {Array.from({ length: Math.pow(boardWidth, 2) }, (_, i) => i++).map(
        (idx) => {
          const marked = markedCells.includes(idx);
          return (
            <div
              key={idx}
              className={`cell${
                marked
                  ? gameStatus === "memorizing"
                    ? "-marked-memorizing"
                    : correctGuesses.includes(idx)
                    ? "-marked-chosen"
                    : gameStatus === "lost"
                    ? "-marked-remaining"
                    : ""
                  : incorrectGuesses.includes(idx)
                  ? "-unmarked-chosen"
                  : ""
              }`}
              style={{
                gridColumn:
                  (idx + 1) % boardWidth > 0
                    ? `${(idx + 1) % boardWidth} / ${
                        ((idx + 1) % boardWidth) + 1
                      }`
                    : `${boardWidth} / ${boardWidth + 1}`,
              }}
              onClick={() => evaluateGuess(idx)}
            />
          );
        }
      )}
    </div>
  );
};

GameBoard.propTypes = {
  boardWidth: PropTypes.number,
  gameStatus: PropTypes.string,
  markedCells: PropTypes.arrayOf(PropTypes.number),
  correctGuesses: PropTypes.arrayOf(PropTypes.number),
  incorrectGuesses: PropTypes.arrayOf(PropTypes.number),
  evaluateGuess: PropTypes.func,
};

export default GameBoard;
