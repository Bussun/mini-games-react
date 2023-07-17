import {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import './TicTacToe.css';

function PreStart(props) {
    return(
        <div>
            Not started yet.
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
    
    return(
        <>
            <h1 className="ttt_mainTitle">{t("ttt_mainTitle")}</h1>
            {gameStarted === false ? <PreStart /> : <div>Game wow!</div>}
        </>
    )
}

export default TicTacToe;