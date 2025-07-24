import React from "react";
import Tile from "./Tile";
import { tiles } from "../../Game/GameLogic";

export default function Board({ state, dispatch }) {
  const { players, currentPlayerIndex } = state;
  const currentPlayer = players[currentPlayerIndex];

  // Function to handle rolling the dice for the current player
  const handleRollDice = () => {
    // Roll dice action, which will also move the player
    const roll = Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1; // Dice roll
    const newPosition = (currentPlayer.position + roll) % tiles.length; // Wrap around the board
    dispatch({ type: "MOVE_PLAYER", payload: { playerId: currentPlayer.id, toIndex: newPosition } });

    // Handle the tile action after moving
    const tile = tiles[newPosition];
    dispatch({ type: "NEXT_TURN" }); // Move to the next player after the current one completes their turn
  };

  return (
    <div
      className="board"
      style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
    >
      {tiles.map((tile) => (
        <div
          key={tile.id}
          style={{ border: "1px solid black", padding: "10px", width: "150px" }}
        >
          <Tile tile={tile} player={currentPlayer} dispatch={dispatch} />
          {players.map(
            (p) =>
              p.position === tile.id && (
                <div key={p.id} style={{ fontWeight: "bold" }}>
                  🎩 {p.name}
                </div>
              )
          )}
        </div>
      ))}
      
      {/* Button to trigger dice roll for the current player */}
      <button onClick={handleRollDice}>Roll Dice</button>
    </div>
  );
}


