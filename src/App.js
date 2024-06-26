import './App.css';
import React from 'react';
import Tile from './components/Tile';
import Modal from './components/Modal';

function App() {

 // Setting state

  const [tenzies, setTenzies] = React.useState(false)
  const [dice, setDice] = React.useState(createArr)
  const [modal, setModal] = React.useState(false)

// Function for creating the initial objects and randomised values

  function createArr(){
    const arr = []
    for(let i = 0; i < 10; i++){
      const randomNumber = Math.floor(Math.random() * 9)
      arr.push({id: i, num: randomNumber, locked: false})
    }
    return arr
  }

// Changing the state of a dice once it is clicked

  function toggleLocked(id){
    setDice(prevDice => {
      return prevDice.map((dice) => {
        return dice.id === id ? {...dice, locked: !dice.locked} : dice
    })
    })
  }

  const diceDivs = dice?.map(item => (
    <Tile key={item.id} id={item.id} num={item.num} locked={item.locked} toggle={toggleLocked} disabled={tenzies} />
  ))
// Rerolling dice that aren't locked

  function rerolldice(){
    setDice(prevDice => {
      return prevDice.map((dice) => {
          return dice.locked ? dice : {...dice, num: Math.floor(Math.random() * 9)}
        })
      }
    )
  }

// Listening for rerolls

React.useEffect(() => {
  const allLocked = dice.every(dice => dice.locked)
  const winningVal = dice[0].num
  const allSame = dice.every(dice => dice.num === winningVal)

  if(allLocked && allSame){
    setTenzies(true)
    setModal(true)
    console.log("You won!")
  }

}, [dice])

function resetGame(){
  setDice(createArr)
  setTenzies(false)
}

function toggleModal(){
  setModal(false)
}

const modalStyle = {
  opacity: 0.4
}

  return (
    <div className="App">
      <div className='modal-style' style={modal?modalStyle:{opacity: 1}}>
        <div className="heading">
          <h1>Tenzies</h1>
          <p>The aim of the a game is to roll until all the numbers are the same and "locked". <br></br> Press the dice to "lock in" a number this will stop it from changing.</p>
        </div>
          <div className='con'>
            {diceDivs}
          </div>
          {tenzies ? <button className='reroll-btn' onClick={resetGame}>Reset Game</button> : <button className='reroll-btn' onClick={rerolldice}>Reroll</button>}
      </div>
        {modal && <Modal toggle={toggleModal} />}
    </div>
  );
}

export default App;
