import { useState, useEffect, useCallback } from "react";

export const useMemoryMatch = () => {
  const [gameId, setGameId] = useState(0);
  const [boardWidth, setBoardWidth] = useState(3);

  const [markedCells, setMarkedCells] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);

  const [gameStatus, setGameStatus] = useState("initial");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [secondsLimit, setSecondsLimit] = useState(0);

  useEffect(() => {
    if (!gameStatus.match(/memorizing|guessing/)) {
      return;
    }
    if (gameStatus.match(/guessing/) && !secondsLeft) {
      endCurrentGame();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft(secondsLeft - 1);
    }, 1000);

    if (secondsLeft < secondsLimit * 0.75) {
      setGameStatus("guessing");
    }

    return () => clearInterval(interval);
  }, [secondsLeft, secondsLimit, endCurrentGame, gameStatus]);

  const getSecondsLeft = (boardWidth) => {
    return boardWidth * 5 < 60 ? boardWidth * 5 : 60;
  };

  const getMarkedCellIndices = (boardWidth) => {
    const numberOfMarkedCells = boardWidth < 15 ? boardWidth : 15;
    let markedCellIndices = [];

    for (let i = markedCellIndices.length; i < numberOfMarkedCells; ) {
      let markedCellIndexCandidate = Math.floor(
        Math.random() * Math.pow(boardWidth, 2)
      );

      if (!markedCellIndices.includes(markedCellIndexCandidate)) {
        markedCellIndices = markedCellIndices.concat([
          markedCellIndexCandidate,
        ]);
        i++;
      }
    }
    return markedCellIndices;
  };

  const startNewGame = () => {
    setGameId(gameId + 1);
    setCorrectGuesses([]);
    setIncorrectGuesses([]);
    setMarkedCells(getMarkedCellIndices(boardWidth));

    setSecondsLimit(getSecondsLeft(boardWidth));
    setSecondsLeft(getSecondsLeft(boardWidth));
    setGameStatus("memorizing");
  };

  const evaluateGuess = (index) => {
    if (
      !gameStatus.match(/guessing/g) ||
      correctGuesses.concat(incorrectGuesses).includes(index)
    )
      return;

    const correct = markedCells.includes(index);

    const candidate = correct
      ? correctGuesses.concat([index])
      : incorrectGuesses.concat([index]);

    correct ? setCorrectGuesses(candidate) : setIncorrectGuesses(candidate);

    if (correct && candidate.length === markedCells.length) {
      endCurrentGame(true);
    } else if (!correct && candidate.length === 3) {
      endCurrentGame(false);
    }
  };

  const resizeBoard = (sliderValue) => {
    setMarkedCells([]);
    setCorrectGuesses([]);
    setIncorrectGuesses([]);
    setBoardWidth(sliderValue);
  };

  const endCurrentGame = useCallback((victory) => {
    setGameStatus(victory ? "won" : "lost");
  }, []);

  const quitGame = () => {
    setSecondsLeft(0);
    setGameStatus("lost");
  };

  return {
    gameId,
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
  };
};
