import { useState } from "react";
import { useTranslation } from "react-i18next";

function PreStartGame(props) {
  const {startGame, setTargetScore} = props;
  return(
    <div>
      <h1>Pre start screen</h1>
      <button onClick={startGame}>Start Game</button>
      {(() => {setTargetScore(5)})()}
      <input type="number" name="test" id="test" value={5} onChange={(e) => {setTargetScore(e.target.value)}}/>
    </div>
  )
}

function GameScreen(props) {
  const {scoreGoal, endGame} = props;
  return(
    <div>
      <h1>Game with score goal: {scoreGoal}</h1>
      <button onClick={endGame}>End game</button>
    </div>
  )
}

function GameEnded(props) {
  const {resetGame, finalWinner} = props;
  const { t } = useTranslation();
  return(
    <div>
      <h1>Game finished</h1>
      <h2>The final winner is {finalWinner === 1 ? t("rps_winner_player") : finalWinner === 2 ? t("rps_winner_computer") : "undefined"}</h2>
      <button onClick={resetGame}>Reset</button>
    </div>
  )
}

function RockPaperScissors(props) {
  const [gameState, setGameState] = useState(0); // 0 Not started; 1 Started; 2 Finished
  const [wantedScore, setWantedScore] = useState(undefined);
  const [finalWinner, setFinalWinner] = useState(undefined); // 1 for player one, 2 for computer/player 2

  const setTargetScore = (score) => {
    setWantedScore(Number.parseInt(score));
  }

  const startGame = () => {
    setGameState(1);
  }
  const endGame = (winner) => {
    setFinalWinner(winner);
    setGameState(2);
  }
  const resetGame = () => {
    setGameState(0);
    setWantedScore(undefined);
    setFinalWinner(undefined);
  }

  return (
    <div id="rock-paper-scissors">
      <h1>Rock Paper Scissors</h1>
      {gameState === 0 ? <PreStartGame startGame={startGame} setTargetScore={setTargetScore} /> : <></>}
      {gameState === 1 ? <GameScreen scoreGoal={wantedScore} endGame={endGame} /> : <></> }
      {gameState === 2 ? <GameEnded resetGame={resetGame} finalWinner={finalWinner} /> : <></> }
    </div>
  );
}

export default RockPaperScissors;
