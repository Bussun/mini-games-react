import {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import BackHome from '../Components/BackHome';
import './TicTacToe.css';

function PreStart(props) {
    const { setGameState, isP2Ai, setP2 } = props;
    return(
        <div>
            <h2>Work In Progress / En cours de création / В процес на създаване</h2>
            <button className="btn" onClick={() => setGameState(1)}>Start Game</button>
            <button className="btn" onClick={() => setP2(!isP2Ai)}>P2 is CPU: {isP2Ai ? 'true' : 'false'}</button>
        </div>
    )
}

function EndScreen(props) {
    const {t} = useTranslation();
    const {reset, winner, isP2Ai} = props;
    let winText = undefined;

    switch (winner) {
        case 'tie':
            winText = 0;
            break;
        case 'X':
            winText = 1;
            break;
        case 'O':
            if (isP2Ai === true) {
                winText = 2;
            }
            else {
                winText = 3;
            }
            break;
        default:
            break;
    }

    return(
        <div className="ttt_endScreen">
            <h2>{
                winText === 0 
                ? t("ttt_endScreen_winner_tie")
                : winText === 1
                ? t("ttt_endScreen_winner_player1")
                : winText === 2
                ? t("ttt_endScreen_winner_computer")
                : winText === 3
                ? t("ttt_endScreen_winner_player2")
                : 'error'
            }</h2>
            <button className="btn" onClick={reset}>{t("ttt_endScreen_resetBtn")}</button>
        </div>
    )
}

function Cell(props) {
    const {index, handleClick, board} = props;
    return(
        <button className={`ttt_gameBoard_square ttt_gameBoard_${index}`} onClick={() => {handleClick(index)}}>{board[index]}</button>
    )
}

function Board(props) {
    const {handleClick, board} = props;
    return(
        <div className='ttt_gameBoard'>
            <Cell index={0} handleClick={handleClick} board={board}/>
            <Cell index={1} handleClick={handleClick} board={board}/>
            <Cell index={2} handleClick={handleClick} board={board}/>
            <Cell index={3} handleClick={handleClick} board={board}/>
            <Cell index={4} handleClick={handleClick} board={board}/>
            <Cell index={5} handleClick={handleClick} board={board}/>
            <Cell index={6} handleClick={handleClick} board={board}/>
            <Cell index={7} handleClick={handleClick} board={board}/>
            <Cell index={8} handleClick={handleClick} board={board}/>
        </div>
    )
}

function GameScreen(props) {
    const {t} = useTranslation();

    const {isP2Ai, setGameState, setGameWinner} = props;
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [board, setBoard] = useState([null,null,null,null,null,null,null,null,null]);

    function handleClick(index) {
        if (board[index] !== null) {
            return;
        }
        let updatedBoard = board.slice();
        let marker = currentPlayer === 1 ? 'X' : 'O';

        updatedBoard[index] = marker;
        let winner = checkWinner(updatedBoard);
        if (winner !== null) {
            endGame(winner);
        }

        console.log(isP2Ai);
        if (isP2Ai === true) {
            let computerMove = playRandomLegalMove(updatedBoard);
            console.log(computerMove)
            updatedBoard[computerMove] = 'O';
            winner = checkWinner(updatedBoard);
            if (winner !== null) {
                endGame(winner);
            }
            console.log(updatedBoard)
        }
        else {
            setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
        }

        setBoard(updatedBoard);
    }

    function playRandomLegalMove(newBoard) {
        let nullValues = newBoard.map((val, index) => {
            if (val === null) {
                return index;
            }
        });
        let finalArray = nullValues.filter(val => val !== undefined);
        let randomIndex = Math.floor(Math.random() * finalArray.length);
        return finalArray[randomIndex];
    }

    function endGame(winner) {
        setGameWinner(winner);
        setGameState(2);
    }

    function checkWinner(newBoard) {
        const winningCases = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
          ];
          for (let i = 0; i < winningCases.length; i++) {
            const [a, b, c] = winningCases[i];
            if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
              return newBoard[a];
            }
          }

          let isFull = newBoard.filter(val => val !== null);
          if (isFull.length === 9) {
            return 'tie';
          }

          return null;
    }

    return(
        <div className="ttt_gameScreen">
            <h2>texte au pif pour l'instant</h2>
            <Board handleClick={handleClick} board={board} />
        </div>
    )
}

function TicTacToe(props) {
    const {t} = useTranslation();
    useEffect(() => {
        document.title = t("ttt_docTitle");
        document.body.classList.add("tic-tac-toe");
        return() => {
            document.body.classList.remove("tic-tac-toe");
        }
    }, []);

    const [gameState, setGameState] = useState(0);
    const [isP2Ai, setP2] = useState(true);
    const [gameWinner, setGameWinner] = useState(null);

    function resetGame() {
        setGameWinner(null);
        setGameState(0);
    }
    
    return(
        <>
            <BackHome />
            <h1 className="ttt_mainTitle">{t("ttt_mainTitle")}</h1>
            {gameState === 0 ? <PreStart setGameState={setGameState} setP2={setP2} isP2Ai={isP2Ai} /> : <></>}
            {gameState === 1 ? <GameScreen isP2Ai={isP2Ai} setGameState={setGameState} setGameWinner={setGameWinner} /> : <></>}
            {gameState === 2 ? <EndScreen reset={resetGame} winner={gameWinner} isP2Ai={isP2Ai} /> : <></>}
        </>
    )
}

export default TicTacToe;