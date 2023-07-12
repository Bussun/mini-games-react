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
    </div>
  )
}

function GameEnded(props) {

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

  return (
    <div id="rock-paper-scissors">
      <h1>Rock Paper Scissors</h1>
      {gameState === 0 ? <PreStartGame startGame={startGame} setTargetScore={setTargetScore} /> : <></>}
      {gameState === 1 ? <GameScreen scoreGoal={wantedScore} /> :<></> }
    </div>
  );
}

export default RockPaperScissors;
