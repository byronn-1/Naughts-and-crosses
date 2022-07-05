import { useState } from "react";
// import styles from "./game_screen.module.css";
import StartScreen from "./startScreen";
// import GamesWonBoard from "./gamesWonBoard";
// import GameBoard from "./gameBoard";
// import WinnerBox from "./winnerBox";

const GameScreen = () => {

  // if names have been set show gameboard
  // if names not set show game start screen
  const [gameWinner, setGameWinner] = useState("");
  const [form, setForm] = useState(false);


  
  function Winner(player) {
    if (player === "X") {
      return setGameWinner("One");
    } else if (player === "O") {
      return setGameWinner("Two");
    }
  }
  

  return (
    <div>
      <div className={styles.inside_circle}></div>
      {form ? <StartScreen />
      : <div>
          <GamesWonBoard />
          <GameBoard GBtoGameScreen={Winner} />
          <WinnerBox gamewinner={gameWinner} />
        </div>
      }
    </div>
  );
};

export default GameScreen;

