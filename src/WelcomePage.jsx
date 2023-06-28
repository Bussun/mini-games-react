import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function WelcomePage(props) {
    const {t} = useTranslation();

    return(
        <div id='welcome-page'>
            <h1>{t("mainPageTitle")}</h1>
            <Link to="./games/rock-paper-scissors">Rock Paper Scissors</Link>
            <Link to="./games/tic-tac-toe">Tic Tac Toe</Link>
            <Link to="./games/etch-a-sketch">Etch-a-sketch</Link>
        </div>
    )
}

export default WelcomePage;