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

function GameScreen(props) {
    return(
        <div className="ttt_gameScreen">
            <h2>Game screen</h2>
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
    const [isP2Ai, setP2] = useState(false);
    
    return(
        <>
            <BackHome />
            <h1 className="ttt_mainTitle">{t("ttt_mainTitle")}</h1>
            {gameStarted === false ? <PreStart setGameState={setGameState} /> : <GameScreen />}
        </>
    )
}

export default TicTacToe;