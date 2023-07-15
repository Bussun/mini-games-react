import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TbExternalLink } from 'react-icons/tb';
import './WelcomePage.css';

function WelcomePage(props) {
    const {t} = useTranslation();

    return(
        <div id='welcome-page'>
            <nav id="nav">
                <a className="center nav_link" href="https://github.com/Bussun/mini-games-react" target="_blank">GitHub <TbExternalLink /></a>
            </nav>
            <div className="content">
            <h1 className="text_center mainPageTitle">{t("mainPageTitle")}</h1>
            <Link to="./games/rock-paper-scissors">Rock Paper Scissors</Link>
            <Link to="./games/tic-tac-toe">Tic Tac Toe</Link>
            <Link to="./games/etch-a-sketch">Etch-a-sketch</Link>
            </div>
            <footer>Copyright 2023 Denis LEDUC</footer>
        </div>
    )
}

export default WelcomePage;