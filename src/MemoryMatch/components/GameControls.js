import React from "react";
import PropTypes from "prop-types";
import RangeSlider from "react-bootstrap-range-slider";

const GameControls = ({
  startNewGame,
  quitGame,
  gameStatus,
  boardWidth,
  resizeBoard,
}) => {
  const gameActive = gameStatus.match(/^memorizing|guessing$/);
  return (
    <div className="game-controls">
      <RangeSlider
        className="slider"
        value={boardWidth}
        onChange={(e) => resizeBoard(e.target.value)}
        min={3}
        max={25}
        step={1}
        disabled={gameActive}
      />
      <div className="btn-group">
        <button onClick={startNewGame} disabled={gameActive}>
          Start
        </button>
        {gameActive && <button onClick={quitGame}>Quit</button>}
      </div>
    </div>
  );
};

GameControls.propTypes = {
  startNewGame: PropTypes.func,
  boardWidth: PropTypes.number,
  quitGame: PropTypes.func,
  gameStatus: PropTypes.string,
  resizeBoard: PropTypes.func,
};

export default GameControls;
