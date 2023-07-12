import { useState } from "react";

function PreStartGame(props) {
  const {startGame, setTargetScore} = props;
  return(
    <div>
      <h1>Pre start screen</h1>
      <button onClick={startGame}>Start Game</button>
      <input type="number" name="test" id="test" onChange={(e) => {setTargetScore(e.target.value)}}/>
    </div>
  )
}

function GameScreen(props) {
  return(
    <div>
      <h1>Game with score goal: {props.scoreGoal}</h1>
      <button onClick={props.endGame}>End game</button>
    </div>
  )
}

function GameEnded(props) {
  return(
    <div>
      <h1>Game finished</h1>
      <button onClick={props.resetGame}>Reset</button>
    </div>
  )
}

function RockPaperScissors(props) {
  const [gameState, setGameState] = useState(0); // 0 Not started; 1 Started; 2 Finished
  const [wantedScore, setWantedScore] = useState(0);

  const setTargetScore = (score) => {
    setWantedScore(Number.parseInt(score));
  }

  const startGame = () => {
    setGameState(1);
  }
  const endGame = () => {
    setGameState(2);
  }
  const resetGame = () => {
    setGameState(0);
  }

  return (
    <div id="rock-paper-scissors">
      <h1>Rock Paper Scissors</h1>
      {gameState === 0 ? <PreStartGame startGame={startGame} setTargetScore={setTargetScore} /> : <></>}
      {gameState === 1 ? <GameScreen scoreGoal={wantedScore} endGame={endGame} /> : <></> }
      {gameState === 2 ? <GameEnded resetGame={resetGame} /> : <></> }
    </div>
  );
}

export default RockPaperScissors;
