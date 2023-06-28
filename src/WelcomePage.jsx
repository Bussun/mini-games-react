import { Link } from "react-router-dom";

function WelcomePage(props) {
    return(
        <div id='welcome-page'>
            <h1>Hello and welcome to Bussun's games!</h1>
            <Link to="./games/rock-paper-scissors">Rock Paper Scissors</Link>
            <Link to="./games/tic-tac-toe">Tic Tac Toe</Link>
            <Link to="./games/etch-a-sketch">Etch-a-sketch</Link>
        </div>
    )
}

export default WelcomePage;