<<<<<<< HEAD
import StartScreen from './components/StartScreen'
import Board from './components/Board'
import Dice from './components/Dice'
import GameLog from './components/GameLog'
import Modal from './components/Modal'
import { useState } from 'react'
import { properties } from './constants/tiles'
import './App.css'
import './components/style/board.css'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', color: 'red', position: 0, money: 1500, properties: [] },
    { id: 2, name: 'Player 2', color: 'blue', position: 0, money: 1500, properties: [] }
  ])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [dice, setDice] = useState([1, 1])
  const [isRolling, setIsRolling] = useState(false)
  const [gameLog, setGameLog] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({})

  const addLog = (message) => {
    setGameLog(prev => [...prev, message])
  }

  const startGame = () => {
    setGameStarted(true)
    addLog('Game started! Player 1 goes first.')
  }

  const rollDice = () => {
    if (isRolling) return
    
    setIsRolling(true)
    
    setTimeout(() => {
      const newDice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1]
      setDice(newDice)
      
      const total = newDice[0] + newDice[1]
      const player = players[currentPlayer]
      const newPosition = (player.position + total) % 40
      
      // Check if passed GO
      const passedGo = player.position + total >= 40
      
      setPlayers(prev => prev.map((p, index) => 
        index === currentPlayer 
          ? { ...p, position: newPosition, money: passedGo ? p.money + 200 : p.money }
          : p
      ))
      
      addLog(`${player.name} rolled ${newDice[0]} + ${newDice[1]} = ${total}`)
      if (passedGo) addLog(`${player.name} passed GO and collected $200!`)
      addLog(`${player.name} landed on ${properties[newPosition].name}`)
      
      // Handle property landing
      const property = properties[newPosition]
      if (property.price > 0) {
        const isOwned = players.some(p => p.properties.includes(newPosition))
        const owner = players.find(p => p.properties.includes(newPosition))
        
        if (!isOwned) {
          setModalContent({
            title: `Buy ${property.name}?`,
            message: `Price: $${property.price}\nRent: $${property.rent}`,
            onConfirm: () => {
              buyProperty(newPosition)
              setShowModal(false)
            },
            onCancel: () => setShowModal(false)
          })
          setShowModal(true)
        } else if (owner && owner.id !== player.id) {
          // Pay rent
          const rent = property.rent
          setPlayers(prev => prev.map(p => {
            if (p.id === player.id) return { ...p, money: p.money - rent }
            if (p.id === owner.id) return { ...p, money: p.money + rent }
            return p
          }))
          addLog(`${player.name} paid $${rent} rent to ${owner.name}`)
        }
      }
      
      setIsRolling(false)
      
      // Next player's turn
      setTimeout(() => {
        setCurrentPlayer((prev) => (prev + 1) % players.length)
      }, 1000)
    }, 1000)
  }

  const buyProperty = (propertyIndex) => {
    const property = properties[propertyIndex]
    const player = players[currentPlayer]
    
    if (player.money >= property.price) {
      setPlayers(prev => prev.map((p, index) => 
        index === currentPlayer 
          ? { ...p, money: p.money - property.price, properties: [...p.properties, propertyIndex] }
          : p
      ))
      addLog(`${player.name} bought ${property.name} for $${property.price}`)
    } else {
      addLog(`${player.name} cannot afford ${property.name}`)
    }
    
    setShowModal(false)
  }

  if (!gameStarted) {
    return <StartScreen onStartGame={startGame} />
  }

  return (
    <div className="game-container">
      <Board 
        players={players}
        currentPlayer={currentPlayer}
        dice={dice}
        isRolling={isRolling}
        onRollDice={rollDice}
        onBuyProperty={buyProperty}
      />
      <div className="game-controls">
        <Dice 
          dice={dice}
          isRolling={isRolling}
          onRollDice={rollDice}
          currentPlayerName={players[currentPlayer].name}
        />
        <GameLog logs={gameLog} />
        
        {/* Player Info */}
        <div className="bg-white border-2 border-black rounded-lg p-4 w-64">
          <h3 className="text-lg font-bold mb-3 text-center">Players</h3>
          {players.map((player, index) => (
            <div key={player.id} className={`p-2 mb-2 rounded border-2 ${
              index === currentPlayer ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-4 h-4 rounded-full player-${player.color}`}></div>
                <span className="font-bold">{player.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                Money: ${player.money}
              </div>
              <div className="text-sm text-gray-600">
                Properties: {player.properties.length}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalContent.title}
        >
          <div className="space-y-4">
            <p className="text-gray-700 whitespace-pre-line">{modalContent.message}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={modalContent.onCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={modalContent.onConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Buy Property
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
=======
import React, { useState } from "react";
import DiceForm from "./Components/dice/DiceForm"; // Optional: remove if unused
import Board from "./Components/Board/Board";
import PlayerPanel from "./Components/Player/PlayerPanel";
import { handlePlayerMove } from "./utils/MovePlayer";
import { initialPlayers } from "./utils/gameUtils";
import tiles from "./constants/tiles"; // NEW: your tiles file

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [dice, setDice] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);

  const handleRollDice = () => {
    if (isRolling) return;
    setIsRolling(true);

    const die1 = Math.ceil(Math.random() * 6);
    const die2 = Math.ceil(Math.random() * 6);
    const total = die1 + die2;

    setDice([die1, die2]);

    setTimeout(() => {
      movePlayer(total);
      setIsRolling(false);
    }, 800); // simulate rolling delay
  };

  const movePlayer = (steps) => {
    setPlayers((prevPlayers) => {
      const updated = [...prevPlayers];
      const player = updated[currentPlayerIndex];

      if (player.isBankrupt) return updated;

      if (player.turnsInJail > 0) {
        player.turnsInJail -= 1;
        updated[currentPlayerIndex] = player;
        return updated;
      }

      const updatedPlayer = handlePlayerMove(
        player,
        steps,
        tiles, // using tiles instead of propertiesData
        null, // no setProperties needed
        updated
      );
      updated[currentPlayerIndex] = updatedPlayer;

      return updated;
    });

    setCurrentPlayerIndex((i) => (i + 1) % players.length);
  };

  const handleBuyProperty = (tileIndex) => {
    setPlayers((prevPlayers) => {
      const updated = [...prevPlayers];
      const player = updated[currentPlayerIndex];
      const tile = tiles[tileIndex];

      if (tile.type === "property" && player.balance >= tile.price) {
        player.balance -= tile.price;
        player.properties.push(tileIndex);
        updated[currentPlayerIndex] = player;
      }

      return updated;
    });
  };

  return (
    <div className="app">
      <h1>Monopoly Game MVP</h1>
      <Board
        players={players}
        currentPlayer={currentPlayerIndex}
        dice={dice}
        isRolling={isRolling}
        onRollDice={handleRollDice}
        onBuyProperty={handleBuyProperty}
        tiles={tiles}
      />
      <PlayerPanel players={players} />
    </div>
  );
>>>>>>> dae0df085d6c4801f14d4f84c22080ef1273ba25
}
