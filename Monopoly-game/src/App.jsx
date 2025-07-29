// ✅ React & hooks

import React, { useReducer, useState, useEffect } from "react";

// ✅ Components
import Dice from "./Components/dice/DiceForm";
import Board from "./Components/Board/Board";
import PlayerPanel from "./Components/Player/PlayerPanel";
import StartScreen from "./Components/features/StartScreen"; // Import your start screen

// ✅ Utilities
import { rollDice, initialPlayers } from "./utils/GameUtils";
import { tiles, gameReducer } from "./Game/GameLogic";
import { buyProperty } from "./utils/buyProperty";

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

  // New state: control whether the game has started or not
  const [gameStarted, setGameStarted] = useState(false);

  // ✅ Load saved game
  useEffect(() => {
    const saved = localStorage.getItem("monopoly-game-state");
    if (saved) {
      try {
        dispatch({ type: "LOAD_SAVED_STATE", payload: JSON.parse(saved) });
        setGameStarted(true); // If saved game found, skip start screen
      } catch (error) {
        console.error("Error loading saved game state:", error);
      }
    }
  }, []);

  // ✅ Save game on every state update
  useEffect(() => {
    if (gameStarted) {
      localStorage.setItem("monopoly-game-state", JSON.stringify(state));
    }
  }, [state, gameStarted]);

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

      // ✅ Skip if bankrupt
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

  // New: Start game handler to initialize players from start screen
  const handleStartGame = (playersConfig) => {
    dispatch({ type: "LOAD_SAVED_STATE", payload: { players: playersConfig } });
    setGameStarted(true);
  };

  // Show StartScreen if game not started
  if (!gameStarted) {
    return <StartScreen onStartGame={handleStartGame} />;
  }

  // Main game UI after start
  return (
    <div className="app">
      <h1>Monopoly Game Board</h1>

      <Board
        players={state.players}
        currentPlayer={state.currentPlayerIndex}
        state={state}
        dice={dice}
        isRolling={isRolling}
        onRollDice={handleDiceRoll}
        onBuyProperty={handleBuyProperty}
      />

      <PlayerPanel players={state.players} />

      <Dice dice={dice} onRoll={handleDiceRoll} />
    </div>
  );
}

