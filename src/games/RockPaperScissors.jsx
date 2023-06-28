import { useState } from 'react';

function RockPaperScissors(props) {
    const [gameStarted, setGameState] = useState(false);
    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const [scoreGoal, setScoreGoal] = useState(0);

    function PlayRandomMove() {}
    function CheckWinner() {}
    function IncrementScore() {}
    function StartGame() {}
    function EndGame() {}
    function Reset() {}

    return(
        <div id="rock-paper-scissors">
            <h1>Rock Paper Scissors</h1>
        </div>
    )
}

export default RockPaperScissors;