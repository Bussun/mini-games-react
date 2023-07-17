import {useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import BackHome from '../Components/BackHome';
import './TicTacToe.css';

function PreStart(props) {
    return(
        <div>
            Work In Progress / En cours de création / В процес на създаване
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
            <BackHome />
            <h1 className="ttt_mainTitle">{t("ttt_mainTitle")}</h1>
            {gameStarted === false ? <PreStart /> : <div>Game wow!</div>}
        </>
    )
}

export default TicTacToe;