import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaHandPaper, FaHandRock, FaHandScissors, FaPlus, FaMinus } from "react-icons/fa";
import './RockPaperScissors.css';

function PreStartGame(props) {
  const {startGame, setTargetScore, targetScore} = props;
  const {t} = useTranslation();

  useEffect(() => {
    setTargetScore(1);
  }, [])

  return(
    <div className="rps_preStart">
      <p>{t('rps_preStart_chooseScore')}</p>
      <div className="rps_preStart_inputCombo">
        <div className="rps_preStart_input">
          <button className="rps_preStart_inputBtn_left btn" onClick={() => {setTargetScore(targetScore - 1)}}><FaMinus /></button>
          <span className="rps_preStart_inputValue">{isNaN(targetScore) === true ? '' : targetScore}</span>
          <button className="rps_preStart_inputBtn_right btn" onClick={() => {setTargetScore(targetScore + 1)}}><FaPlus /></button>
        </div>
        <button 
          onClick={startGame} 
          className="btn"
          disabled={
            isNaN(targetScore) === true 
            ? true 
            : targetScore < 1 
            ? true 
            : false
          }
        >
          {t('rps_startGameBtn')}
        </button>
      </div>
    </div>
  )
}

function GameScreen(props) {
  const {scoreGoal, endGame} = props;
  const {t} = useTranslation();

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [playerMove, setPlayerMove] = useState(undefined);
  const [computerMove, setComputerMove] = useState(undefined);
  const [moveWinner, setMoveWinner] = useState(undefined);

  const moves = {
    rock: ["scissors"],
    paper: ["rock"],
    scissors: ["paper"]
  };

  function checkWinner(move1, move2) {
    if (move1 === move2) {
      return 0; //Tie
    } else if (moves[move1].includes(move2)) {
      return 1; //Player wins
    } else if (moves[move2].includes(move1)) {
      return 2; //Computer wins
    }

    return undefined;
  }

  function makeRandomMove() {
    const choices = Object.keys(moves);
    const chosenIndex = Math.floor(Math.random() * 3);

    return choices[chosenIndex];
  }

  function handleMove(playerChosenMove) {
    let newComputerMove = makeRandomMove();
    let newPlayerScore = playerScore;
    let newComputerScore = computerScore;

    setPlayerMove(playerChosenMove);
    setComputerMove(newComputerMove);
    
    const won = checkWinner(playerChosenMove, newComputerMove)
    setMoveWinner(won);

    switch (won) {
      case 1:
        setPlayerScore(playerScore + 1);
        newPlayerScore += 1;
        break;
      case 2:
        setComputerScore(computerScore + 1);
        newComputerScore += 1;
        break;
      default:
        break;
    }

    if (newPlayerScore >= scoreGoal || newComputerScore >= scoreGoal) {
      endGame(newPlayerScore >= scoreGoal ? 1 : 2);
    }
  }

  function Player(props) {
    const {name, score, lastAction} = props;
    return(
      <div>
        <p>{name}</p>
        <p>{t('rps_gameScreen_playerObj_score')} {score}</p>
        <p>{t('rps_gameScreen_playerObj_lastAction')} {lastAction}</p>
      </div>
    )
  }

  return(
    <div>
      <h1>{t('rps_gameScreen_scoreGoal', {scoreGoal})}</h1>
      <Player name="Player 1" score={playerScore} lastAction={playerMove} />
      <Player name="Player 2" score={computerScore} lastAction={computerMove} />
      <p>
        {moveWinner === undefined 
        ? t('rps_gameScreen_lastMoveWinner_noOne')
        : moveWinner === 1 
        ? t('rps_gameScreen_lastMoveWinner_player1')
        : moveWinner === 2 
        ? t('rps_gameScreen_lastMoveWinner_computer')
        : moveWinner === 0 
        ? t('rps_gameScreen_lastMoveWinner_tie')
        : t('rps_gameScreen_lastMoveWinner_error')}
      </p>
      <div className="buttons">
        <button className="rps_actionBtn" onClick={() => {handleMove("rock")}}><FaHandRock /> {t("rps_gameScreen_moveBtns_rock")}</button>
        <button className="rps_actionBtn" onClick={() => {handleMove("paper")}}><FaHandPaper /> {t("rps_gameScreen_moveBtns_paper")}</button>
        <button className="rps_actionBtn" onClick={() => {handleMove("scissors")}}><FaHandScissors /> {t("rps_gameScreen_moveBtns_scissors")}</button>
      </div>
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
  const {t} = useTranslation();
  useEffect(() => {
    document.title = "Rock Paper Scissors | MiniGames";
    document.body.classList.add("rock-paper-scissors");

    return() => {
    document.body.classList.remove("rock-paper-scissors");
    }
  }, []);
  
  const [gameState, setGameState] = useState(0); // 0 Not started; 1 Started; 2 Finished
  const [wantedScore, setWantedScore] = useState(undefined);
  const [finalWinner, setFinalWinner] = useState(undefined); // 1 for player one, 2 for computer/player 2

  const setTargetScore = (score) => {
    if (score < 1) {return}
    else if (isNaN(score) === true) {return}
    else {
      setWantedScore(Number.parseInt(score));
    }
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
    <>
      <h1>{t("rps_mainTitle")}</h1>
      {gameState === 0 ? <PreStartGame startGame={startGame} setTargetScore={setTargetScore} targetScore={wantedScore} /> : <></>}
      {gameState === 1 ? <GameScreen scoreGoal={wantedScore} endGame={endGame} /> : <></> }
      {gameState === 2 ? <GameEnded resetGame={resetGame} finalWinner={finalWinner} /> : <></> }
    </>
  );
}

export default RockPaperScissors;
