import React, { useReducer } from "react";
import Dice from "./Components/Dice/DiceForm";
import Board from "./Components/Board/Board";
import PlayerPanel from "./Components/Player/PlayerPanel";
import { rollDice, initialPlayers } from "./utils/GameUtils";
import { tiles, gameReducer } from "./Game/GameLogic";
import Tile from "./Components/Board/Board";
const initialState = {
  players: initialPlayers,
  tiles: tiles,
  currentPlayerIndex: 0,
};

export default function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleDiceRoll = () => {
    const [die1, die2] = rollDice();
    const steps = die1 + die2;

    // Move player by dispatching MOVE_PLAYER action
    const currentPlayer = state.players[state.currentPlayerIndex];

    // Calculate new position with wrap around
    let newPosition = (currentPlayer.position + steps) % state.tiles.length;

    dispatch({
      type: "MOVE_PLAYER",
      payload: { playerId: currentPlayer.id, toIndex: newPosition },
    });

    // After move, proceed to next turn
    dispatch({ type: "NEXT_TURN" });
  };

  return (
    <div className="app">
      <h1>Monopoly Game MVP</h1>
      <Dice
        dice={[0, 0]} // Could enhance dice state to show current roll, or ignore for now
        onRoll={handleDiceRoll}
      />
      <Board state={state} dispatch={dispatch} />
      <PlayerPanel players={state.players} />
    </div>
  );
}
