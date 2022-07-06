import React, {  useEffect, useState } from "react";
import styles from './game_board.module.css';
import Naught from '../boardCounters/Naught';
import Cross from '../boardCounters/Cross';

const GameBoard = (props) => {
    
    // let boardArr = [0,0,0,0,0,0,0,0,0];
    // let boardArray = '';
    
    const [turn, setTurn] = useState(1);
    const [board, setBoard] = useState([0,0,0,0,0,0,0,0,0]);
    const [three, setThree] = useState(false);
    const [player, setPlayer] = useState('X');
    const [winner, setWinner] = useState('');

    const sqrt_length_plus_one = (Math.sqrt(board.length)) - 1;

    function winnerHandler(winner) {
        props.GBtoGameScreen(winner);
    }
    function clearGameHandler(){
        setBoard([0,0,0,0,0,0,0,0,0]);
        setWinner('')
        props.GBtoGameScreen(winner);
    }
//FUNCTION- checks for tile placement & mutates board array
    function PlaceTile (index, turn, board, player) {
        if(board[index] === 0){
            
            if(turn === 1){
                setBoard(existingItems => {
                    return [
                      ...existingItems.slice(0, index),
                      existingItems[index] = 'X',
                      ...existingItems.slice(index + 1),
                    ]
                }
            )
            setTurn(2)
            setPlayer('O');
           }else{
                setBoard(existingItems => {
                    return [
                      ...existingItems.slice(0, index),
                      existingItems[index] = 'O',
                      ...existingItems.slice(index + 1),
                    ]
                  }
                ) 
            setTurn(1); 
            setPlayer('X');

            }
        }else{
            console.log('you must click a tile that is empty');
            console.log(`it is player ${turn} turn`);
            return
        }
        
        // console.log(`you clicked on square ${index}`);
        console.log(`it is player ${turn} turn`);
        console.log(board);   
}


//useEffect- check for three in a row
useEffect(() => {
    if(three === true){
        console.log(`winner`);
    }
return () => { 

    function rows(arr, player){
        for(let i = 0; i <= arr.length; i += 3){
            // console.log(`${i} row searched`);
            if(arr[i] === player){
                if(arr[i + 1] === player){
                    if(arr[i + 2] === player){
                        setThree(true);
                        setWinner(player);
                        winnerHandler(winner);
                        return console.log(`${three} THREE IN A ROW ON ROW ${i - 1}`);
                    }
                }
            }
        }     
    }
    
    function columns(arr, player){
        for(let i = 0; i <= 2; i += 4){
            // console.log(`${i} column searched`);
            if(arr[i] === player){
                if(arr[i + 3] === player){
                    if(arr[i + 6] === player){
                        setThree(true);
                        setWinner(player);
                        winnerHandler(winner);
                        return console.log(`${three} THREE IN A ROW ON COLUMN ${i}`);
                    }
                }
            }
        } 
    } 
    
    function diagonal(arr, start, player){
        let i = 0;
        if(start === 0){
            if(arr[start] === player){
            // console.log(`lr diagonal searched`);
                if(arr[i + 4] === player){
                    if(arr[i + 8] === player){
                        setThree(true);
                        setWinner(player);
                        winnerHandler(winner);
                        console.log(`${three} THREE IN A ROW ON DIAGONAL LEFT TO RIGHT`);
                    }
                }
            } 
        }else{
            // console.log(`rl diagonal searched`);
            if(arr[start] === player && arr[start + 2] === player && arr[start + 4] === player){
    
                setThree(true);
                setWinner(player);
                winnerHandler(winner);
                console.log(`${three} THREE IN A ROW ON DIAGONAL RIGHT TO LEFT`);
            }  
        }
    }   

    rows(board, player);
    columns(board, player);
    diagonal(board, 0, player);
    diagonal(board, sqrt_length_plus_one, player);
}

}, [board, three]);


// MAP- over board array with conditional to create JSX to be rendered
    return(
        <div>
        <div className={styles.board}>
            { board.map((item, i) => {
    if(board[i]=== 0){
        return (
            <div key={i} 
                value={item} 
                className={styles.box}
                onClick={() => PlaceTile(i, turn, board, player)} 
                >
            </div>
        )
    }else if(board[i] === 'X'){
        return (
            <div key={i} 
                value={item} 
                className={styles.box}
                onClick={() => PlaceTile(i, turn, board, player)}
                >
                    <Cross />
            </div>
        )
    }else if(board[i] === 'O'){
        return (
            <div key={i} 
                value={item} 
                className={styles.box}
                onClick={() => PlaceTile(i, turn, board, player)}
                >
                    <Naught />
            </div>
        )
    }
})
}
            </div>
            <div>
            <button onClick={() => clearGameHandler()}>Clear Game</button>
            </div>
        </div>
    )
} 


