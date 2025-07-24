// ✅ React & hooks
import React, { useReducer, useState, useEffect } from "react";

// ✅ Components
import Dice from "./Components/dice/DiceForm";
import Board from "./Components/Board/Board";
import PlayerPanel from "./Components/Player/PlayerPanel";

// ✅ Utilities
import { rollDice, initialPlayers } from "./utils/GameUtils";
import { tiles, gameReducer } from "./Game/GameLogic";
import { buyProperty } from "./utils/buyproperty";

// ✅ Initial reducer state
const initialState = {
  players: initialPlayers,
  tiles: tiles,
  currentPlayerIndex: 0,
};

export default function App() {
  // ✅ Game state managed by reducer
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // ✅ UI state
  const [dice, setDice] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);

  // ✅ Load saved game if available
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

  // ✅ Save game on every state change
  useEffect(() => {
    localStorage.setItem("monopoly-game-state", JSON.stringify(state));
  }, [state]);

  // ✅ Handle dice roll and turn logic
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

      // ✅ Move player
      const newPosition = (currentPlayer.position + steps) % state.tiles.length;

      dispatch({
        type: "MOVE_PLAYER",
        payload: { playerId: currentPlayer.id, toIndex: newPosition },
      });

      dispatch({ type: "NEXT_TURN" });
      setIsRolling(false);
    }, 800); // Delay for animation
  };

  // ✅ Handle property purchase
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

      {/* ✅ Main board */}
      <Board
        players={state.players}
        currentPlayer={state.currentPlayerIndex}
        dice={dice}
        isRolling={isRolling}
        onRollDice={handleDiceRoll}
        onBuyProperty={handleBuyProperty}
        tiles={state.tiles}
      />

      {/* ✅ Sidebar panel */}
      <PlayerPanel players={state.players} />

      {/* ✅ Dice display */}
      <Dice dice={dice} onRoll={handleDiceRoll} />
    </div>
  );
}

