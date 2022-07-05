import React from "react";
// import styles from './start_screen.module.css';
// import '../App.css '
import PlayerName from "./playerName";
import Dropdown from "./formComponents/Dropdown";
import PlayerAssignment from "./playerAssignment";
import { useState } from "react";

const items = [
    {
        id: 1,
        value: 'X',
    },
    {
        id: 2,
        value: 'O'
    }
]

const StartScreen = (props) => {

    const [playerOneName, setPlayerOneName] = useState('');
    const [playerTwoName, setPlayerTwoName] = useState('');
    const [selection, setSelection] = useState("");


    const UserTokenSelection = (item) => {
        if(item === "X"){
            setSelection("X");
            console.log('x is selected')
        }else{
            setSelection("O"); 
        }
    }

    const HandlePlayerOneName = (props) => {
        setPlayerOneName(props)
    }

    const HandlePlayerTwoName = (props) => {
        setPlayerTwoName(props)
    }

    const HandleForm = (props) => {
        if(playerOneName.trim().length > 0){
            if(playerTwoName.trim().length >0 ){
                if(selection.length > 0){
                    // setForm(true);  
                   props.SStoGameScreen(true);
                }
        // then pass this state up to the parent component. 
            }    
        }else{
            console.log('you need to fill in the form and select a token for player one.');
        }
    }
        
    if(form === false){
            return<div>
                       <Dropdown 
            title="Choose X or O"
            ddToStartScreen={UserTokenSelection}
            items={items}
            />
            <PlayerName
            PlayerNameToStartScreen={HandlePlayerOneName}
            playerNumber="One"
            name={playerOneName}
            />
            <PlayerName 
            PlayerNameToStartScreen={HandlePlayerTwoName}
            playerNumber="Two"
            />
            <PlayerAssignment 
            playerNumber="One"
            name={playerOneName} 
            token={selection}
            />
            <PlayerAssignment 
            playerNumber="Two"
            name={playerTwoName} 
            token={selection === '' ? '': (selection === 'X') ? 'O' : 'X'}
            />
    
            <button
            onClick={() => HandleForm()}
            >Submit</button>
  </div>
          } else{
            return <div>
          <p>Players have been assigned a token</p>
          </div>
          
          }
}

export default StartScreen;
