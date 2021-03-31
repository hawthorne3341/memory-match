import React from "react";
import { useMemoryMatch } from "./useMemoryMatch";
import GameBoard from "./components/GameBoard";
import GameControls from "./components/GameControls";
import { headers } from "./constants";

const MemoryMatch = () => {
  const {
    startNewGame,
    quitGame,
    gameStatus,
    boardWidth,
    resizeBoard,
    markedCells,
    evaluateGuess,
    correctGuesses,
    incorrectGuesses,
    secondsLeft,
  } = useMemoryMatch();

  return (
    <div className="memory-match">
      <span className="game-header">{`${headers[gameStatus]}${
        gameStatus.match(/memorizing|guessing/g)
          ? ` - Remaining: ${secondsLeft}`
          : ""
      }`}</span>
      <GameBoard
        boardWidth={boardWidth}
        gameStatus={gameStatus}
        markedCells={markedCells}
        evaluateGuess={evaluateGuess}
        correctGuesses={correctGuesses}
        incorrectGuesses={incorrectGuesses}
      />
      <GameControls
        startNewGame={startNewGame}
        quitGame={quitGame}
        gameStatus={gameStatus}
        boardWidth={boardWidth}
        resizeBoard={resizeBoard}
      />
    </div>
  );
};

export default MemoryMatch;