export default GameBoard;
        

{/*
   const initBoard = board.map((item, i) => {
            return (
                <div key={i} 
                    value={item} 
                    className={styles.box}
                    onClick={() => {
                            PlaceTile(i);
                        }
                    } 
                >
                </div>
            )
        }
    )
*/}

{/* 
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />
      )}
    </ul>
  );
} 
*/}

{/* <div className={styles.board}>
            <div className={styles.row}>
                <div className={styles.box}> <Naught /> </div>
                <div className={styles.box}></div>
                <div className={styles.box}></div>
            </div>
            <div className={styles.row}>
                <div className={styles.box}></div>
                <div className={styles.box}> <Cross /> </div>
                <div className={styles.box}></div>
            </div>
            <div className={styles.row}>
                <div className={styles.box}></div>
                <div className={styles.box}></div>
                <div className={styles.box}></div>
            </div>
        </div> */}

{
            /*

    GREAT PIECE ON HOW TO MUTATE AN ARRAY
          const [list, setList] = useState(INITIAL_LIST)
  const incrementNumber = index => {
    setList(existingItems => {
      return [
        ...existingItems.slice(0, index),
        existingItems[index] + 1,
        ...existingItems.slice(index + 1),
      ]
    })
  }
   */ 
}

{/* 
 if(arr[start] === player){
                if(arr[i + 2] === player){
                    if(arr[i + 2] === player){
                        setThree(true);
                        console.log(`${three} three in a row on diagonal left to right`);
                    }
                }
            }  
*/}

{/* 
//FUNCTIONS- check for three in a row
useEffect(() => {
        console.log( player );

        const sqrt_length_plus_one = (Math.sqrt(board.length)) - 1;
        rows(board, player);
        columns(board, player);
        diagonal(board, 0, player);
        diagonal(board, sqrt_length_plus_one, player);


    function rows(arr, player){
        for(let i = 0; i <= arr.length; i += 3){
            // console.log(`${i} row searched`);
            if(arr[i] === player){
                if(arr[i + 1] === player){
                    if(arr[i + 2] === player){
                        setThree(true);
                        setWinner(player);
                        return console.log(`${three} THREE IN A ROW ON ROW ${i - 1}`);
                    }
                }
            }
        }     
    }
    
    function columns(arr, player){
        for(let i = 0; i <= 2; i += 4){
            // console.log(`${i} column searched`);
            if(arr[i] === player){
                if(arr[i + 3] === player){
                    if(arr[i + 6] === player){
                        setThree(true);
                        setWinner(player);
                        return console.log(`${three} THREE IN A ROW ON COLUMN ${i}`);
                    }
                }
            }
        } 
    } 
    
    function diagonal(arr, start, player){
        let i = 0;
        if(start === 0){
            if(arr[start] === player){
            // console.log(`lr diagonal searched`);
                if(arr[i + 4] === player){
                    if(arr[i + 8] === player){
                        setThree(true);
                        setWinner(player);
                        console.log(`${three} THREE IN A ROW ON DIAGONAL LEFT TO RIGHT`);
                    }
                }
            } 
        }else{
            // console.log(`rl diagonal searched`);
            if(arr[start] === player && arr[start + 2] === player && arr[start + 4] === player){
    
                setThree(true);
                setWinner(player);
                console.log(`${three} THREE IN A ROW ON DIAGONAL RIGHT TO LEFT`);
            }  
        }
    }   

}, [board, three, player])
*/}