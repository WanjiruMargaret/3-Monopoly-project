<<<<<<< HEAD
// ✅ React & hooks
import React, { useReducer, useState, useEffect } from "react";

// ✅ Components
import Dice from "./Components/dice/DiceForm";
import Board from "./Components/Board/Board";
import PlayerPanel from "./Components/Player/PlayerPanel";

// ✅ Utilities
import { rollDice, initialPlayers } from "./utils/GameUtils";
import { tiles, gameReducer } from "./Game/GameLogic";


// ✅ Initial reducer state
const initialState = {
  players: initialPlayers,
  tiles: tiles,
  currentPlayerIndex: 0,
  lastCardDrawn: null,
};

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [dice, setDice] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);

  // ✅ Load saved game
  useEffect(() => {
    const saved = localStorage.getItem("monopoly-game-state");
    if (saved) {
      try {
        dispatch({ type: "LOAD_SAVED_STATE", payload: JSON.parse(saved) });
      } catch (error) {
        console.error("Error loading saved game state:", error);
      }
    }
  }, []);

  // ✅ Save game on every state update
  useEffect(() => {
    localStorage.setItem("monopoly-game-state", JSON.stringify(state));
  }, [state]);

  // ✅ Alert if a card is drawn
  useEffect(() => {
    if (state.lastCardDrawn) {
      alert(`CARD DRAWN:\n${state.lastCardDrawn.text}`);
    }
  }, [state.lastCardDrawn]);

  // ✅ Handle dice roll
  const handleDiceRoll = () => {
    if (isRolling) return;

    setIsRolling(true);
    const [die1, die2] = rollDice();
    const steps = die1 + die2;
    setDice([die1, die2]);

    setTimeout(() => {
      const currentPlayer = state.players[state.currentPlayerIndex];

      // ✅ Skip bankrupt
      if (currentPlayer.isBankrupt) {
        dispatch({ type: "NEXT_TURN" });
        setIsRolling(false);
        return;
      }

      // ✅ Jail logic
      if (currentPlayer.turnsInJail > 0) {
        dispatch({ type: "SKIP_TURN_FOR_JAIL", payload: currentPlayer.id });
        dispatch({ type: "NEXT_TURN" });
        setIsRolling(false);
        return;
      }

      // ✅ Move player and trigger tile logic
      const newPosition = (currentPlayer.position + steps) % state.tiles.length;
      dispatch({
        type: "MOVE_PLAYER",
        payload: { playerId: currentPlayer.id, toIndex: newPosition },
      });

      dispatch({ type: "NEXT_TURN" });
      setIsRolling(false);
    }, 800);
  };

  // ✅ Buy property
  const handleBuyProperty = (tileIndex) => {
    dispatch({
      type: "BUY_PROPERTY",
      payload: {
        playerId: state.players[state.currentPlayerIndex].id,
        tileIndex,
      },
    });
  };

  return (
    <div className="app">
      <h1>Monopoly Game MVP</h1>

      {/* ✅ Board */}
      <Board
        players={state.players}
        currentPlayer={state.currentPlayerIndex}
        dice={dice}
        isRolling={isRolling}
        onRollDice={handleDiceRoll}
        onBuyProperty={handleBuyProperty}
        tiles={state.tiles}
      />

      {/* ✅ Sidebar */}
      <PlayerPanel players={state.players} />

      {/* ✅ Dice control */}
      <Dice dice={dice} onRoll={handleDiceRoll} />
    </div>
  );
}
=======
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
>>>>>>> 9f1b83f (new files)
