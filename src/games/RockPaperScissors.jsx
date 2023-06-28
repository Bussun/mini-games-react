import { useState } from "react";

function RockPaperScissors(props) {
  const [gameState, setGameState] = useState("unstarted");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [scoreGoal, setScoreGoal] = useState(0);
  const [computerChoice, setComputerChoice] = useState("");
  const [playerChoice, setPlayerChoice] = useState("");

  const choices = ["rock", "paper", "scissors"]

  function PlayRandomMove() {}
  function CheckWinner() {}
  function IncrementScore() {}
  function StartGame() {
    setScoreGoal(5);
    setGameState('started');
  }
  function EndGame() {}
  function Reset() {}

  return (
    <div id="rock-paper-scissors">
      <h1>Rock Paper Scissors</h1>
      {gameState === "unstarted" ? 
      <div>
        <button onClick={StartGame}>Start game</button>
      </div> 
      : <></>}
      {gameState === "started" ? 
      <div>
        <p>Score ordinateur: {computerScore}</p>
        <p>Score joueur: {playerScore}</p>
        <button>Rock</button>
        <button>Paper</button>
        <button>Scissors</button>
      </div>
       : <></>}
      {gameState === "ended" ? <div>ended</div> : <></>}
    </div>
  );
}

export default RockPaperScissors;
