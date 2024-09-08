import {useState, useEffect, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import BackHome from '../Components/BackHome';
import "./2048.css";

function Game2048(props) {
    const {t} = useTranslation();
    useEffect(() => {
        document.title = t("2048_docTitle");
        document.body.classList.add("2048");

        return() => {
            document.body.classList.remove("2048");
        }
    }, []);
    
    return(
        <>
            <BackHome />
            <h1>2048</h1>
            <h2>Bonsoir </h2>
        </>
    )
}

export default Game2048;