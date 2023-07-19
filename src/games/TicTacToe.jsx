import {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import BackHome from '../Components/BackHome';
import './TicTacToe.css';

function PreStart(props) {
    const { setGameState } = props;
    return(
        <div>
            <h2>Work In Progress / En cours de création / В процес на създаване</h2>
            <button className="btn" onClick={() => setGameState(true)}>Start Game</button>
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

    const {isP2Ai} = props;
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
            // End game
        }

        console.log(isP2Ai);
        if (isP2Ai === true) {
            let computerMove = playRandomLegalMove(updatedBoard);
            console.log(computerMove)
            updatedBoard[computerMove] = 'O';
            winner = checkWinner(updatedBoard);
            if (winner !== null) {
                // End game
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

    function checkWinner(newBoard) {}

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

    const [gameStarted, setGameState] = useState(false);
    const [isP2Ai, setP2] = useState(true);
    
    return(
        <>
            <BackHome />
            <h1 className="ttt_mainTitle">{t("ttt_mainTitle")}</h1>
            {gameStarted === false ? <PreStart setGameState={setGameState} /> : <GameScreen isP2Ai={isP2Ai} setGameState={setGameState} />}
        </>
    )
}

export default TicTacToe;