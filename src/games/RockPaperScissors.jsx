import { useState } from "react";

function RockPaperScissors(props) {
  let [gameState, setGameState] = useState("unstarted");
  let [playerScore, setPlayerScore] = useState(0);
  let [computerScore, setComputerScore] = useState(0);
  let [scoreGoal, setScoreGoal] = useState(0);
  let [computerChoice, setComputerChoice] = useState("");
  let [playerChoice, setPlayerChoice] = useState("");
  let [winner, setWinner] = useState("");

  const choices = ["rock", "paper", "scissors"]

  function PlayRandomMove() {
    let computerChoiceNumber = Math.floor(Math.random() * 3);
    setComputerChoice(choices[computerChoiceNumber]);
  }
  function CheckWinner() {
    console.log(`computerChoice: ${computerChoice}; playerChoice ${playerChoice}`);
    if (computerChoice === playerChoice) {return}
    if (
      computerChoice === 'rock' && playerChoice === 'scissors' ||
      computerChoice === 'paper' && playerChoice === 'rock' ||
      computerChoice === 'scissors' && playerChoice === 'paper' 
    ) {
      setWinner("computer");
      setComputerScore(computerScore + 1);
    }
    if (
      playerChoice === 'rock' && computerChoice === 'scissors' ||
      playerChoice === 'paper' && computerChoice === 'rock' ||
      playerChoice === 'scissors' && computerChoice === 'paper'
    ) {
      setWinner("player");
      setPlayerScore(playerScore + 1);
    }
  }

  function StartGame() {
    setScoreGoal(5);
    setGameState('started');
  }
  function EndGame(winner) {
    setGameState('ended');
  }
  function Reset() {}

  function Play(choice) {
    console.log(choice)
    setPlayerChoice(choice);
    console.log(playerChoice);
    PlayRandomMove();
    CheckWinner();

    setComputerChoice('');
    setPlayerChoice('');

    if (computerScore >= scoreGoal || playerScore >= scoreGoal) {
      EndGame(computerScore > playerScore ? computerScore : playerScore);
    }
  }

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
        <button onClick={() => {Play("rock")}}>Rock</button>
        <button onClick={() => {Play("paper")}}>Paper</button>
        <button onClick={() => {Play("scissors")}}>Scissors</button>
      </div>
       : <></>}
      {gameState === "ended" ? <div>ended. someone won: computer {computerScore} | player {playerScore}</div> : <></>}
    </div>
  );
}

export default RockPaperScissors;
