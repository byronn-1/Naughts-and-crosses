import { useEffect, useState } from "react";
import styles from "./game_board.module.css";
import Naught from "../boardCounters/Naught";
import Cross from "../boardCounters/Cross";

const GameBoard = () => {

  const [turn, setTurn] = useState<number>(1);
  const [board, setBoard] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [three, setThree] = useState<boolean>(false);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  const [player, setPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string>("");


  const sqrt_length_plus_one = Math.sqrt(board.length) - 1;

  const winnerHandler = (winner: string): void => {
    setConfirmReset(true);
    setWinner(winner)
  }

  function clearGameHandler() {
    setBoard([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    setWinner("");
  }

  //PlaceTile- checks for tile placement & mutates board array
  const PlaceTile = (index: number, turn: number, board: number[], player: string): undefined => {
    if (board[index] === 0) {
      if (turn === 1) {
        setBoard((existingItems: any) => {
          return [
            ...existingItems.slice(0, index),
            (existingItems[index] = "X"),
            ...existingItems.slice(index + 1),
          ];
        });
        setTurn(2);
        setPlayer("O");
      } else {
        setBoard((existingItems: any) => {
          return [
            ...existingItems.slice(0, index),
            (existingItems[index] = "O"),
            ...existingItems.slice(index + 1),
          ];
        });
        setTurn(1);
        setPlayer("X");
      }
    } else {
      console.log("you must click a tile that is empty");
      console.log(`it is player ${turn} turn`);
      return;
    }

    // console.log(`you clicked on square ${index}`);
    console.log(`it is player ${turn} turn`);
    console.log(board);
  }

  //useEffect- check for three in a row
  useEffect(() => {
    if (three === true) {
      console.log(`winner`);
    }
    return () => {
      function rows(arr: number[], player: number) {
        for (let i = 0; i <= arr.length; i += 3) {
          // console.log(`${i} row searched`);
          if (arr[i] === player) {
            if (arr[i + 1] === player) {
              if (arr[i + 2] === player) {
                setThree(true);
                winnerHandler(winner);
                return console.log(`${three} THREE IN A ROW ON ROW ${i - 1}`);
              }
            }
          }
        }
      }

      function columns(arr: number[], player: number) {
        for (let i = 0; i <= 2; i += 4) {
          // console.log(`${i} column searched`);
          if (arr[i] === player) {
            if (arr[i + 3] === player) {
              if (arr[i + 6] === player) {
                setThree(true);
                winnerHandler(winner);
                return console.log(`${three} THREE IN A ROW ON COLUMN ${i}`);
              }
            }
          }
        }
      }

      function diagonal(arr: number[], start: number, player: number) {
        let i = 0;
        if (start === 0) {
          if (arr[start] === player) {
            // console.log(`lr diagonal searched`);
            if (arr[i + 4] === player) {
              if (arr[i + 8] === player) {
                setThree(true);
                winnerHandler(winner);
                console.log(
                  `${three} THREE IN A ROW ON DIAGONAL LEFT TO RIGHT`
                );
              }
            }
          }
        } else {
          // console.log(`rl diagonal searched`);
          if (
            arr[start] === player &&
            arr[start + 2] === player &&
            arr[start + 4] === player
          ) {
            setThree(true);
            winnerHandler(winner);
            console.log(`${three} THREE IN A ROW ON DIAGONAL RIGHT TO LEFT`);
          }
        }
      }

      rows(board, player);
      columns(board, player);
      diagonal(board, 0, player);
      diagonal(board, sqrt_length_plus_one, player);
    };
  }, [board, three]);

  // MAP- over board array with conditional to create JSX to be rendered
  return (
    <div>
      <div className={styles.board}>
        {board.map((item, i) => {
          if (board[i] === 0) {
            return (
              <div
                key={i}
                value={item}
                className={styles.box}
                onClick={() => PlaceTile(i, turn, board, player)}
              ></div>
            );
          } else if (board[i] === "X") {
            return (
              <div
                key={i}
                value={item}
                className={styles.box}
                onClick={() => PlaceTile(i, turn, board, player)}
              >
                <Cross />
              </div>
            );
          } else if (board[i] === "O") {
            return (
              <div
                key={i}
                value={item}
                className={styles.box}
                onClick={() => PlaceTile(i, turn, board, player)}
              >
                <Naught />
              </div>
            );
          }
        })}
      </div>
      <div>
        <button onClick={() => clearGameHandler()}>Clear Game</button>
      </div>
      {confirmReset && (
        <>
          <div className="confirm-reset-popup">
            <h2>Reset</h2>
            <div className="message">
              Reset all boxes to empty - are you sure?
            </div>
            <button
              type="button"
              className="confirm-yes"
              onClick={() => {
                setConfirmReset(false);
              }}
            >
              YES
            </button>
            <button
              type="button"
              className="confirm-no"
              onClick={() => setConfirmReset(false)}
            >
              Cancel
            </button>
          </div>
          <div className="modal-overlay" />
        </>
      )}
    </div>
  );
};

export default GameBoard;

