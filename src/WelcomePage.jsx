import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TbExternalLink } from 'react-icons/tb';
import './WelcomePage.css';
import { useEffect } from "react";

function WelcomePage(props) {
    const {t} = useTranslation();
    useEffect(() => {
        document.body.classList.add("welcome_page");
        return() => {
            document.body.classList.remove("welcome_page");
        }
    }, [])

    return(
        <>
            <nav id="nav">
                <a className="center nav_link" href="https://github.com/Bussun/mini-games-react" target="_blank">GitHub <TbExternalLink /></a>
            </nav>
            <div className="content">
                <h1 className="text_center mainPageTitle">{t("mainPageTitle")}</h1>
                <h2 className="text_center mainPageSubTitle">Here are a few minigames for you to enjoy!</h2>
                <div className="gameLinks">
                    <Link className="gameLink" to="./games/rock-paper-scissors">Rock Paper Scissors</Link>
                    <Link className="gameLink" to="./games/tic-tac-toe">Tic Tac Toe</Link>
                    <Link className="gameLink" to="./games/etch-a-sketch">Etch-a-sketch</Link>
                </div>
            </div>
            <footer>Copyright 2023 Denis LEDUC</footer>
        </>
    )
}

export default WelcomePage;